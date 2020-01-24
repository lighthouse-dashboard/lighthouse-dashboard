import { expect } from 'chai';
import reportsToLineChart from './index';
import mockData from './mock.json';

describe('reports-to-line-chart', function() {
    it('check labels', () => {
        const chartData = reportsToLineChart(mockData);
        expect(chartData.labels).to.be.a('array');
        expect(chartData.labels).to.deep.equal(
            [
                '23/01 11:10',
                '23/01 11:15',
                '23/01 11:16',
                '23/01 11:18',
                '23/01 11:27',
                '23/01 11:38',
                '23/01 11:39',
                '23/01 11:42',
                '23/01 12:57',
                '23/01 16:28',
                'Merge branch \'develop\''
            ]
        );
    });

    it('check datasets', () => {
        const chartData = reportsToLineChart(mockData);
        expect(chartData.datasets).to.be.a('array');
        expect(chartData.datasets[0]).to.deep.equal(
            {
                name: 'performance',
                data: [
                    91,
                    74,
                    99,
                    95,
                    76,
                    96,
                    100,
                    84,
                    92,
                    96,
                    98,
                ],
            },
        );
    });
});
