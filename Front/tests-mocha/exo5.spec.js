import {assert, expect} from "chai";
import {analyzeContributions} from "../src/exo5.js";
import {parseCsvImperative} from "../src/exo4.js";
import fetch from "node-fetch";


describe('ex. 5', function () {
    let csvText;

    before(async () => {
        try {
            const response = await fetch('http://localhost:3000/data.csv');
            csvText = await response.text();
        } catch (error) {
            console.error('Erreur lors de la récupération du CSV:', error);
        }
    });

    describe('analyzeCsv()', function () {
        it('should compute various statistics about contributors', async function () {
            const stats = await parseCsvImperative(csvText);
            const result = analyzeContributions(stats);
            expect(result.firstProject).to.eq('abdera')
            expect(result.nbUniqueContributors).to.eq(4595)
            expect(result.avgNameLength.toFixed(2)).to.eq('14.21')
            expect(result.mostActiveContributorName).to.eq('Jim Jagielski')
            expect(result.top10Projects).to.deep.eq([
                'incubator',
                'Apache Software Foundation',
                'member',
                'apsite',
                'ws',
                'incubator-pmc',
                'pmc-chairs',
                'openoffice',
                'httpd',
                'commons'
            ])
        })
    })
})