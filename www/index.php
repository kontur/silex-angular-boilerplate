<?php

use Symfony\Component\HttpFoundation\Request;

$app = require_once __DIR__ . '/../app/app.php';



$app->mount('/api', new johannesneumeier\SilexAngularBoilerplate\Controllers\Api());
$app->mount('/admin', new johannesneumeier\SilexAngularBoilerplate\Controllers\Admin\Index());

// make this route match every other route (note, we use angular html5, so the server will send requests here
// we need to match those javascript side, but first, serve index :)
$app->match('/', function (Request $request) use ($app) {
    return $app['twig']->render('index.twig');
})
    ->bind('index');


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

