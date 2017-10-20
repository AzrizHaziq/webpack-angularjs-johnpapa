import '../../style/app.css'
import angular from 'angular'
import AppRoutes from './app.route'
import AppCtrl from './app.controller'
import APP_CONSTANT  from './app.constant'

angular
    .module('app', ['ui.router'])
    .constant('APP_CONSTANT', APP_CONSTANT)
    .config(AppRoutes)
    .controller("AppController", AppCtrl)
