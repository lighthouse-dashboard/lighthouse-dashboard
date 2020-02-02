import { expect } from 'chai';
import getReportValueByKey, { getReportValueScoreByKey } from './get-report-value-score-by-key';

describe('utils/getReportValueByKey', function() {
    it('get existing reportvalue ', () => {
        const reportValues = [
            { id: 'foo', value: 1 },
            { id: 'bar', value: 2 },
            { id: 'baz', value: 3 },
        ];
        const value = getReportValueByKey(reportValues, 'bar');

        expect(value).to.be.equal(reportValues[1]);
    });

    it('get null if empty array', () => {
        const reportValues = [
        ];
        const value = getReportValueByKey(reportValues, 'barr');

        expect(value).to.be.equal(null);
    });

    it('get null if not existent', () => {
        const reportValues = [
            { id: 'foo', value: 1 },
            { id: 'bar', value: 2 },
            { id: 'baz', value: 3 },
        ];
        const value = getReportValueByKey(reportValues, 'barr');

        expect(value).to.be.equal(null);
    });

    it('get first if duplicated id', () => {
        const reportValues = [
            { id: 'foo', value: 1 },
            { id: 'foo', value: 2 },
            { id: 'baz', value: 3 },
        ];
        const value = getReportValueByKey(reportValues, 'foo');

        expect(value).to.be.equal(reportValues[0]);
    });
});

describe('utils/getReportValueScoreByKey', function() {
    it('get existing reportvalue ', () => {
        const reportValues = [
            { id: 'foo', value: 1 },
            { id: 'bar', value: 2 },
            { id: 'baz', value: 3 },
        ];
        const value = getReportValueScoreByKey(reportValues, 'bar');

        expect(value).to.be.equal(reportValues[1].value);
    });

    it('get null if not existent', () => {
        const reportValues = [
            { id: 'foo', value: 1 },
            { id: 'bar', value: 2 },
            { id: 'baz', value: 3 },
        ];
        const value = getReportValueScoreByKey(reportValues, 'barr');

        expect(value).to.be.equal(null);
    });
    it('get first if duplicate id', () => {
        const reportValues = [
            { id: 'foo', value: 1 },
            { id: 'foo', value: 2 },
            { id: 'baz', value: 3 },
        ];
        const value = getReportValueScoreByKey(reportValues, 'barr');

        expect(value).to.be.equal(null);
    });
});
