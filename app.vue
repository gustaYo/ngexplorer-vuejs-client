<template>
  <div class="container">
    <div>

      <nav class="navbar navbar-default" role="navigation">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button @click="collapse=!collapse" type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <button @click="toggleMenuRight" type="button" class="navbar-toggle">
           <span class="glyphicon glyphicon-hand-right" v-bind:class="[offcanvas ? 'glyphicon-hand-left' : 'glyphicon-hand-right']"></span>
         </button>
         <a class="navbar-brand" v-link="{name: 'home'}">Ngexplorer</a>
       </div>
       <!-- Collect the nav links, forms, and other content for toggling -->
       <div class="navbar-collapse navbar-ex1-collapse" v-show="collapse" v-bind:class="[collapse ? '' : 'collapse']" transition="fade">
        <ul class="nav navbar-nav">
        <li v-link="{name: 'explorer',activeClass: 'active'}"><a>Explorar</a></li> 
          <li v-bind:class="[$route.name==='filter' ? 'active' : '']"><a v-link="{name: 'filter'}">Buscar</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a @click="showStadist()">Estadisticas</a></li>
          <li v-bind:class="[$route.name==='charts' ? 'active' : '']"><a v-link="{name: 'charts'}">Charts</a></li>
          <li><a @click="clearLocalStorage()">Reiniciar</a></li>            
        </ul>
      </div><!-- /.navbar-collapse -->
    </nav>

    <modal title="Estadisticas Ngexplorer" :show.sync="zoomModal" effect="zoom" width="400">
      <div slot="modal-body" class="modal-body">
        <ul class="list-group">
          <li class="list-group-item">
            <span class="badge">{{ stadist.allUnique }}</span>
            Visitas unicas
          </li>
          <li class="list-group-item">
            <span class="badge">{{ stadist.allTotal }}</span>
            Visitas totales
          </li>
          <li class="list-group-item">
            <span class="badge">{{ stadist.todayUnique }}</span>
            Visitas unicas hoy
          </li>
          <li class="list-group-item">
            <span class="badge">{{ stadist.todayTotal }}</span>
            Visitas totales hoy
          </li>
          <li class="list-group-item">
            <span class="badge">{{ stadist.TotalFilters }}</span>
            Numero de busquedas
          </li>
          <li class="list-group-item">
            <span class="badge">{{ stadist.TotalFiles }}</span>
            Numero de archivos
          </li>
        </ul>
        {{ stadist| json }}
      </div>
      <div slot="modal-footer" class="modal-footer">
        <a href="https://rice.uci.cu/" class="btn btn-default">Ir a rice</a>  
      </div>
    </modal>
    <div>
      <router-view class="animated" transition="entern"></router-view> 
    </div>

  </div>

</div>

</template>

<script>

  var useragent = require('express-useragent');
	/**
	 * @example navbar demos
	 * @for navbar
	 * @description
	 */
	 module.exports = {
   data: function() {
    return {
      counter:{},
      zoomModal: false,
      stadist:{},
      collapse:false,
      offcanvas:false
    }
  },
  components: {
    'modal': require('vue-strap').modal
  },
  methods: {
    showStadist:function(){
      this.zoomModal=true;
      this.$http.get(localStorage.getItem('ngVueExplorer-serverRun')+'/user/counter', function(res) {
        this.stadist=res;
      });
    },
    toggleMenuRight:function(){
      this.offcanvas=!this.offcanvas
      this.$broadcast('offcanvas', this.offcanvas);      

    },
    clearLocalStorage: function() {
      var name = /^ngVueExplorer-/;
      Object.keys(localStorage)
      .forEach(function(key) {
        if (name.test(key)) {
          localStorage.removeItem(key);
        }
      });
      window.location.reload();
    },
    counterVisit:function(data){
     this.$http.post(localStorage.getItem('ngVueExplorer-serverRun')+'/user/counter', data, function(res) {
      this.counter=res;
    });

   }
 },
 watch: {
  offcanvas: function(newVal, oldVal) {
    localStorage.setItem('ngVueExplorer-offcanvas', JSON.stringify(newVal));
  }
},
created: function() {
  var userAgent = useragent.parse(navigator.userAgent);
  var data = {
    browser: userAgent.browser,
    browser_version: userAgent.version,
    device: 'dsf',
    os: userAgent.platform,
    os_version: userAgent.os,
    type: 'v'
  }
  this.offcanvas=JSON.parse(localStorage.getItem('ngVueExplorer-offcanvas'));

  this.counterVisit(data);
}
};
</script>