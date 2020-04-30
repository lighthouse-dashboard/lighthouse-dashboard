import CONFIG from '../../../../config/dashboard';

const DEFAULT_CHART = {
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
        height: 350,
        type: 'radialBar',
        toolbar: {
            show: true,
            tools: {
                download: false,
            },
        },
    },
    tooltip: {
        theme: 'dark',
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
                    color: CONFIG.UI.COLOR_THEME.primary,
                    fontSize: '12px',
                },
                value: {
                    color: CONFIG.UI.COLOR_THEME.primary,
                    fontSize: '18px',
                    offsetY: -30,
                },
                style: {
                    colors: ['#333'],
                },
            },
        },
    },
    colors: CONFIG.UI.CHART_COLORS,
};

export const COMPARISON_CHART = {
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
    tooltip: {
        theme: 'dark',
    },
    series: [],
    title: {
        style: {
            colors: CONFIG.UI.COLOR_THEME.text,
        },
    },
    xaxis: {
        categories: [],
        labels: {
            style: {
                colors: CONFIG.UI.COLOR_THEME.text,
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
                colors: CONFIG.UI.COLOR_THEME.text,
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
            show: true,
            tools: {
                download: false,
            },
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
