import {assert} from "chai";
import {analyzeContributions} from "../src/exo5.js";


describe('ex. 5 pullAndAnalyzeCsv()', () => {
    it('should compute various statistics about contributors', () => {
        const mockTestData = [
            {
                username: 'gkesavan',
                realName: 'Giridharan Kesavan',
                projectName: 'Zookeeper'
            },
            {
                username: 'ludwig',
                realName: 'Ludwig Magnusson',
                projectName: 'Turbine'
            },
            {
                username: 'seade',
                realName: 'Scott Eade',
                projectName: 'Turbine'
            },
            {
                username: 'ludwig',
                realName: 'Ludwig Magnusson',
                projectName: 'Apache Turbine'
            }

        ];

        const result = analyzeContributions(mockTestData);

        assert.deepEqual(result, {
            firstProject: 'Apache Turbine',
            nbUniqueContributors: 3,
            avgNameLength: 14.666666666666666,
            mostActiveContributorName: 'Ludwig Magnusson',
            top10Projects: [
                { project: 'Turbine', count: 2 },
                { project: 'Apache Turbine', count: 1},
                { project: 'Zookeeper', count: 1},
            ]
        });
    });
});