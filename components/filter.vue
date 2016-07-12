<template>

    <div class="row row-offcanvas row-offcanvas-left" v-bind:class="[offcanvas ? 'active' : '']">
        <div class="col-xs-6 col-sm-3 sidebar-offcanvas" id="sidebar" role="navigation">
            <div class="sidebar-nav">
              <ul class="list-group">
                <li @click="selectFtpFilter($index)"  v-bind:class="[ftp.active ? 'active' : '']" class="list-group-item" v-for="ftp in ftpList">
                    {{ ftp.name }}
                </li>            
            </ul>
        </div><!--/.well -->
    </div><!--/span-->

    <div class="col-xs-12 col-sm-9">    
      <table class="table">
        <thead>
            <tr>
                <th>{{ name }}<input type="text" class="form-control" placeholder="name"
                     v-model="filter.name" 
                    @keyup="filterFtp() | debounce 300"                    
                    ></th>
                    <th><input type="text" class="form-control" placeholder="extname" v-model="filter.extname" @keyup="filterFtp() | debounce 300"></th>
                    <th>Ftp</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="file in filesFound">
                    <td>
                        <div class="directory">
                            <i class="fa" v-bind:class="[file.extname ? 'fa-file-o' : 'fa-folder-o']"></i>
                            <a href="{{ file.baseURl + '/' + file.name}}" target="_blanck">{{ decodeURIComponent(file.name) }}</a>
                        </div>
                    </td>
                    <td>
                        {{ file.extname }}
                    </td>
                    <td>
                        <a href="{{ file.baseURl }}" target="_blanck">{{ file.ftpname }}</a>                    
                    </td>                
                </tr>
            </tbody>
        </table>
    </div></div>
</template>

<script>
	/**
	 * @example navbar demos
	 * @for navbar
	 * @description
	 */
	 module.exports = {
       data: function() {
        return {
            offcanvas:false,
            ftpList: [],
            filesFound: [],
            filter: {
                name:'',
                extname:''
            }
        };
    },
    events:{
            'offcanvas' : function(data){
                this.offcanvas=data
            }
        },

    methods: {
        selectIds: function() {
            var list = new Array();
            for (var i in this.ftpList) {
                if (this.ftpList[i].active)
                    list.push(this.ftpList[i]._id)
            }
            return list;
        },
        foundById: function(id) {
            for (var i in this.ftpList) {
                if (this.ftpList[i]._id === id) {
                    return i;
                }
            }
            return false;
        },
        filterFtp: function() {
            var parms = {"type": "file", "ftps": this.selectIds(), "name": this.filter.name, extname: this.filter.extname}
            this.$http.post(localStorage.getItem('ngVueExplorer-serverRun')+'/ftp/files', parms, function(files) {
                var result = new Array();
                for (var i in files) {
                    var file = files[i];
                    var ftpserver = this.foundById(file.ftp);
                    var baseURl = this.ftpList[ftpserver].type === 'ftp' ? 'ftp://' : '';
                    baseURl = baseURl + this.ftpList[ftpserver].uri + file.directory;
                    file.baseURl = baseURl;
                    file.ftpname = this.ftpList[ftpserver].name;
                    result.push(file);
                }
                this.filesFound = result;
                localStorage.setItem('ngVueExplorer-filesFound', JSON.stringify(result));
            });
            localStorage.setItem('ngVueExplorer-TextFilter', JSON.stringify(this.filter));
        },
        selectFtpFilter: function(post) {
            this.ftpList[post].active = this.ftpList[post].active ? false : true;
            localStorage.setItem('ngVueExplorer-Filters', JSON.stringify(this.ftpList));
            this.filterFtp();
        },
        getFtpsServer: function() {
            this.$http.get(localStorage.getItem('ngVueExplorer-serverRun')+'/ftp/api/%7B%22type%22:%22ftps%22%7D',
                function(data) {
                    var list = new Array();
                    for (var i in data) {
                        var ftp = data[i];
                        ftp.active = true;
                        list.push(ftp);
                    }
                    this.ftpList = list;
                    localStorage.setItem('ngVueExplorer-Filters', JSON.stringify(this.ftpList));
                }
                );
        },
        decodeURIComponent: function(string) {
            var name = string;
            try {
                name = decodeURIComponent(name);
            } catch (e) {

            }
            return name;
        },
    },
    watch: {

    },
    created: function() {
        if (localStorage.getItem('ngVueExplorer-Filters')) {
            this.ftpList = JSON.parse(localStorage.getItem('ngVueExplorer-Filters'));
            this.filter = JSON.parse(localStorage.getItem('ngVueExplorer-TextFilter'));
            this.filesFound = JSON.parse(localStorage.getItem('ngVueExplorer-filesFound'));
        } else {
            this.getFtpsServer();

        }
        this.offcanvas=JSON.parse(localStorage.getItem('ngVueExplorer-offcanvas'));

    }
};
</script>
