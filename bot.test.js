import {myFileReader} from './bot.js';
import assert from 'node:assert';
import {test} from 'node:test';

test('simple read', (t) => {
    myFileReader('test.txt');
    assert.strictEqual(1, 1);
});