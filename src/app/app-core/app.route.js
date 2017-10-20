import 'angular-ui-router'

AppRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function AppRoutes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('app', {
            url : '/',
            template : require('./html/app.html'),
        });
}
