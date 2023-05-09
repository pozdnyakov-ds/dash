<template>
    <div>
        <h1>{{ $t('playa_statistic.title') }}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, possimus sit. Sint saepe error a provident deleniti fuga maxime quos adipisci, consequatur dolorum amet maiores aut ipsum in numquam velit?</p>
        <highchart :options="chartOptions" 
            :update="['options.title', 'options.series']"
            style="border: 1px solid #ccc; border-radius: 5px; margin: 10px 0 10px 0;"/>
    </div>
</template>

<script setup>
    definePageMeta({
        middleware: ['auth', 'access']
    }) 

    const chartOptions = {
        title: { 
            text: "График",
            align: 'center'
        },
        chart: {
            type: 'pie',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        subtitle: {
            text: 'Resize the frame or click buttons to change appearance'
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Chrome',
                y: 70.67,
                sliced: true,
                selected: true
            }, {
                name: 'Edge',
                y: 14.77
            },  {
                name: 'Firefox',
                y: 4.86
            }, {
                name: 'Safari',
                y: 2.63
            }, {
                name: 'Internet Explorer',
                y: 1.53
            },  {
                name: 'Opera',
                y: 1.40
            }, {
                name: 'Sogou Explorer',
                y: 0.84
            }, {
                name: 'QQ',
                y: 0.51
            }, {
                name: 'Other',
                y: 2.6
            }]
        }]
    }
</script>

<style lang="scss" scoped>

</style>