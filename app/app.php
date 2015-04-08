<?php

require_once __DIR__ . "/../vendor/autoload.php";

use Silex\Provider;

$app = new Silex\Application();

$app['debug'] = true;

$app->register(new Provider\SecurityServiceProvider());
$app->register(new Provider\RememberMeServiceProvider());
$app->register(new Provider\SessionServiceProvider());
$app->register(new Provider\ServiceControllerServiceProvider());
$app->register(new Provider\UrlGeneratorServiceProvider());
$app->register(new Provider\FormServiceProvider());
$app->register(new Provider\TranslationServiceProvider());
$app->register(new Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../views',
));
$app->register(new Provider\SwiftmailerServiceProvider());
$app->register(new Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver' => 'pdo_mysql',
        'host' => DB_HOST,
        'dbname' => DB_NAME,
        'user' => DB_USER,
        'password' => DB_PASS,
        'charset' => 'utf8'
    )
));



// Register the SimpleUser service provider.
$simpleUserProvider = new SimpleUser\UserServiceProvider();
$app->register($simpleUserProvider);


//
// Configuration
//

// SimpleUser options. See config reference below for details.
//$app['user.options'] = array();

// Security config. See http://silex.sensiolabs.org/doc/providers/security.html for details.
$app['security.firewalls'] = array(
    // Ensure that the login page is accessible to all, if you set anonymous => false below.
//    'login' => array(
////        'pattern' => '^/user/login$',
//        'pattern' => '/foo'
//    ),
    'secured_area' => array(
        'pattern' => '^.*$',
        'anonymous' => true,
        'remember_me' => array(),
        'form' => array(
            'login_path' => '/user/login',
            'check_path' => '/user/login_check',
        ),
        'logout' => array(
            'logout_path' => '/user/logout',
        ),
        'users' => $app->share(function($app) { return $app['user.manager']; }),
    ),
);


return $app;