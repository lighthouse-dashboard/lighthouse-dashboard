import CONFIG from '../../../../dashboard.config';

const DEFAULT_CHART = {
    theme: {
        mode: CONFIG.UI.USE_DARK_MODE ? 'dark' : 'bright',
    },
    colors: CONFIG.UI.CHART_COLORS,
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
        height: 350,
        type: 'radialBar',
        toolbar: {
            show: true,
            tools: {
                download: false,
            },
        },
    },
    plotOptions: {
        radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
                background: 'rgba(0, 0, 0, 0)',
            },
            hollow: {
                margin: 0,
                size: '50%',
                position: 'front',
            },
            dataLabels: {
                name: {
                    color: CONFIG.UI.CHART_COLORS[0],
                    fontSize: '12px',
                },
                value: {
                    color: CONFIG.UI.CHART_COLORS[0],
                    fontSize: '18px',
                    offsetY: -30,
                },
            },
        },
    },
    colors: CONFIG.UI.CHART_COLORS,
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 0.7,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
        },
    },
};

export const SPEED_OVERVIEW_CHART = {
    ...DEFAULT_CHART,
    chart: {
        height: 200,
        type: 'bar',
        background: 'transparent',
        toolbar: {
            show: true,
            tools: {
                download: false,
            },
        },
    },
    series: [],
    xaxis: {
        categories: [],
    },
    yaxis: {
        show: true,
        tickAmount: 2,
        min: 0,
        max: 100,
    },
};

export const SITE_OVERVIEW_CHART = {
    ...DEFAULT_CHART,

    chart: {
        height: 200,
        type: 'line',
        background: 'transparent',
        toolbar: {
            show: true,
            tools: {
                download: false,
            },
        },
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
