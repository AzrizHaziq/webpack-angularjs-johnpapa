import APP from './app'

const AppDirective = () => ({
    template : require('./html/app.html'),
    controller : APP.controller
});

export {
    AppDirective
};
