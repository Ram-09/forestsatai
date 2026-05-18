<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data safely
    $fname      = trim($_POST['fname'] ?? '');
    $lname      = trim($_POST['lname'] ?? '');
    $mobile     = trim($_POST['mobile'] ?? '');
    $email      = trim($_POST['email'] ?? '');
    $org        = trim($_POST['org'] ?? '');
    $segment    = trim($_POST['segment'] ?? '');
    $product    = trim($_POST['product'] ?? '');
    $geography  = trim($_POST['geography'] ?? '');
    $message    = trim($_POST['message'] ?? '');

    // Required validation
    if (
        empty($fname) ||
        empty($lname) ||
        empty($mobile) ||
        empty($email) ||
        empty($message)
    ) {
        die("Please fill all required fields");
    }

    // Email validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address");
    }

    // Mobile validation
    if (!preg_match('/^[0-9]{10}$/', $mobile)) {
        die("Invalid mobile number");
    }

    // Receiver email
    $to = "ayush.kumarterisas@gmail.com";

    // Subject
    $subject = "Request a Demo";

    // Email Body
    $body = "
    <html>
    <body>

    <h2>New Contact Request for Demo</h2>

    <p><strong>First Name:</strong> {$fname}</p>

    <p><strong>Last Name:</strong> {$lname}</p>

    <p><strong>Mobile:</strong> {$mobile}</p>

    <p><strong>Email:</strong> {$email}</p>

    <p><strong>Organisation:</strong> {$org}</p>

    <p><strong>Organisation Type:</strong> {$segment}</p>

    <p><strong>Primary Interest:</strong> {$product}</p>

    <p><strong>Geography:</strong> {$geography}</p>

    <p><strong>Message:</strong><br>{$message}</p>

    </body>
    </html>
    ";

    // Headers
    $headers  = "MIME-Version: 1.0\r\n";

    $headers .= "Content-type:text/html;charset=UTF-8\r\n";

    $headers .= "From: ForestSatAI <ayush@forestsatai.com>\r\n";

    $headers .= "Reply-To: {$email}\r\n";

    // Send Mail
    if (mail($to, $subject, $body, $headers)) {

        echo "success";

    } else {

        echo "Mail sending failed";
    }
}
?>