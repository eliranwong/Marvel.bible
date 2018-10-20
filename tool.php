<html>

<head>

<link rel="icon" href="marvel.png">

<title>Marvel Bible: Marvellous Bible Resources</title>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="for devotion, study or researches.">
<meta name="author" content="Eliran Wong">
<meta name="keywords" content="marvel,marvellous,bible,app,interlinear,morphology,strong,original,Hebrew,Greek,BHS,GNT,OpenGNT,NA27,NA28,biblebento,lexicon,linguistic,etcbc,annotation,discourse,analysis">

<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Marvel Bible: Marvellous Bible Resources">

<script src="/marvel.js?v=0.1"></script>
<script src="/w3.js"></script>

<link rel="stylesheet" type="text/css" href="marvel.css?v=0.1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

<script>var lastLookupWid = 'w0';</script>
<style>
div.lookup {
    font-size: 110%;
}
</style>

</head>

<body>

<div onclick="return ''">

<w id='w0'></w>

<div style='text-align: center;'><a href="javascript:void(0)" onclick="window.open(location.href);">[FULL PAGE]</a></div>

<?php
if (isset($_GET["vid"])) {
echo '<div class="info">';

$bNoString = $_GET["b"];
$bNo = (int)$bNoString;
$bookList = array("0", "Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1 Sam", "2 Sam", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phil", "Col", "1 Thess", "2 Thess", "1 Tim", "2 Tim", "Titus", "Phlm", "Heb", "Jas", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev");
$book = $bookList[$bNo];
echo '<h2>' . $book . ' ' . $_GET["c"] . ':' . $_GET["v"] . '</h2>';

include 'translation/' . $_GET["vid"] . '.html';
include 'lgntdf/' . $_GET["vid"] . '.html';
include 'verseWords/' . $_GET["vid"] . '.html';

$bNo = $bNo * 10 + 70;
echo '<h2>BibleBento.com</h2><a href="https://biblebento.com/index.html?tools&' . $bNo . '.' . $_GET["c"] . '.' . $_GET["v"] . '" target="_blank">Open Resources for ' . $book . ' ' . $_GET["c"] . ':' . $_GET["v"] . '</a>';

echo '</div>';
}
?>

<?php
if (isset($_GET["otvid"])) {
echo '<div class="info">';

$bNoString = $_GET["b"];
$bNo = (int)$bNoString;
$bookList = array("0", "Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1 Sam", "2 Sam", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phil", "Col", "1 Thess", "2 Thess", "1 Tim", "2 Tim", "Titus", "Phlm", "Heb", "Jas", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev");
$book = $bookList[$bNo];
echo '<h2>' . $book . ' ' . $_GET["c"] . ':' . $_GET["v"] . '</h2>';

echo '<h2>Clause Segmentation</h2>';
include 'otClauses/' . $_GET["otvid"] . '.html';

echo '<h2>Linguistic Annotations</h2>';
include 'otAnnotations/' . $_GET["otvid"] . '.html';

echo '<h2>Words & Morphology</h2>';
include 'otWords/' . $_GET["otvid"] . '.html';

$bNoList = array("0", "Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1 Sam", "2 Sam", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phil", "Col", "1 Thess", "2 Thess", "1 Tim", "2 Tim", "Titus", "Phlm", "Heb", "Jas", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev");
$bNo = $bNoList[$bNo];
echo '<h2>BibleBento.com</h2><a href="https://biblebento.com/index.html?tools&' . $bNo . '.' . $_GET["c"] . '.' . $_GET["v"] . '" target="_blank">Open Resources for ' . $book . ' ' . $_GET["c"] . ':' . $_GET["v"] . '</a>';

echo '</div>';
}
?>

<div class="lookup">

<?php
if (isset($_GET["vlink"])) {
$bNoString = $_GET["b"];
$bNo = (int)$bNoString;
$bookList = array("0", "Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1 Sam", "2 Sam", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phil", "Col", "1 Thess", "2 Thess", "1 Tim", "2 Tim", "Titus", "Phlm", "Heb", "Jas", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev");
$book = $bookList[$bNo];
echo '<h2><a href="javascript:void(0)" onclick="openVerseData(' . $_GET["vlink"] . ',' . $_GET["b"] . ',' . $_GET["c"] . ',' . $_GET["v"] . ');">' . $book . ' ' . $_GET["c"] . ':' . $_GET["v"] . '</a></h2>';
}
?>

<?php
if (isset($_GET["morph"])) {
echo '<h2>ETCBC Morphology</h2><div class="info">';
include 'morph/' . $_GET["morph"] . '.html';
echo '</div>';
}
?>

<?php
if (isset($_GET["cl"])) {
echo '<h2>Clause ID: ' . $_GET["cl"] . '</h2><div class="info">';
include 'clause/c' . $_GET["cl"] . '.html';
echo '</div>';
}
?>

<?php
if (isset($_GET["wid"])) {
echo '<h2>WORD ID: ' . $_GET["wid"] . '</h2><div class="info">';
include 'word/' . $_GET["b"] . '/' . $_GET["wid"] . '.html';
echo '</div>';
}
?>

<?php
if (isset($_GET["lex"])) {

echo '<h2>Lexicons: ' . $_GET["lex"] . '</h2><div class="info">';
include 'biblebentoLexicons/' . $_GET["lex"] . '.html';
echo '</div>';

echo '<h2>TBESG: ' . $_GET["lex"] . '</h2><div class="info">';
include 'tbesg/' . $_GET["lex"] . '.html';
echo '</div>';

echo '<h2>Morphology: ' . $_GET["lex"] . '</h2><div class="info">';
include 'morphology/' . $_GET["lex"] . '.html';
echo '</div>';

echo '<h2>BibleBento.com</h2><div class="info">';
$bNoString = $_GET["b"];
$bNo = (int)$bNoString;
$bookList = array("0", "Gen", "Exod", "Lev", "Num", "Deut", "Josh", "Judg", "Ruth", "1 Sam", "2 Sam", "1 Kgs", "2 Kgs", "1 Chr", "2 Chr", "Ezra", "Neh", "Esth", "Job", "Ps", "Prov", "Eccl", "Song", "Isa", "Jer", "Lam", "Ezek", "Dan", "Hos", "Joel", "Amos", "Obad", "Jonah", "Mic", "Nah", "Hab", "Zeph", "Hag", "Zech", "Mal", "Matt", "Mark", "Luke", "John", "Acts", "Rom", "1 Cor", "2 Cor", "Gal", "Eph", "Phil", "Col", "1 Thess", "2 Thess", "1 Tim", "2 Tim", "Titus", "Phlm", "Heb", "Jas", "1 Pet", "2 Pet", "1 John", "2 John", "3 John", "Jude", "Rev");
$book = $bookList[$bNo];

$bNo = $bNo * 10 + 70;
echo '<a href="https://biblebento.com/index.html?tools&' . $bNo . '.' . $_GET["c"] . '.' . $_GET["v"] . '" target="_blank">Open Resources for ' . $book . ' ' . $_GET["c"] . ':' . $_GET["v"] . '</a>';
echo '</div>';

}
?>

<?php
if (isset($_GET["lgntdf"])) {
echo '<h2>LGNTDF: ' . $_GET["lgntdf"] . '</h2><div class="info">';
include 'lgntdf_w/' . $_GET["lgntdf"] . '.html';
echo '</div>';
}
?>

</div>

<div style='text-align: center;'><a href="javascript:void(0)" onclick="window.open(location.href);">[FULL PAGE]</a></div>

<p>&nbsp;</p>

<hr><div id="footer"></div>

<script>document.getElementById("footer").innerHTML = getFooter();</script>

</div>

</body>
</html>