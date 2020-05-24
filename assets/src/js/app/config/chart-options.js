import CONFIG from '../../../../../config/dashboard';

export const DEFAULT_CHART = {
    colors: CONFIG.ui.chartColors,
    plotOptions: {
        bar: {
            horizontal: false,
        },
    },
    markers: {
        size: 4,
        strokeColors: 'transparent',
        hover: {
            size: 5,
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        offsetX: 0,
        labels: {
            useSeriesColors: true,
        },
    },
    noData: {
        text: 'No data available',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
            // color: undefined,
            fontSize: '14px',
            // fontFamily: undefined
        },
    },
    tooltip: {
        tooltip: {
            theme: 'dark',
        },
        x: {
            show: true,
        },
        marker: {
            show: false,
        },
    },
};

export const GAUGE_CHART = {
    chart: {
        height: 300,
        type: 'radialBar',
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        theme: 'dark',
    },
    plotOptions: {
        radialBar: {
            dataLabels: {
                name: {
                    fontSize: '22px',
                },
                value: {
                    fontSize: '16px',
                },
            },
        },
    },
    colors: CONFIG.ui.chartColors,
};

export const RADAR_CHART = {
    ...DEFAULT_CHART,
    series: [],
    chart: {
        height: 350,
        type: 'radar',
        toolbar: {
            show: true,
            tools: {
                download: false,
            },
        },
    },
    xaxis: {
        categories: [],
    },
    colors: CONFIG.ui.chartColors,
};

export const COMPARISON_CHART = {
    ...DEFAULT_CHART,
    chart: {
        height: 200,
        type: 'bar',
        background: 'transparent',
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        theme: 'dark',
    },
    series: [],
    title: {
        style: {
            colors: CONFIG.ui.theme.text,
        },
    },
    xaxis: {
        categories: [],
        labels: {
            style: {
                colors: CONFIG.ui.theme.text,
            },
        },
    },
    yaxis: {
        show: true,
        tickAmount: 2,
        min: 0,
        max: 100,
        labels: {
            style: {
                colors: CONFIG.ui.theme.text,
            },
        },
    },
};

export const SITE_OVERVIEW_CHART = {
    ...DEFAULT_CHART,

    chart: {
        height: 200,
        type: 'line',
        background: 'transparent',
        toolbar: {
            show: false,
        },
    },
    tooltip: {
        theme: 'dark',
    },
    stroke: {
        width: 2,
        curve: 'smooth',
    },
    series: [],
    markers: {
        size: 0,
    },
    xaxis: {
        categories: [],
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        labels: {
            show: false,
            trim: true,
        },
    },
    yaxis: {
        show: false,
        tickAmount: 1,

        floating: true,
        min: 0,
        max: 100,
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
    },
};
