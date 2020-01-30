import { expect } from 'chai';
import lighthouseTransformer from './lighthouse-transformer';

describe('transformer/lighthouse-transformer', function() {
    it('transform lighthouse audit result to report object', () => {
        const report = lighthouseTransformer('foo', {
            categories: {
                foo: {
                    id: 'foo',
                    auditRefs: [],
                    description: '',
                    manualDescription: '',
                    score: 1,
                    title: '',
                },
                bar: {
                    id: 'bar',
                    auditRefs: [],
                    description: '',
                    manualDescription: '',
                    score: 0.7,
                    title: '',
                },
            },
        });

        expect(report.values).to.deep.equal([
            { id: 'foo', value: 100 },
            { id: 'bar', value: 70 },
        ]);
        expect(report).to.have.property('createdAt');
        expect(report).to.have.property('siteId');
        expect(report).to.have.property('values');
    });
});
