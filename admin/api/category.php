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

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success'=>false,'message'=>'Phương thức không hợp lệ']);
    exit;
}

$category_name = trim($_POST['category_name'] ?? '');
$category_desc = trim($_POST['category_description'] ?? '');

if ($category_name === '') {
    echo json_encode(['success'=>false,'message'=>'Tên loại sản phẩm không được để trống']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT category_id FROM categorys WHERE category_name = :name LIMIT 1");
    $stmt->execute([':name'=>$category_name]);
    if ($stmt->fetch()) {
        echo json_encode(['success'=>false,'message'=>'Loại sản phẩm đã tồn tại']);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO categorys (category_name, category_description) VALUES (:name,:desc)");
    $stmt->execute([':name'=>$category_name,':desc'=>$category_desc]);

    echo json_encode(['success'=>true,'message'=>'Thêm loại sản phẩm thành công']);
    exit;

} catch (PDOException $e) {
    echo json_encode(['success'=>false,'message'=>'Lỗi database']);
    exit;
}
