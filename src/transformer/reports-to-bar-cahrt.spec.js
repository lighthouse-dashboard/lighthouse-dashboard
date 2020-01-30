import { expect } from 'chai';
import createReport from '../../tests/utils/create-report';
import reportsToBarChart from './reports-to-bar-cahrt';


describe('transformer/reports-to-bar-chart', function() {
    it('create dataset for bar chat', () => {
        const data = reportsToBarChart([
            createReport({
                id: 'report1',
                siteId: 'report1',
                values: [
                    { id: 'foo', value: 50 },
                    { id: 'bar', value: 50 },
                ],
            }),
            createReport({
                id: 'report2',
                siteId: 'report2',
                values: [
                    { id: 'foo', value: 60 },
                ],
            }),
        ], ['Foo'], ['foo']);

        expect(data).to.deep.equal({
            labels: ['Foo'],
            datasets: [{
                name: 'foo',
                data: [50, 60],
            }],
        });
    });
});
