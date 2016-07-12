/**
 * Wijmo Vue interop module.
 */
var Vue = require('vue');
Vue.component('wj-auto-complete', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.AutoComplete),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.AutoComplete(this.$el));
    }
});
Vue.component('wj-calendar', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.Calendar),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.Calendar(this.$el));
    }
});
Vue.component('wj-color-picker', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.ColorPicker),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.ColorPicker(this.$el));
    }
});
Vue.component('wj-combo-box', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.ComboBox),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.ComboBox(this.$el));
    }
});
Vue.component('wj-input-color', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.InputColor),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.InputColor(this.$el));
    }
});
Vue.component('wj-input-date', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.InputDate),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.InputDate(this.$el));
    }
});
Vue.component('wj-input-date-time', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.InputDateTime),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.InputDateTime(this.$el));
    }
});
Vue.component('wj-input-mask', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.InputMask),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.InputMask(this.$el));
    }
});
Vue.component('wj-input-number', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.InputNumber),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.InputNumber(this.$el));
    }
});
Vue.component('wj-input-time', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.InputTime),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.InputTime(this.$el));
    }
});
Vue.component('wj-list-box', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.ListBox),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.ListBox(this.$el));
    }
});
Vue.component('wj-multi-select', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.input.MultiSelect),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.MultiSelect(this.$el));
    }
});
Vue.component('wj-popup', {
    template: '<div><slot/></div>',
    props: wijmo.vue.getProps(wijmo.input.Popup),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.input.Popup(this.$el));
    }
});
// ** wijmo.grid components
Vue.component('wj-flex-grid', {
    template: '<div><slot/></div>',
    props: wijmo.vue.getProps(wijmo.grid.FlexGrid),
    attached: function () {
        var ctl = new wijmo.grid.FlexGrid(this.$el, {
            autoGenerateColumns: this.$children.length == 0
        });
        wijmo.vue.initialize(this, ctl);
    }
});
Vue.component('wj-flex-grid-column', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.grid.Column),
    attached: function () {
        var grid = wijmo.Control.getControl(this.$parent.$el), col = new wijmo.grid.Column();
        wijmo.vue.initialize(this, col);
        grid.columns.push(col);
        this.$parent.$el.removeChild(this.$el);
    }
});
// ** wijmo.chart components
Vue.component('wj-flex-chart', {
    template: '<div><slot/></div>',
    props: wijmo.vue.getProps(wijmo.chart.FlexChart),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.chart.FlexChart(this.$el));
    }
});
Vue.component('wj-flex-chart-series', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.chart.Series),
    attached: function () {
        var chart = wijmo.Control.getControl(this.$parent.$el), series = new wijmo.chart.Series();
        wijmo.vue.initialize(this, series);
        chart.series.push(series);
        this.$parent.$el.removeChild(this.$el);
    }
});
// ** wijmo.gauge components
Vue.component('wj-radial-gauge', {
    template: '<div><slot/></div>',
    props: wijmo.vue.getProps(wijmo.gauge.RadialGauge),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.gauge.RadialGauge(this.$el));
    }
});
Vue.component('wj-linear-gauge', {
    template: '<div><slot/></div>',
    props: wijmo.vue.getProps(wijmo.gauge.LinearGauge),
    attached: function () {
        wijmo.vue.initialize(this, new wijmo.gauge.LinearGauge(this.$el));
    }
});
Vue.component('wj-range', {
    template: '<div/>',
    props: wijmo.vue.getProps(wijmo.gauge.Range, ['wjProperty']),
    attached: function () {
        var gauge = wijmo.Control.getControl(this.$parent.$el), rng = gauge[this.wjProperty];
        if (rng) {
            wijmo.vue.copy(rng, this);
        }
        else {
            rng = new wijmo.gauge.Range();
            wijmo.vue.initialize(this, rng);
            gauge.ranges.push(rng);
        }
        this.$parent.$el.removeChild(this.$el);
    }
});
//# sourceMappingURL=wijmo.vue.js.map