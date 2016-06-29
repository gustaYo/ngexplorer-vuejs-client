var Vue = require('vue');
var VueRouter = require('vue-router');
var Moment = require('moment');
Vue.config.debug = true;
Vue.use(require('vue-resource'));
Vue.use(VueRouter);

Vue.filter('moment', function (date,format) {   
   return Moment(parseInt(date)).format(format);
})

Vue.transition('entern',{
  enterClass: 'pulse',
  leaveClass: 'invisible'
})


// Set up a new router
var router = new VueRouter();

// definiendo ruta server
var serverRun=localStorage.getItem('ngVueExplorer-serverRun')
if (!serverRun) {
   var prod = "http://"+window.location.hostname;
   var dev="http://ngexplorer-beta.prod.uci.cu"
   localStorage.setItem('ngVueExplorer-serverRun',dev)
}

// Route config
router.map({
    '/home': {
        name: 'home',
        component: function (resolve) {
          require(['./components/home.vue'], resolve)
      },
  },
  '/explorer': {
    name: 'explorer',
    component: function (resolve) {
      require(['./components/explorer.vue'], resolve)
  },
},
'/filter': {
    name: 'filter',
    component: function (resolve) {
      require(['./components/filter.vue'], resolve)
  },
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