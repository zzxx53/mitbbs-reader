export default function fixXmlErrors(xmlString) {
    xmlString = xmlString.replace('"/mwap/wy/index.php""', '"/mwap/wy/index.php"');
    xmlString = xmlString.replace('"/mwap/classified/ca_list.php""', '"/mwap/classified/ca_list.php"');
    return xmlString
}