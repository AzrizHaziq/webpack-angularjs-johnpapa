import '../../style/app.css'
import angular from 'angular'

import AppRoutes from './app.route'
import APP_CONSTANT  from './app.constant'

import TodoRoutes from './../app-todo/todo.routes'
import TodoController from './../app-todo/todo.controller'

import AuthService from './../services/auth.service'
import UserService from './../services/user.service'

/**
 * Main App
 */
angular
    .module('app', ['ui.router'])
    .constant('APP_CONSTANT', APP_CONSTANT)
    .config(AppRoutes)

    .factory('AuthService', AuthService)
    .factory('UserService', UserService)

/**
 * todoList
 */
angular
    .module('app.todo', ['ui.router'])
    .config(TodoRoutes)
    .controller("AppController", TodoController)

