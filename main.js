var Vue = require('vue');
var VueRouter = require('vue-router')
Vue.config.debug = true;
Vue.use(require('vue-resource'));
Vue.use(VueRouter);

// Set up a new router
var router = new VueRouter();

// Route config
router.map({
    '/home': {
        name: 'home',
        component: require('./components/home.vue')
    },
     '/explorer': {
        name: 'explorer',
        component: require('./components/explorer.vue')
    },
    '/filter': {
        name: 'filter',
        component: require('./components/filter.vue')
    },
});
// For every new route scroll to the top of the page
router.beforeEach(function() {
    window.scrollTo(0, 0)
});
// If no route is matched redirect home
router.redirect({
    '*': '/home'
});
// Start up our app
router.start(require('./app.vue'), '#container');