<?php

namespace johannesneumeier\SilexAngularBoilerplate\Controllers;

use Silex\Application;
use Silex\ControllerProviderInterface;


class Api implements ControllerProviderInterface
{

    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        // redirect base to main index
        $controllers->get('/', function () use ($app) {
            return $app->redirect($app['url_generator']->generate('index'));
        });

        // define your api endpoints here
        $controllers->match('/foo', function () use ($app) {
            return 'foo';
        });

        return $controllers;
    }
}