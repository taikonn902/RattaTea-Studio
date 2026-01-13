<?php
header('Content-Type: application/json');
session_start();

// ========================
// KẾT NỐI DATABASE
// ========================
try {
    require_once '../config/connect_db.php';
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Không thể kết nối database'
    ]);
    exit;
}

// ========================
// LẤY DỮ LIỆU TỪ FORM
// ========================
$email    = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');
$remember = isset($_POST['remember']) && $_POST['remember'] == 1;

// ========================
// VALIDATE SERVER
// ========================
if ($email === '' || $password === '') {
    echo json_encode([
        'success' => false,
        'message' => 'Vui lòng nhập email và mật khẩu'
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Email không hợp lệ'
    ]);
    exit;
}

// ========================
// TÌM USER THEO EMAIL
// ========================

$sql = "SELECT user_id, user_name, email, password, role
    FROM users
    WHERE email = :email
    LIMIT 1";

$stmt = $pdo->prepare($sql);
$stmt->execute(['email' => $email]);
$user = $stmt->fetch();

// Không tồn tại email
if (!$user) {
    echo json_encode([
        'success' => false,
        'message' => 'Sai email hoặc mật khẩu'
    ]);
    exit;
}

// ========================
// KIỂM TRA PASSWORD
// ========================
if (!password_verify($password, $user['password'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Sai email hoặc mật khẩu'
    ]);
    exit;
}

// ========================
// ĐĂNG NHẬP THÀNH CÔNG
// ========================
$_SESSION['user'] = [
    'user_id'   => $user['user_id'],
    'user_name' => $user['user_name'],
    'email'     => $user['email'],
    'role'      => (int)$user['role']
];

// ========================
// REMEMBER ME (7 NGÀY)
// ========================
if ($remember) {
    setcookie(
        'remember_user',
        json_encode($_SESSION['user']),
        time() + (7 * 24 * 60 * 60),
        '/',
        '',
        false,
        true
    );
}

// ========================
// RESPONSE CHO JS
// ========================
echo json_encode([
    'success' => true,
    'message' => 'Đăng nhập thành công',
    'user' => [
        'email' => $user['email'],
        'role'  => (int)$user['role']
    ]
]);
exit;
