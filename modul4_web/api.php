<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = "localhost";
$user = "root"; // Username database
$pass = ""; // Password database
$db_name = "user_db"; // Ganti dengan nama database Anda

// Coba untuk koneksi ke database
$conn = new mysqli($host, $user, $pass, $db_name);
if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi database gagal: " . $conn->connect_error]));
}

// Tentukan metode HTTP
$method = $_SERVER['REQUEST_METHOD'];

// CRUD API berdasarkan metode HTTP
switch ($method) {
    case 'POST':
        handle_post_request($conn);
        break;

    case 'PUT':
        handle_put_request($conn);
        break;

    case 'DELETE':
        handle_delete_request($conn);
        break;

    default:
        echo json_encode(["error" => "Metode HTTP tidak didukung"]);
        break;
}

// Fungsi untuk menangani POST request (Login dan Sign Up)
function handle_post_request($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    // Cek apakah ini request login atau sign up
    if (isset($data['username'], $data['password'])) {
        if (isset($data['email'])) {
            // Sign Up
            sign_up($conn, $data);
        } else {
            // Login
            login($conn, $data);
        }
    } else {
        echo json_encode(["error" => "Data tidak lengkap"]);
    }
}

// Fungsi Sign Up
function sign_up($conn, $data) {
    $username = $data['username'];
    $email = $data['email'];
    $password = password_hash($data['password'], PASSWORD_BCRYPT);

    // Cek apakah username atau email sudah ada
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->bind_param("ss", $username, $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "Username atau Email sudah terdaftar"]);
        return;
    }

    // Query untuk menyimpan data pengguna
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => "Sign up failed"]);
    }
}

// Fungsi Login
function login($conn, $data) {
    $username = $data['username'];
    $password = $data['password'];

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            echo json_encode([
                "success" => true,
                "username" => $user['username'],
                "email" => $user['email'],
                "gender" => $user['gender']
            ]);
        } else {
            echo json_encode(["error" => "Password salah"]);
        }
    } else {
        echo json_encode(["error" => "Username tidak ditemukan"]);
    }
}

// Fungsi untuk menangani PUT request (Update Profile)
function handle_put_request($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['username'], $data['email'], $data['gender'])) {
        $username = $data['username'];
        $email = $data['email'];
        $gender = $data['gender'];

        $stmt = $conn->prepare("UPDATE users SET email = ?, gender = ? WHERE username = ?");
        $stmt->bind_param("sss", $email, $gender, $username);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["error" => "Profile update failed"]);
        }
    } else {
        echo json_encode(["error" => "Data tidak lengkap"]);
    }
}

// Fungsi untuk menangani DELETE request (Logout)
function handle_delete_request($conn) {
    // Logout tidak membutuhkan aksi ke database, hanya hapus session atau data lokal
    echo json_encode(["success" => true]);
}

?>
