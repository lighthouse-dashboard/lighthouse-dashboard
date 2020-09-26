import CONFIG from '../../../../../config/dashboard';
import getCssVar from '../utils/get-css-var';

export const DEFAULT_CHART = {
    series: [],
    labels: [],

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
        theme: 'dark',
        x: {
            show: true,
        },
        marker: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 400,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1000,
            options: {
                chart: {
                    height: 200,
                },
            },
        },
    ],
    colors: CONFIG.chartColors,
};

export const GAUGE_CHART = {
    ...DEFAULT_CHART,
    chart: {
        height: 300,
        type: 'radialBar',
        foreColor: getCssVar('--color--text-color'),
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        radialBar: {
            track: {
                background: 'transparent',
            },
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
};

export const BAR_CHART = {
    ...DEFAULT_CHART,
    chart: {
        type: 'bar',
        height: 200,
        background: 'transparent',
        foreColor: getCssVar('--color--text-color'),
        toolbar: {
            show: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
        },
    },
    xaxis: {
        show: false,
        categories: [],
    },
    yaxis: {
        show: false,
        max: 100,
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
};

export const RADAR_CHART = {
    ...DEFAULT_CHART,
    series: [],
    chart: {
        foreColor: getCssVar('--color--text-color'),
        height: 300,
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
    fill: {
        opacity: 0.2,
        colors: CONFIG.chartColors,
    },
};

export const SITE_OVERVIEW_CHART = {
    ...DEFAULT_CHART,

    chart: {
        foreColor: getCssVar('--color--text-color'),
        height: 200,
        type: 'line',
        background: 'transparent',
        toolbar: {
            show: false,
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
