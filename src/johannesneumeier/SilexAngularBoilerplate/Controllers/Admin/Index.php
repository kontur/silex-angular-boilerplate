<?php

namespace johannesneumeier\SilexAngularBoilerplate\Controllers\Admin;

use Silex;

class Index implements Silex\ControllerProviderInterface
{

    public function connect(Silex\Application $app)
    {
        $controllers = $app['controller_factory'];

        //$controllers->get

        return $controllers;
    }
}