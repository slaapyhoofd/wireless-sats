<?php
// Convert post data to json (array)
$jsonData = json_decode(file_get_contents('php://input') , true);

// Extract data from json (array)
$url = $jsonData["url"];

$httpHeader = array(
    'Content-Type: application/json'
);

// Create a new cURL resource
$ch = curl_init($url);

// The original request is a POST, but we want to do a GET
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

// Set the content type to application/json
curl_setopt($ch, CURLOPT_HTTPHEADER, $httpHeader);

// Return response instead of outputting
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the POST request
$result = curl_exec($ch);

// Close cURL resource
curl_close($ch);

header('Content-Type: application/json');
echo $result;
?>
