import '../style/app.css'
import angular from 'angular'

import AppRoutes from './app-core/app.route'
import APP_CONSTANT from './app-core/app.constant'
import { Footer, Header } from './app-core/app.directive'

import TodoRoutes from './app-todo/todo.routes'
import TodoController from './app-todo/todo.controller'

import AuthService from './services/auth.service'
import UserService from './services/user.service'

/**
 * Main App
 */
angular
    .module('app', [
        'ui.router',
        'app.todo'
    ])
    .constant('APP_CONSTANT', APP_CONSTANT)
    .config(AppRoutes)
    .directive('appHeader', Footer)
    .directive('appFooter', Header)
    .factory('AuthService', AuthService)
    .factory('UserService', UserService)

/**
 * todoList
 */
angular
    .module('app.todo', ['ui.router'])
    .config(TodoRoutes)
    .controller("TodoController", TodoController)
