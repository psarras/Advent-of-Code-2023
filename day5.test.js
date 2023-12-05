import assert from 'node:assert';
import {test} from 'node:test';
import {
    processFile,
    getSeedMaps,
    processMap,
    lowestLocation,
    alternativeSeedExtraction,
    getLowestLocationMulti
} from "./day5.js";


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
    let data = processFile(lines, true);
    console.log(JSON.stringify(data));
    let seeds = data.seeds;
    assert.strictEqual(seeds.length, 4);
    assert.strictEqual(seeds[0], 79);
});

const lines = [
    "seeds: 79 14 55 13",
    "",
    "seed-to-soil map:",
    "50 98 2",
    "52 50 48",
    "",
    "soil-to-fertilizer map:",
    "0 15 37",
    " 37 52 2",
    "39 0 15",
    "",
    "fertilizer-to-water map:",
    "49 53 8",
    "0 11 42",
    "42 0 7",
    "57 7 4",
    "",
    "water-to-light map:",
    "88 18 7",
    "18 25 70",
    "",
    "light-to-temperature map:",
    "45 77 23",
    "81 45 19",
    "68 64 13",
    "",
    "temperature-to-humidity map:",
    "0 69 1",
    "1 0 69",
    "",
    "humidity-to-location map:",
    "60 56 37",
    "56 93 4",
];
test('get the last map', (t) => {
    let dataFile = processFile(lines, true);
    let data = getSeedMaps(dataFile);
    console.log(JSON.stringify(data));
    assert.strictEqual(data["79"].length, 7);
    assert.strictEqual(data["79"][6], 82);
});


test('get the lowest map', (t) => {
    let data = lowestLocation(lines, true);
    assert.strictEqual(data.location, 35);
});

test('alternative seed extraction', (t) => {
    let data = alternativeSeedExtraction("seeds: 79 14 55 13");
    console.log(JSON.stringify(data));
    assert.strictEqual(data[0][1], 80);
    assert.strictEqual(data[0][2], 81);
});

test('alternative seed extraction', (t) => {
    let data = getLowestLocationMulti(lines);
    console.log(JSON.stringify(data));
    assert.strictEqual(data.location, 46);
});
test('get a map', (t) => {
    let map = [
        [50, 98, 2],
        [52, 50, 48],
    ];
    let seed = 79;
    let value = processMap(seed, map);
    assert.strictEqual(value, 81);
});
