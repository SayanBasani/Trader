<?php 
ob_start();
?>
<div>
    Sayan
</div>
<?php
$content = ob_get_clean();
$title = "Home";
include 'layout.php';
?>