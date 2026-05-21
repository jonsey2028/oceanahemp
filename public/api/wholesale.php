<?php
/**
 * Wholesale form handler for SiteGround
 * Receives POST from /wholesale page and emails to wholesale@oceanahemp.com
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

$businessName     = trim($body['businessName'] ?? '');
$contactName      = trim($body['contactName'] ?? '');
$email           = trim($body['email'] ?? '');
$phone           = trim($body['phone'] ?? '');
$businessType     = trim($body['businessType'] ?? '');
$message         = trim($body['message'] ?? '');
$address         = trim($body['address'] ?? '');
$city            = trim($body['city'] ?? '');
$state           = trim($body['state'] ?? '');
$zip             = trim($body['zip'] ?? '');
$website         = trim($body['website'] ?? '');
$ein             = trim($body['ein'] ?? '');
$resaleLicense   = trim($body['resaleLicense'] ?? '');
$productsInterest = trim($body['productsInterest'] ?? '');

if (!$businessName || !$contactName || !$email || !$phone) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Business name, contact name, email, and phone are required.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide a valid email address.']);
    exit;
}

$clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/oceanahemp_wholesale_' . md5($clientIP) . '.txt';
$lastSubmit = @filemtime($rateLimitFile) ?: 0;
if (time() - $lastSubmit < 5) { http_response_code(429); echo json_encode(['success' => false, 'error' => 'Please wait a moment before sending another message.']); exit; }
touch($rateLimitFile);

checkSpam($message ?? ''); checkSpam($businessName); checkSpam($contactName);
function checkSpam(string $text) { $spamWords = ['viagra','payday loan','casino','crypto investment','make money fast','click here','lottery','inheritance','bank transfer','nigerian prince']; $low = strtolower($text); foreach ($spamWords as $w) { if (strpos($low, $w) !== false) { http_response_code(400); echo json_encode(['success' => false, 'error' => 'Message flagged for review.']); exit; } } }

$adminEmail = getenv('WHOLESALE_EMAIL') ?: 'wholesale@oceanahemp.com';

$adminSubject = 'Wholesale Application: ' . $businessName;
$adminBody    = "Business: $businessName\nContact: $contactName\nEmail: $email\nPhone: $phone\n" .
    "Business Type: " . ($businessType ?: 'N/A') . "\n" .
    "Website: " . ($website ?: 'N/A') . "\n" .
    "EIN: " . ($ein ?: 'N/A') . "\n" .
    "Address: $address, $city, $state $zip\n" .
    "Resale License: " . ($resaleLicense ?: 'N/A') . "\n" .
    "Products of Interest: " . ($productsInterest ?: 'N/A') . "\n\nMessage:\n" . ($message ?: 'N/A');
$adminHeaders = "From: wholesale@oceanahemp.com\r\nReply-To: $email\r\nContent-Type: text/plain; charset=utf-8";

$userSubject = 'We received your wholesale application — OceanaHemp';
$userBody    = "Hi $contactName,\n\nThanks for applying to become an OceanaHemp wholesale partner! We have received your application for $businessName.\n\nOur wholesale team will review your application and get back to you within 2 business days.\n\nWarm regards,\nThe OceanaHemp Wholesale Team\nwholesale@oceanahemp.com";
$userHeaders = "From: wholesale@oceanahemp.com\r\nContent-Type: text/plain; charset=utf-8";

$sent = mail($adminEmail, $adminSubject, $adminBody, $adminHeaders);
$replySent = mail($email, $userSubject, $userBody, $userHeaders);

header('Content-Type: application/json');
if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to submit application. Please try again later.']);
}
