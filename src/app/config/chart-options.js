const DEFAULT_CHART = {
    theme: {
        palette: 'palette5',
        mode: 'dark',
    },
    markers: {
        size: 4,
        strokeColors: 'transparent',
        hover: {
            size: 5,
        },
    },
    legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: -10,
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

export const SPEED_OVERVIEW_CHART = {
    ...DEFAULT_CHART,
    chart: {
        height: 350,
        type: 'bar',
    },
    plotOptions: {
        bar: {
            horizontal: false,
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
            show: true,
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
        // max: 100,
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
            color: '#78909c',
            offsetX: 0,
            offsetY: 0,
        },
    },

};
