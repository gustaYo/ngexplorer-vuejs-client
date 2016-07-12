var Vue = require('vue');
var VueRouter = require('vue-router');
var VueCharts = require('vue-charts');
var Moment = require('moment');
Vue.config.debug = true;
Vue.use(require('vue-resource'));
Vue.use(VueRouter);
Vue.use(VueCharts);

require('style!css!./build/animate.min.css');
require('style!css!./build/mystyles.css');

// npm install script-loader style-loader css-loader --save
require('style!css!./build/wijmo/wijmo.min.css');
require("script!./build/wijmo/wijmo.min.js");
require("script!./build/wijmo/wijmo.input.min.js");
require("script!./build/wijmo/wijmo.grid.min.js");
require("script!./build/wijmo/wijmo.chart.min.js");
require("script!./build/wijmo/wijmo.gauge.min.js");
require("script!./build/wijmo/wijmo.vue.js");

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
 var dev = "http://"+window.location.hostname+':3010';
 var prod="http://ngexplorer-beta.prod.uci.cu"
 localStorage.setItem('ngVueExplorer-serverRun',prod)
}

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


  '/charts': {
    name: 'charts',
    component: function (resolve) {
      require([
        './components/charts.vue',
        './components/wijmocomponents.js',
        ], resolve)
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
router.start(require('./app.vue'), '#app');