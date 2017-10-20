import 'angular-ui-router'

TodoRoutes.$inject = ['$stateProvider'];

export default function TodoRoutes($stateProvider) {

    $stateProvider
        .state('todo', {
            url : '/todo',
            template : require('./html/todo.html'),
            controller : 'TodoController as todo',
        });
}
