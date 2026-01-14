<?php
header('Content-Type: application/json');

require_once '../config/connect_db.php';

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Không thể kết nối database: ' . $e->getMessage()
    ]);
    exit;
}

try {
    $sql = "SELECT category_id, category_name FROM categorys WHERE category_status = 1 ORDER BY created_at DESC";
    $stmt = $pdo->query($sql);
    $categories = $stmt->fetchAll();

    foreach ($categories as &$cat) {
        $cat['product_count'] = 0; 
    }

    echo json_encode([
        'success' => true,
        'data' => $categories
    ]);
    exit;

} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Lỗi khi lấy danh sách category: ' . $e->getMessage()
    ]);
    exit;
}
