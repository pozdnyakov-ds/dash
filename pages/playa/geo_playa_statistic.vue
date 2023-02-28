<template>
    <div>
        <h1>{{ $t('geo_playa_statistic.title') }}</h1>
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
            text: "График" 
        },
        chart: {
            type: 'column'
        },
        subtitle: {
            text: 'Resize the frame or click buttons to change appearance'
        },
        legend: {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical'
        },
        xAxis: {
            categories: ['2018', '2019', '2020', '2021', '2023'],
            labels: {
                x: -10
            }
        },
        yAxis: {
            allowDecimals: true,
            title: {
                text: 'Кол-во'
            }
        },
        series: [
            {
                name: "Серия 1",
                data: [0, 10, 5, 100, 10] 
            },
            {
                name: "Серия 2",
                data: [10, 50, 3, 200, 110] 
            }
        ]
    }

</script>

<style lang="scss" scoped>

</style>