<?php
//костыль для обхода CORS и загрузки XML со стороннего ресурса.
$file = simplexml_load_file("http://www.cbr.ru/scripts/XML_daily.asp");
$data = iconv("windows-1251", "utf-8", $file->saveXML());
file_put_contents("Currency.xml", $data);
$file = "Currency.xml";
$lines = file($file);
$add_info = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"; //а это костыль чтобы была кодировка UTF-8 в заголовке
$lines[0] = $add_info;
file_put_contents($file, $lines);