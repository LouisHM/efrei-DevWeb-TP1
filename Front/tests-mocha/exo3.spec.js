/*To run a 'mocha' test : npx mocha exo2.spec.js */

import { expect } from 'chai'
import { map } from '../src/exo3.js'

describe('ex. 2', function () {
    describe('map(array, fn)', function () {
        })
        it('should apply the function for all values', function () {
            expect(map([1, 2, 3, 4, 5, 9, 10], item => item * 2)).to.deep.eq([2, 4,6,8,10,18,20])
        })
})
