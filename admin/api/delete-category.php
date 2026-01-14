<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 0);

require_once '../config/connect_db.php';

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Không thể kết nối database'
    ]);
    exit;
}

// Chỉ cho phép POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Phương thức không hợp lệ'
    ]);
    exit;
}

$category_id = intval($_POST['category_id'] ?? 0);

if ($category_id <= 0) {
    echo json_encode([
        'success' => false,
        'message' => 'ID không hợp lệ'
    ]);
    exit;
}

try {
    // Kiểm tra category có tồn tại không
    $stmt = $pdo->prepare(
        "SELECT category_id FROM categorys WHERE category_id = :id LIMIT 1"
    );
    $stmt->execute([':id' => $category_id]);

    if (!$stmt->fetch()) {
        echo json_encode([
            'success' => false,
            'message' => 'Loại sản phẩm không tồn tại'
        ]);
        exit;
    }

    // Xóa category
    $stmt = $pdo->prepare(
        "DELETE FROM categorys WHERE category_id = :id"
    );
    $stmt->execute([':id' => $category_id]);

    echo json_encode([
        'success' => true,
        'message' => 'Xóa loại sản phẩm thành công'
    ]);
    exit;

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi database'
    ]);
    exit;
}
?>