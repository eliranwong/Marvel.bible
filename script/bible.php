<!DOCTYPE html>

<html>

<head>

<link rel="icon" href="/marvel.png">

<title>Marvel Bible: Marvellous Bible Resources</title>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="for devotion, study or research.">
<meta name="author" content="Eliran Wong">
<meta name="keywords" content="marvel,marvellous,bible,app,interlinear,morphology,strong,original,Hebrew,Greek,BHS,GNT,OpenGNT,NA27,NA28,biblebento,lexicon,linguistic,etcbc,annotation,discourse,analysis">

<link rel="stylesheet" type="text/css" href="/bible.css?v=0.1">

<script>
//var curPos;
var lastLookupWid = 'w0';
var mod = 'bible';
var b = <?php echo $_GET["b"]; ?>;
var c = <?php echo $_GET["c"]; ?>;
var v = <?php echo $_GET["v"]; ?>;
</script>

<script src="/marvel.js"></script>
<script src="/w3.js"></script>

</head>

<body>
<div onclick="return ''">

<w id='w0'></w>

<?php include '../chapters/' . $_GET["b"] . '_' . $_GET["c"] . '.html';?>
<hr>

<?php include $_GET["b"] . '_' . $_GET["c"] . '.html';?>

<hr>
<?php include '../chapters/' . $_GET["b"] . '_' . $_GET["c"] . '.html';?>

<p>&nbsp;</p>
<div id="footer"></div>
<script>loadBible(b,c,v)</script>

</div>
</body>

</html>