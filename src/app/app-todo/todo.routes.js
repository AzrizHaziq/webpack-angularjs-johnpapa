import 'angular-ui-router'

TodoRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function TodoRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state({
            name : 'abc',
            url : '/abc',
            template : '<h3>abc</h3>'
        })
        .state({
            name : 'dev',
            url : '/dev',
            template : '<h3>dev</h3>'
        });
}
