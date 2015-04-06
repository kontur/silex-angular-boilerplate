<?php

$app = require_once __DIR__ . '/../app/app.php';

//$app->mount('', new )

$app->mount('/admin', new johannesneumeier\SilexAngularBoilerplate\Controllers\Admin\Index());

$app->run();