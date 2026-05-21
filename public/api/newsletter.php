<?php
/**
 * Newsletter signup handler for SiteGround
 * Sends welcome email to subscriber
 */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== false) {
    $body = json_decode(file_get_contents('php://input'), true);
} else {
    $body = $_POST;
}

$email = trim($body['email'] ?? '');

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid email address.']);
    exit;
}

// Rate limit
$clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/oceanahemp_newsletter_' . md5($clientIP) . '.txt';
$lastSubmit = @filemtime($rateLimitFile) ?: 0;
if (time() - $lastSubmit < 10) { http_response_code(429); echo json_encode(['success' => false, 'error' => 'Please wait a moment before subscribing again.']); exit; }
touch($rateLimitFile);

$adminEmail = getenv('CONTACT_EMAIL') ?: 'hello@oceanahemp.com';

// Send welcome email to subscriber
$userSubject = 'Welcome to the OceanaHemp Inner Circle';
$userBody    = "Welcome to the OceanaHemp family!\n\nYou have joined our Inner Circle. You will be the first to hear about:\n\n- New product drops\n- Exclusive subscriber-only offers\n- Holistic wellness tips and CBD education\n- Behind-the-scenes stories from our lab and farm\n\nWarm regards,\nThe OceanaHemp Team\nhello@oceanahemp.com";
$userHeaders = "From: hello@oceanahemp.com\r\nContent-Type: text/plain; charset=utf-8";

// Notify admin
$adminSubject = 'New Newsletter Subscriber';
$adminBody    = "New subscriber: $email";
$adminHeaders = "From: hello@oceanahemp.com\r\nContent-Type: text/plain; charset=utf-8";

$welcomeSent = mail($email, $userSubject, $userBody, $userHeaders);
$adminSent   = mail($adminEmail, $adminSubject, $adminBody, $adminHeaders);

header('Content-Type: application/json');
if ($welcomeSent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send welcome email. Please try again later.']);
}
