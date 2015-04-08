<?php

use Symfony\Component\HttpFoundation\Request;

$app = require_once __DIR__ . '/../app/app.php';


$app->match('/', function (Request $request) use ($app) {
    return $app['twig']->render('index.twig');
})
->bind('index');


$app->mount('/api', new johannesneumeier\SilexAngularBoilerplate\Controllers\Api());
$app->mount('/admin', new johannesneumeier\SilexAngularBoilerplate\Controllers\Admin\Index());


//// Mount the user controller routes:
//$app->mount('/user', $simpleUserProvider);
//
//
//// Other routes and controllers...
//$app->get('/', function () use ($app) {
//    if ($app['security']->isGranted('ROLE_ADMIN')) {
//        return $app['twig']->render('admin/index.twig', array());
//    }
//    return $app->redirect('/admin/user');
//});

$app->run();

