<html><head></head><body>

<?php
// codes for communicating with sqlite database

// create or connect to a sqlite database
$db = new PDO('sqlite:marvelData/note.sqlite');

// create a table
$db->exec('
	CREATE TABLE IF NOT EXISTS VerseNote (
		Book INT,
		Chapter INT,
		Verse INT,
		Note TEXT)
		');

// insert a record
$qry = $db->prepare(
    'INSERT INTO VerseNote (Book, Chapter, Verse, Note) VALUES (?, ?, ?, ?)');
$qry->execute(array(1,1,1,'<p>NOTE INSERTED</p>'));

// query record(s)
$result = $db->query('SELECT Note FROM VerseNote WHERE Book = 1 AND Chapter = 1 AND Verse = 1');
foreach ($result as $row) {
	echo $row['Note'];
}

// update record(s)
$update = 'UPDATE VerseNote SET Note = "<p>NOTE UPDATED</p>" 
                WHERE Book = 1 AND Chapter = 1 AND Verse = 1';
$db->exec($update);

// query record(s) & counting total number of recrod(s) found
$result = $db->query('SELECT Note FROM VerseNote WHERE Book = 1 AND Chapter = 1 AND Verse = 1');

$rows = $result->fetchAll();
$row_count = count($rows);
echo $row_count.' record(s) found!';

foreach ($rows as $row) {
	echo $row['Note'];
}

// Updating
$delete = 'DELETE FROM VerseNote WHERE Book = 1 AND Chapter = 1 AND Verse = 1';
$db->exec($delete);

// delete a table
$db->exec("DROP TABLE VerseNote");

// disconnect database
$filedb = null;

?>

</body></html>