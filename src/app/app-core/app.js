import '../../style/app.css'
import angular from 'angular'
import AppRoutes from './app.route'
import AppCtrl from './app.controller'
import APP_CONSTANT  from './app.constant'
import AuthService from './../services/auth.service'
import UserService from './../services/user.service'

angular
    .module('app', ['ui.router'])
    .constant('APP_CONSTANT', APP_CONSTANT)
    .config(AppRoutes)
    .controller("AppController", AppCtrl)

    .factory('AuthService', AuthService)
    .factory('UserService', UserService)




