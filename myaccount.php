<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gloovia";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$contact = $_POST['contact'];
$payment = $_POST['payment'];

// SQL query to insert form data into the database
$sql = "INSERT INTO orders (name, email, address, contact, payment_method) VALUES ('$name', '$email', '$address', '$contact', '$payment')";

if ($conn->query($sql) === TRUE) {
    echo "Data inserted successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
