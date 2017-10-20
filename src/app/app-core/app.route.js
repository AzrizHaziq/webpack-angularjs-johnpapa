import 'angular-ui-router'

AppRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function AppRoutes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state({
            name : 'hello',
            url : '/hello',
            template : '<h3>hello world!</h3>'
        })
        .state({
            name: 'about',
            url: '/about',
            template: '<h3>Its the UI-Router hello world app!</h3>'
        });
}
