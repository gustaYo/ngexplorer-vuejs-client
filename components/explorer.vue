<template>
	<div class="row row-offcanvas row-offcanvas-left" v-bind:class="[offcanvas ? 'active' : '']">
		<div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
			<div class="sidebar-nav">
				<ul class="list-group">
					<li transition="listanim"  v-bind:class="[ftp._id === activeTab ? 'active' : '']" class="list-group-item" v-for="ftp in ftpList" @click="OpenFtpTab(ftp)">
						{{ ftp.name }}
					</li>            
				</ul>
			</div><!--/.well -->
		</div><!--/span--> 

		<div class="col-xs-12 col-sm-9">

			<p class="pull-left visible-xs">
				<button type="button" class="btn btn-primary btn-xs" data-toggle="offcanvas"  @click="offcanvas=!offcanvas">Ver/Ocultar listado</button>
			</p>
			<div class="alert alert-info" v-if="tabsFtp.length === 0">
				<strong>Hola!</strong> Selecciona un proveedor para comenzar
			</div>
			<div v-if="tabsFtp.length > 0">
				<div class='well-sm'>
					<div class="btn-group">
						<button @click="MoveTo(-1)" type="button" class="btn btn-default"><span class="glyphicon glyphicon-chevron-up"></span></button>
						<button @click="[filter.active = !filter.active]" type="button" class="btn btn-default"><span class="glyphicon glyphicon-search"></span></button>
						<div class="animated" v-show="filter.active" transition="fade">

							<div class="input-group" >
								<input class="form-control" type="text" placeholder="filtro" v-model="filter.name" @keyup="FilterFileFolder() | debounce 300">
								<span class="input-group-addon">Filtrar</span>
							</div>	

						</div>						

						<div class="animated btn-group" v-show="!filter.active" transition="fade">
							<div class="btn-group" v-for="dir in urlDir">
								<button @click="MoveTo($index)" type="button" class="btn btn-primary" >{{decodeURIComponent(dir)}}/</button>
								<dropdown v-if="$index < urlDir.length - 1" @click="openSubFolders($index)">
									<tooltip
									effect="scale"
									placement="top"
									content="Directorios contenidos">
									<button type="button" class="btn btn-default" data-toggle="dropdown">
										<span class="caret"></span>
									</button>
								</tooltip>						
								<ul slot="dropdown-menu" class="dropdown-menu">
									<li v-for="subf in subfolders"><a  @click="FindFolder(subf)">{{ decodeURIComponent(subf.name) }}</a></li>
								</ul>
							</dropdown>
						</div>
					</div>

				</div>

				
			</div>
			<ul class="nav nav-tabs">
				<li @click="OpenFtpTab(tab)" v-bind:class="[tab._id === activeTab ? 'active' : '']" v-for="tab in tabsFtp"><a>{{ tab.name }}  <button v-if="tabsFtp.length > 1" @click="CloseTab($index)" type="button" class="close" data-dismiss="alert" aria-hidden="true"> &#10007;</button></a></li>
			</ul>
			<div class="tab-content" style="height: 70vh;overflow: auto" >
				<div class="tab-pane" v-bind:class="[tab._id === activeTab ? 'active' : '']"  v-for="tab in tabsFtp">           
					<table class="table">
						<thead>
							<tr>
								<th @click="sortedFiles('name')">Name <span style="float: right" class="glyphicon" v-bind:class="[tab.sort.name === 1 ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down']" v-show="tab.sortKey==='name'"></span></th>
								<th @click="sortedFiles('size')">Size <span style="float: right" class="glyphicon" v-bind:class="[tab.sort.size === 1 ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down']" v-show="tab.sortKey==='size'"></span>
								</th>
								<th @click="sortedFiles('time')">Time <span style="float: right" class="glyphicon" v-bind:class="[tab.sort.time === 1 ? 'glyphicon-arrow-up' : 'glyphicon-arrow-down']" v-show="tab.sortKey==='time'"></span>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="file in tab.files | orderBy tab.sortKey tab.sort[tab.sortKey]"
							@click="FindFolder(file)">
							<td>
								<div class="directory">
									<span class="glyphicon" v-bind:class="[file.extname ? typeFileIcon(file.extname) : 'glyphicon-folder-close']" ></span>                                    
									<label>{{ file.name | decodeURIComponent }}</label>
								</div>
							</td>
							<td class="text-right">
								{{ file.size | fileSizeConvert}}
							</td>
							<td class="text-right">
								{{ file.time | moment 'MMMM Do YYYY, h:mm:ss a'}}
							</td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>   
	</div>
</div> 
</div>
</template>

<script>

	module.exports = {
		data: function() {
			return {
				sortKey: '',
				offcanvas:false,
				ftpList: [],
				tabsFtp: [],
				activeTab: 0,
				urlDir: [],
				filter: {
					active: false
				},
				subfolders:[]
			};
		},
		filters:{
			decodeURIComponent:function(string){
				var name = string;
				try {
					name = decodeURIComponent(name);
				} catch (e) {

				}
				return name;
			},
			fileSizeConvert: function(size) {
				var retorn = parseFloat(size / 1024 / 1024).toFixed(2);
				var s = " MB";
				if (retorn >= 1024) {
				// convertir a gigas
				retorn = parseFloat(retorn / 1024).toFixed(2);
				s = " GB";
			}
			return retorn == 'NaN' ? 'none' : retorn + s;
		}
	},
	components: {     
		'dropdown': require('vue-strap').dropdown,
		'tooltip': require('vue-strap').tooltip
	},
	props: {
	},
	computed: {
	},
	methods: {
		sortedFiles: function(key) {	 			
			var tabPost = this.FoundTab(this.activeTab);
			this.tabsFtp[tabPost].sortKey=key;
			this.tabsFtp[tabPost].sort[key]=this.tabsFtp[tabPost].sort[key] * -1		
		},
		typeFileIcon: function(extname) {
			var icon = '';
			switch (extname) {
				case '.mpg':
				icon = 'glyphicon-film';
				break;
				case '.mp4':
				icon = 'glyphicon-film';
				break;
				case '.pdf':
				icon = 'glyphicon-book';
				break;
				case '.jpg':
				icon = 'glyphicon-picture';
				break;
				default:
				icon = 'glyphicon-file';
			}
			return icon;
		}
		,
		fileFolder: function(file) {
			return typeof file.extname === 'undefined';
		},
		openSubFolders:function(index){
			var dir=""; 
			if (index !== this.urlDir.length - 1) {
				var index = index + 1 - this.urlDir.length;
				dir = this.urlDir.slice(0, index);
			}
			dir = dir.join('/');
			if (dir === '')
				dir = '/';
			var parms = {"directory": dir, "ftp": this.activeTab};
			this.$http.post(localStorage.getItem('ngVueExplorer-serverRun')+'/ftp/files', parms, function(res) {
				var subfloders = new Array();
				for (var i in res) {
					if (this.fileFolder(res[i])) {
						subfloders.push(res[i])
					}
				}
				this.subfolders=subfloders;
			});
		},
		getFtpsServer: function() {
			this.$http.get(localStorage.getItem('ngVueExplorer-serverRun')+'/ftp/api/list',
				function(data) {
					this.ftpList = data;
				}
				);
		},
		FoundTab: function(id) {
			for (var i in this.tabsFtp) {
				if (this.tabsFtp[i]._id === id) {
					return i;
				}
			}
			return false;
		},
		FileSizeConvert: function(size) {
			var retorn = parseFloat(size / 1024 / 1024).toFixed(2);
			var s = " MB";
			if (retorn >= 1024) {
				// convertir a gigas
				retorn = parseFloat(retorn / 1024).toFixed(2);
				s = " GB";
			}
			return retorn == 'NaN' ? 'none' : retorn + s;
		},
		decodeURIComponent: function(string) {
			var name = string;
			try {
				name = decodeURIComponent(name);
			} catch (e) {

			}
			return name;
		},
		OpenFtpTab: function(ftp) {
			var post = this.FoundTab(ftp._id);
			this.activeTab = ftp._id;
			if (post) {
				this.UpdatePath(this.tabsFtp[post].directory);
			} else {
				var tab = {
					_id: ftp._id,
					name: ftp.name,
					uri: ftp.uri,
					dirscan: ftp.dirscan,
					active: 'active',
					files: [],
					type: ftp.type,
					sort: {
						name: 1,
						size: 1,
						time: 1			
					},
					sortKey:"name"
				};
				this.tabsFtp.push(tab);
				this.FindFolder(ftp);
			}
		},
		OpenInNewTab: function(pathRecur) {
			var post = this.FoundTab(this.activeTab);
			var url = this.tabsFtp[post].type === 'ftp' ? 'ftp://' : '';
			var win = window.open(url + this.tabsFtp[post].uri + pathRecur, '_blank');
			win.focus();
		},
		CloseTab: function(index) {
			this.tabsFtp.splice(index, 1);
			this.activeTab = this.tabsFtp[this.tabsFtp.length - 1]._id;
			localStorage.setItem('ngVueExplorer-tabs', JSON.stringify(this.tabsFtp));
			this.UpdatePath(this.tabsFtp[this.tabsFtp.length - 1].directory);
		},
		MoveTo: function(index) {
			if (index !== -1) {
				if (index !== this.urlDir.length - 1) {
					var index = index + 1 - this.urlDir.length;
					this.urlDir = this.urlDir.slice(0, index);
				}
			} else {
				this.urlDir = this.urlDir.slice(0, index);
			}
			var dir = this.urlDir.join('/');
			if (dir === '')
				dir = '/';
			var parms = {"directory": dir, "ftp": this.activeTab};
			this.GetFilesParms(parms, this.activeTab);
		},
		FindFolder: function(node) {
			var dir = '';
			if (typeof node.dirscan !== 'undefined') {
				dir = node.dirscan;
			} else {
				dir = node.directory;
				var join = '/'
				if (dir === '/') {
					join = '';
				}
				dir = dir + join + node.name;
			}
			if (!this.fileFolder(node)) {
				this.OpenInNewTab(dir);
			} else {
				var parms = {"directory": dir, "ftp": this.activeTab};
				this.filter.active = false;
				this.GetFilesParms(parms, this.activeTab);
				if (typeof node.dirscan === 'undefined') {
					this.getSizeFolder(node);
				}
			}			
			
		},
		UpdatePath: function(dir) {
			if (!this.filter.active) {
				if (dir === "/") {
					dir = [""];
				} else {
					dir = dir.split('/');
				}
				this.$set('urlDir', dir);
				localStorage.setItem('ngVueExplorer-urlDir', JSON.stringify(dir));
				localStorage.setItem('ngVueExplorer-tabs', JSON.stringify(this.tabsFtp));
			}
		},
		FilterFileFolder: function() {
			var parms = {
				type: 'file',
				ftps: [this.activeTab],
				name: this.filter.name
			}
			this.GetFilesParms(parms, this.activeTab);
		},
		GetFilesParms: function(parms, tab) {
			this.$http.post(localStorage.getItem('ngVueExplorer-serverRun')+'/ftp/files', parms, function(files) {
				var post = this.FoundTab(tab);
				this.tabsFtp[post].files = files;
				this.tabsFtp[post].directory = parms.directory;
				this.UpdatePath(parms.directory);
			});

		},
		getSizeFolder:function(node){
			if (typeof node.size === 'undefined') {
				this.$http.get(localStorage.getItem('ngVueExplorer-serverRun')+'/ftp/filescount', node, function(result) {
					console.log(result);
				});
			}
		}
	},
	watch: {
		activeTab: function(newVal, oldVal) {
			localStorage.setItem('ngVueExplorer-activeTab', newVal);
		}
	},
	created: function() {
		if (localStorage.getItem('ngVueExplorer-tabs')) {
			this.tabsFtp = JSON.parse(localStorage.getItem('ngVueExplorer-tabs'));
			this.activeTab = localStorage.getItem('ngVueExplorer-activeTab');
			this.urlDir = JSON.parse(localStorage.getItem('ngVueExplorer-urlDir'));
		}
		this.getFtpsServer();
	}
};


</script>