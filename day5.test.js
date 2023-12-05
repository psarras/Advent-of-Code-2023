import assert from 'node:assert';
import {test} from 'node:test';
import {processFile} from "./day5.js";


test('get the seeds', (t) => {
    let lines = [
        "seeds: 79 14 55 13",
        "",
        "seed-to-soil map:",
        "50 98 2",
        "52 50 48",
        "",
        "soil-to-fertilizer map:",
        "0 15 37",
        " 37 52 2",
        "39 0 15",];
    let data = processFile(lines);
    console.log(JSON.stringify(data));
    let seeds = data.seeds;
    assert.strictEqual(seeds.length, 4);
    assert.strictEqual(seeds[0], 79);
});

