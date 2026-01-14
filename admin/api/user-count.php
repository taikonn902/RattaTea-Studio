<?php
// Kết nối database
$host = 'localhost';
$db   = 'rattatea_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die("Không thể kết nối database: " . $e->getMessage());
}

// Lấy số lượng người dùng
try {
    $stmt = $pdo->query("SELECT COUNT(*) AS total_users FROM users");
    $row = $stmt->fetch();
    $totalUsers = $row['total_users'] ?? 0;
} catch (PDOException $e) {
    $totalUsers = 0;
}

?>
<div class="bg-white rounded-xl shadow p-4 flex items-center gap-3">
    <i class="fa fa-users text-xl text-primary"></i>
    <div>
        <div class="text-lg font-semibold"><?= htmlspecialchars($totalUsers) ?></div>
        <div class="text-xs text-gray-500">Người dùng</div>
    </div>
</div>
