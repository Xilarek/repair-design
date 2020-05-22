<?php
    $userName = $_POST['userName'];
    $userEmail = $_POST['userPhone'];
    $userPhone = $_POST['userEmail'];
    $userText = $_POST['userText'];
    

    // Load Composer's autoloader
    require 'php-mailer/Exception.php';
    require 'php-mailer/PHPMailer.php';
    require 'php-mailer/SMTP.php';

    // Instantiation and passing `true` enables exceptions
    $mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    //Server settings
    $mail->SMTPDebug = 0;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'communicationwithteam@gmail.com';                     // SMTP username
    $mail->Password   = 'm162mPk55a=B';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('communicationwithteam@gmail.com', 'Дмитрий');
    $mail->addAddress('final638cofe123g@yandex.ru');     // Add a recipient
    
    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Новая заявка сайта';
    $mail->Body    = "Имя пользователя ${userName}, его телефон ${userPhone}, его почта ${userEmail}, его вопрос ${userText}";

    if($mail->send()) {
        echo "ok";
    } else { 
        echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
    }
} catch (Exception $e) {
    echo "Письмо не отправлено, есть ошибка. Код ошибки: {$mail->ErrorInfo}";
}

