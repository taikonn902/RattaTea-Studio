<?php
session_start();

if (!isset($_SESSION['user'])) {
    header('Location: /rattatea-studio/login.html');
    exit;
}

if ((int)$_SESSION['user']['role'] !== 0) {
    header('Location: /rattatea-studio/index.html');
    exit;
}

?>