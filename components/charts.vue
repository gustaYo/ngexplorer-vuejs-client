<template>
    <div class="col-xs-12 col-sm-12">
        <div class="row">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 style="display:inline-block;">
                        Gráfico estadisticas Ngexplorer
                    </h4>
                    <div class="btn-group pull-right" role="group">
                        <!-- Clicking on a button will change the active set, which will update data (and subsequently the chart) -->
                        <button 
                        v-for="stat in statSets" 
                        type="button" 
                        class="btn btn-default"
                        :class="{'active': activeSet == $key}"
                        v-on:click="activeSet = $key"
                        >
                        {{ traduci[$key] }}
                    </button>
                </div>
            </div>
            <div class="panel-body">
                <vue-chart
                keep-alive
                :chart-type="chartType"
                :columns="columns"
                :rows="rows"
                :options="options"
                >
            </vue-chart>
        </div>
    </div>
</div>
<wj-flex-chart 
:items-source="view"
chart-type="Column"
binding-x="date">
<wj-flex-chart-series name="Visitas totales" binding="vtotal"></wj-flex-chart-series>
<wj-flex-chart-series name="Visitas unicas" binding="vunique"></wj-flex-chart-series>
<wj-flex-chart-series name="Busquedas" binding="ftotal" chart-type="LineSymbols"></wj-flex-chart-series>
</wj-flex-chart>

</div>
</template>

<script>
        module.exports = {
            data: function () {
                return {
                    view: new wijmo.collections.CollectionView([]),
                    traduci: {
                        vtotal: 'Visitas totales',
                        ftotal: 'Búsquedas totales'
                    },
                    datachart: [],
                    chartType: 'LineChart',
                    statSets: {
                        vtotal: {
                            rows: ['date', 'vtotal', 'vunique'],
                            columns: [
                            {
                                'type': 'date',
                                'label' : 'Fecha'
                            }, 
                            {
                                'type' : 'number',
                                'label' : 'Visitas totales'
                            },
                            {
                                'type' : 'number',
                                'label' : 'Visitas únicas'
                            }
                            ]
                        },
                        ftotal: {
                            rows: ['date', 'ftotal', 'funique'],
                            columns: [
                            {
                                'type': 'date',
                                'label' : 'Fecha'
                            }, 
                            {
                                'type' : 'number',
                                'label' : 'Búsquedas totales'
                            },
                            {
                                'type' : 'number',
                                'label' : 'Búsquedas únicas'
                            }]
                        }
                    },
                    activeSet: 'vtotal',
                    options: {
                        chart: {
                            title: 'Chart Title',
                            subtitle: 'Subtitle'
                        },
                        hAxis: {title: 'Fecha'},
                        vAxis: {title: 'num'},
                        height: 500,
                        animation: {
                            duration: 500,
                            easing: 'out',
                        }
                    }
                }
            },
            computed: {
              rows: function () {
            // Get the rows of only the active set.
            var statKeys = this.statSets[this.activeSet].rows;
            
            // Get the stats for this set.
            return _
            .chain(this.datachart)
            .mapValues(function(stat) {
                var picked = _.pick(stat, statKeys);
                picked['date'] = new Date(picked['date'])
                return _.values(picked)
            })
            .toArray()
            .value();
            
        },
        columns: function () {
            return this.statSets[this.activeSet].columns
        }
    },
    components: {
        'VueCharts' : require('vue-charts')
    },
    created: function() {
        this.$http.put(localStorage.getItem('ngVueExplorer-serverRun')+'/ftp/filescount', {numdays: 1}, function(files) {
            console.log(files)
            this.datachart= files;

           this.view= new wijmo.collections.CollectionView(files)
        });
    }
};
</script>
