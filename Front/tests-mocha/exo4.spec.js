import { expect } from 'chai';
import fetch from 'node-fetch';
import { parseCsvImperative, parseCsvFunctional } from '../src/exo4.js';

describe('ex. 4 parseCsvImperative(csvText)', () => {
    let csvText;

    before(async () => {
        try {
            const response = await fetch('http://localhost:3000/data.csv');
            csvText = await response.text();
        } catch (error) {
            console.error('Erreur lors de la récupération du CSV:', error);
        }
    });

    it('should ignore the header line', () => {
        const result = parseCsvImperative(csvText);
        expect(result.length).to.be.greaterThan(0);
        expect(result[0].username).to.not.equal('svn_id');
    });

    it('should have [username, realName, website, projectName] on each contribution', () => {
        const result = parseCsvImperative(csvText);
        expect(result[0]).to.have.all.keys('username', 'realName', 'website', 'projectName');
    });

    it('should parse username, realName and projectName', () => {
        const result = parseCsvImperative(csvText);
        expect(result[0].username).to.be.a('string').and.to.have.length.greaterThan(0);
        expect(result[0].realName).to.be.a('string').and.to.have.length.greaterThan(0);
        expect(result[0].projectName).to.be.a('string').and.to.have.length.greaterThan(0);
    });

});

describe('ex. 4 parseCsvFunctional(csvText)', () => {
    let csvText;

    before(async () => {
        try {
            const response = await fetch('http://localhost:3000/data.csv');
            csvText = await response.text();
        } catch (error) {
            console.error('Erreur lors de la récupération du CSV:', error);
        }
    });

    it('should ignore the header line', () => {
        const result = parseCsvFunctional(csvText);
        expect(result.length).to.be.greaterThan(0);
        expect(result[0].username).to.not.equal('svn_id');
    });

    it('should have [username, realName, website, projectName] on each contribution', () => {
        const result = parseCsvFunctional(csvText);
        expect(result[0]).to.have.all.keys('username', 'realName', 'website', 'projectName');
    });

    it('should parse username, realName and projectName', () => {
        const result = parseCsvFunctional(csvText);
        expect(result[0].username).to.be.a('string').and.to.have.length.greaterThan(0);
        expect(result[0].realName).to.be.a('string').and.to.have.length.greaterThan(0);
        expect(result[0].projectName).to.be.a('string').and.to.have.length.greaterThan(0);
    });

    it('should produce the same result as parseCsvImperative', () => {
        const imperativeResult = parseCsvImperative(csvText);
        const functionalResult = parseCsvFunctional(csvText);
        expect(functionalResult).to.deep.equal(imperativeResult);
    });
});



describe('ex. 4', function () {
    const csvText = [
        'svn_id,real_name,web_site,project_name',
        'aadamchik,Andrus Adamchik,,apsite',
        'aaron,Aaron Bannert,http://www.clove.org/~aaron/,apr'
    ].join('\n')

    for (const implementation of [parseCsvImperative, parseCsvFunctional]) {
        describe(`${implementation.name}(csvText)`, function () {
            it('should ignore the header line', function () {
                expect(implementation(csvText).length).to.eq(2)
            })

            it('should have [username, realName, website, projectName] on each contribution', function () {
                const result = implementation(csvText)
                expect(Object.keys(result[0])).to.have.members(['username', 'realName', 'website', 'projectName'])
                expect(Object.keys(result[1])).to.have.members(['username', 'realName', 'website', 'projectName'])
            })

            it('should parse username, realName and projectName', function () {
                const result = implementation(csvText)
                expect(result[result.length - 2].username).to.eq('aadamchik')
                expect(result[result.length - 2].realName).to.eq('Andrus Adamchik')
                expect(result[result.length - 2].projectName).to.eq('apsite')
                expect(result[result.length - 1].username).to.eq('aaron')
                expect(result[result.length - 1].realName).to.eq('Aaron Bannert')
                expect(result[result.length - 1].projectName).to.eq('apr')
            })

            it('should set website to null if not provided', function () {
                const result = implementation(csvText)
                expect(result[result.length - 2].website).to.be.null
                expect(result[result.length - 1].website).to.be.string
            })
        })
    }
})