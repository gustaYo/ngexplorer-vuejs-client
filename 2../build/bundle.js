webpackJsonp([2],{159:function(t,e,i){var a,s;a=i(160),s=i(163),t.exports=a||{},t.exports.__esModule&&(t.exports=t.exports["default"]),s&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=s)},160:function(t,e,i){"use strict";function a(t){return t&&t.__esModule?t:{"default":t}}var s=i(161),o=a(s);t.exports={data:function(){return{sortKey:"",offcanvas:!1,ftpList:[],tabsFtp:[],activeTab:0,urlDir:[],filter:{active:!1},subfolders:[]}},filters:{decodeURIComponent:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){var e=t;try{e=decodeURIComponent(e)}catch(i){}return e}),fileSizeConvert:function(t){var e=parseFloat(t/1024/1024).toFixed(2),i=" MB";return e>=1024&&(e=parseFloat(e/1024).toFixed(2),i=" GB"),"NaN"==e?"none":e+i}},components:{dropdown:i(154).dropdown,tooltip:i(154).tooltip},props:{},computed:{},methods:{sortedFiles:function(t){var e=this.FoundTab(this.activeTab);this.tabsFtp[e].sortKey=t,this.tabsFtp[e].sort[t]=-1*this.tabsFtp[e].sort[t]},typeFileIcon:function(t){var e="";switch(t){case".mpg":e="glyphicon-film";break;case".mp4":e="glyphicon-film";break;case".pdf":e="glyphicon-book";break;case".jpg":e="glyphicon-picture";break;default:e="glyphicon-file"}return e},fileFolder:function(t){return"undefined"==typeof t.extname},openSubFolders:function(t){var e="";if(t!==this.urlDir.length-1){var t=t+1-this.urlDir.length;e=this.urlDir.slice(0,t)}e=e.join("/"),""===e&&(e="/");var i={directory:e,ftp:this.activeTab};this.$http.post(localStorage.getItem("ngVueExplorer-serverRun")+"/ftp/files",i,function(t){var e=new Array;for(var i in t)this.fileFolder(t[i])&&e.push(t[i]);this.subfolders=e})},getFtpsServer:function(){this.$http.get(localStorage.getItem("ngVueExplorer-serverRun")+"/ftp/api/list",function(t){this.ftpList=t})},FoundTab:function(t){for(var e in this.tabsFtp)if(this.tabsFtp[e]._id===t)return e;return!1},FileSizeConvert:function(t){var e=parseFloat(t/1024/1024).toFixed(2),i=" MB";return e>=1024&&(e=parseFloat(e/1024).toFixed(2),i=" GB"),"NaN"==e?"none":e+i},decodeURIComponent:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){var e=t;try{e=decodeURIComponent(e)}catch(i){}return e}),OpenFtpTab:function(t){var e=this.FoundTab(t._id);if(this.activeTab=t._id,e)this.UpdatePath(this.tabsFtp[e].directory);else{var i={_id:t._id,name:t.name,uri:t.uri,dirscan:t.dirscan,active:"active",files:[],type:t.type,sort:{name:1,size:1,time:1},sortKey:"name"};this.tabsFtp.push(i),this.FindFolder(t)}},OpenInNewTab:function(t){var e=this.FoundTab(this.activeTab),i="ftp"===this.tabsFtp[e].type?"ftp://":"",a=window.open(i+this.tabsFtp[e].uri+t,"_blank");a.focus()},CloseTab:function(t){this.tabsFtp.splice(t,1),this.activeTab=this.tabsFtp[this.tabsFtp.length-1]._id,localStorage.setItem("ngVueExplorer-tabs",(0,o["default"])(this.tabsFtp)),this.UpdatePath(this.tabsFtp[this.tabsFtp.length-1].directory)},MoveTo:function(t){if(-1!==t){if(t!==this.urlDir.length-1){var t=t+1-this.urlDir.length;this.urlDir=this.urlDir.slice(0,t)}}else this.urlDir=this.urlDir.slice(0,t);var e=this.urlDir.join("/");""===e&&(e="/");var i={directory:e,ftp:this.activeTab};this.GetFilesParms(i,this.activeTab)},FindFolder:function(t){var e="";if("undefined"!=typeof t.dirscan)e=t.dirscan;else{e=t.directory;var i="/";"/"===e&&(i=""),e=e+i+t.name}if(this.fileFolder(t)){var a={directory:e,ftp:this.activeTab};this.filter.active=!1,this.GetFilesParms(a,this.activeTab),"undefined"==typeof t.dirscan&&this.getSizeFolder(t)}else this.OpenInNewTab(e)},UpdatePath:function(t){this.filter.active||(t="/"===t?[""]:t.split("/"),this.$set("urlDir",t),localStorage.setItem("ngVueExplorer-urlDir",(0,o["default"])(t)),localStorage.setItem("ngVueExplorer-tabs",(0,o["default"])(this.tabsFtp)))},FilterFileFolder:function(){var t={type:"file",ftps:[this.activeTab],name:this.filter.name};this.GetFilesParms(t,this.activeTab)},GetFilesParms:function(t,e){this.$http.post(localStorage.getItem("ngVueExplorer-serverRun")+"/ftp/files",t,function(i){var a=this.FoundTab(e);this.tabsFtp[a].files=i,this.tabsFtp[a].directory=t.directory,this.UpdatePath(t.directory)})},getSizeFolder:function(t){"undefined"==typeof t.size&&this.$http.get(localStorage.getItem("ngVueExplorer-serverRun")+"/ftp/filescount",t,function(t){console.log(t)})}},watch:{activeTab:function(t,e){localStorage.setItem("ngVueExplorer-activeTab",t)}},created:function(){localStorage.getItem("ngVueExplorer-tabs")&&(this.tabsFtp=JSON.parse(localStorage.getItem("ngVueExplorer-tabs")),this.activeTab=localStorage.getItem("ngVueExplorer-activeTab"),this.urlDir=JSON.parse(localStorage.getItem("ngVueExplorer-urlDir"))),this.getFtpsServer()}}},161:function(t,e,i){t.exports={"default":i(162),__esModule:!0}},162:function(t,e,i){var a=i(139),s=a.JSON||(a.JSON={stringify:JSON.stringify});t.exports=function(t){return s.stringify.apply(s,arguments)}},163:function(t,e){t.exports='<div class="row row-offcanvas row-offcanvas-left" v-bind:class="[offcanvas ? \'active\' : \'\']"> <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id=sidebar role=navigation> <div class=sidebar-nav> <ul class=list-group> <li transition=listanim v-bind:class="[ftp._id === activeTab ? \'active\' : \'\']" class=list-group-item v-for="ftp in ftpList" @click=OpenFtpTab(ftp)> {{ ftp.name }} </li> </ul> </div> </div> <div class="col-xs-12 col-sm-9"> <p class="pull-left visible-xs"> <button type=button class="btn btn-primary btn-xs" data-toggle=offcanvas @click="offcanvas=!offcanvas">Ver/Ocultar listado</button> </p> <div class="alert alert-info" v-if="tabsFtp.length === 0"> <strong>Hola!</strong> Selecciona un proveedor para comenzar </div> <div v-if="tabsFtp.length > 0"> <div class=well-sm> <div class=btn-group> <button @click=MoveTo(-1) type=button class="btn btn-default"><span class="glyphicon glyphicon-chevron-up"></span></button> <button @click="[filter.active = !filter.active]" type=button class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button> <div class=animated v-show=filter.active transition=fade> <div class=input-group> <input class=form-control type=text placeholder=filtro v-model=filter.name @keyup="FilterFileFolder() | debounce 300"> <span class=input-group-addon>Filtrar</span> </div> </div> <div class="animated btn-group" v-show=!filter.active transition=fade> <div class=btn-group v-for="dir in urlDir"> <button @click=MoveTo($index) type=button class="btn btn-primary">{{decodeURIComponent(dir)}}/</button> <dropdown v-if="$index < urlDir.length - 1" @click=openSubFolders($index)> <tooltip effect=scale placement=top content="Directorios contenidos"> <button type=button class="btn btn-default" data-toggle=dropdown> <span class=caret></span> </button> </tooltip> <ul slot=dropdown-menu class=dropdown-menu> <li v-for="subf in subfolders"><a @click=FindFolder(subf)>{{ decodeURIComponent(subf.name) }}</a></li> </ul> </dropdown> </div> </div> </div> </div> <ul class="nav nav-tabs"> <li @click=OpenFtpTab(tab) v-bind:class="[tab._id === activeTab ? \'active\' : \'\']" v-for="tab in tabsFtp"><a>{{ tab.name }} <button v-if="tabsFtp.length > 1" @click=CloseTab($index) type=button class=close data-dismiss=alert aria-hidden=true> &#10007;</button></a></li> </ul> <div class=tab-content style="height: 70vh;overflow: auto"> <div class=tab-pane v-bind:class="[tab._id === activeTab ? \'active\' : \'\']" v-for="tab in tabsFtp"> <table class=table> <thead> <tr> <th @click="sortedFiles(\'name\')">Name <span style="float: right" class=glyphicon v-bind:class="[tab.sort.name === 1 ? \'glyphicon-arrow-up\' : \'glyphicon-arrow-down\']" v-show="tab.sortKey===\'name\'"></span></th> <th @click="sortedFiles(\'size\')">Size <span style="float: right" class=glyphicon v-bind:class="[tab.sort.size === 1 ? \'glyphicon-arrow-up\' : \'glyphicon-arrow-down\']" v-show="tab.sortKey===\'size\'"></span> </th> <th @click="sortedFiles(\'time\')">Time <span style="float: right" class=glyphicon v-bind:class="[tab.sort.time === 1 ? \'glyphicon-arrow-up\' : \'glyphicon-arrow-down\']" v-show="tab.sortKey===\'time\'"></span> </th> </tr> </thead> <tbody> <tr v-for="file in tab.files | orderBy tab.sortKey tab.sort[tab.sortKey]" @click=FindFolder(file)> <td> <div class=directory> <span class=glyphicon v-bind:class="[file.extname ? typeFileIcon(file.extname) : \'glyphicon-folder-close\']"></span> <label>{{ file.name | decodeURIComponent }}</label> </div> </td> <td class=text-right> {{ file.size | fileSizeConvert}} </td> <td class=text-right> {{ file.time | moment \'MMMM Do YYYY, h:mm:ss a\'}} </td> </tr> </tbody> </table> </div> </div> </div> </div> </div>'}});