<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 0);

require_once '../config/connect_db.php';

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode(['success'=>false,'message'=>'Không thể kết nối database']);
    exit;
}

/* =====================================================
   GET → LẤY CATEGORY THEO ID
===================================================== */
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $id = intval($_GET['id'] ?? 0);

    if ($id <= 0) {
        echo json_encode(['success'=>false,'message'=>'ID không hợp lệ']);
        exit;
    }

    $stmt = $pdo->prepare("
        SELECT category_id, category_name, category_description
        FROM categorys
        WHERE category_id = :id
        LIMIT 1
    ");
    $stmt->execute([':id'=>$id]);
    $cat = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$cat) {
        echo json_encode(['success'=>false,'message'=>'Không tìm thấy category']);
        exit;
    }

    echo json_encode(['success'=>true,'data'=>$cat]);
    exit;
}

/* =====================================================
   POST → CẬP NHẬT CATEGORY
===================================================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $category_id   = intval($_POST['category_id'] ?? 0);
    $category_name = trim($_POST['category_name'] ?? '');
    $category_desc = trim($_POST['category_description'] ?? '');

    if ($category_id <= 0) {
        echo json_encode(['success'=>false,'message'=>'ID loại sản phẩm không hợp lệ']);
        exit;
    }

    if ($category_name === '') {
        echo json_encode(['success'=>false,'message'=>'Tên loại sản phẩm không được để trống']);
        exit;
    }

    try {
        // Check trùng tên
        $stmt = $pdo->prepare("
            SELECT category_id 
            FROM categorys 
            WHERE category_name = :name 
              AND category_id != :id
            LIMIT 1
        ");
        $stmt->execute([
            ':name' => $category_name,
            ':id'   => $category_id
        ]);

        if ($stmt->fetch()) {
            echo json_encode(['success'=>false,'message'=>'Loại sản phẩm đã tồn tại']);
            exit;
        }

        // Update
        $stmt = $pdo->prepare("
            UPDATE categorys 
            SET category_name = :name,
                category_description = :desc
            WHERE category_id = :id
        ");
        $stmt->execute([
            ':name' => $category_name,
            ':desc' => $category_desc,
            ':id'   => $category_id
        ]);

        echo json_encode(['success'=>true,'message'=>'Cập nhật loại sản phẩm thành công']);
        exit;

    } catch (PDOException $e) {
        echo json_encode(['success'=>false,'message'=>'Lỗi database']);
        exit;
    }
}

/* =====================================================
   METHOD KHÔNG HỢP LỆ
===================================================== */
echo json_encode(['success'=>false,'message'=>'Phương thức không hợp lệ']);
exit;
