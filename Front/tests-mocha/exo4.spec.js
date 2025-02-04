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

    it('should set website to null if not provided', () => {
        const testCsv = `svn_id,real_name,website,project_name
${csvText}\nrlrrrrr,Real Name,,Project A`;
        const result = parseCsvImperative(testCsv);
        expect(result.some(entry => entry.website === null)).to.be.true;
    });

    it('should correctly parse current user data', () => {
        const result = parseCsvImperative(csvText);
        const currentUserData = result.find(entry => entry.username === 'rlrrrrr');
        if (currentUserData) {
            expect(currentUserData).to.have.all.keys('username', 'realName', 'website', 'projectName');
        }
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

    it('should set website to null if not provided', () => {
        const testCsv = `svn_id,real_name,website,project_name
${csvText}\nrlrrrrr,Real Name,,Project A`;
        const result = parseCsvFunctional(testCsv);
        expect(result.some(entry => entry.website === null)).to.be.true;
    });

    it('should produce the same result as parseCsvImperative', () => {
        const imperativeResult = parseCsvImperative(csvText);
        const functionalResult = parseCsvFunctional(csvText);
        expect(functionalResult).to.deep.equal(imperativeResult);
    });
});