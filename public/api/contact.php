<?php
/**
 * Contact form handler for SiteGround
 * Receives POST from /contact page and emails to hello@oceanahemp.com
 */

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Parse JSON body
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
if (strpos($contentType, 'application/json') !== false) {
    $body = json_decode(file_get_contents('php://input'), true);
} else {
    $body = $_POST;
}

$name     = trim($body['name'] ?? '');
$email    = trim($body['email'] ?? '');
$subject  = trim($body['subject'] ?? 'General Inquiry');
$message  = trim($body['message'] ?? '');

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Name, email, and message are required.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid email address.']);
    exit;
}
if (strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Message is too long.']);
    exit;
}

// Basic rate limit: prevent too fast submissions
// (Use a session cookie - bots often don't cookies persist across requests)
$clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/oceanahemp_contact_' . md5($clientIP) . '.txt';
$lastSubmit = @filemtime($rateLimitFile) ?: 0;
if (time() - $lastSubmit < 5) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Please wait a moment before sending another message.']);
    exit;
}
touch($rateLimitFile);

// Block common spam keywords
checkSpam($message);
checkSpam($name);

function checkSpam(string $text) {
    $spamWords = ['viagra', 'cialis', 'payday loan', 'casino', 'crypto investment', 'make money fast', 'click here to claim', 'free money', 'buy cheap', 'weight loss pills', 'hot singles', 'lottery winner', 'inheritance', 'bank transfer', 'nigerian prince', 'act now', 'limited time offer', '100% guaranteed', 'risk free'];
    $low = strtolower($text);
    foreach ($spamWords as $word) { if (strpos($low, $word) !== false) { http_response_code(400); echo json_encode(['success' => false, 'error' => 'Message flagged for review.']); exit; } }
}

$adminEmail = getenv('CONTACT_EMAIL') ?: 'hello@oceanahemp.com';

// Build admin email
$adminSubject = 'Contact: ' . $subject . ' from ' . $name;
$adminBody    = "Name: $name\nEmail: $email\nSubject: $subject\n\nMessage:\n$message";
$adminHeaders = "From: hello@oceanahemp.com\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";

// Build user confirmation email
$userSubject = 'We received your message — OceanaHemp';
$userBody    = "Hi $name,\n\nThanks for reaching out to OceanaHemp! We have received your message about \"$subject\" and will get back to you within 24 hours.\n\nWarm regards,\nThe OceanaHemp Team\nhello@oceanahemp.com";
$userHeaders = "From: hello@oceanahemp.com\r\nContent-Type: text/plain; charset=utf-8";

$sent = mail($adminEmail, $adminSubject, $adminBody, $adminHeaders);
$replySent = mail($email, $userSubject, $userBody, $userHeaders);

header('Content-Type: application/json');
if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email. Please try again later.']);
}
