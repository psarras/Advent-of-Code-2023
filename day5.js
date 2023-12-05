import {readIteratorAsArray} from "./bot.js";

let keyOfMaps = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location"
];

export function processMap(valueToMap, map) {

    let value = NaN;
    for (let i = 0; i < map.length; i++) {

        let destinationStart = map[i][0];
        let sourceStart = map[i][1];
        let length = map[i][2];
        let sourceEnd = sourceStart + length;
        // console.log(`check ${valueToMap} -> ${destinationStart} ${sourceStart} ${length} End: ${sourceEnd}`);
        if (valueToMap < sourceEnd && valueToMap >= sourceStart) {
            value = valueToMap - sourceStart + destinationStart;
            // console.log(`found map ${valueToMap} -> ${value}`);
        }
    }
    if (isNaN(value))
        return valueToMap;
    return value;
}

function getSeedMap(seed, data) {
    let chunks = [];
    for (let i = 0; i < keyOfMaps.length; i++) {
        const key = keyOfMaps[i];
        const previousKey = i === 0 ? seed : chunks[i - 1];
        let chunk = processMap(previousKey, data.maps[key]);
        chunks.push(chunk);
    }
    return chunks;
}

export function getLowestSeedMaps(data) {
    let lowest = Number.MAX_VALUE;
    let winner = NaN;
    for (const seed of data.seeds) {
        let first = seed[0];
        let second = seed[1];
        console.log(`getLowestSeedMaps: ${first} ${second}`);
        for (let i = 0; i < second; i++) {
            let seedElement = first + i;
            let value = getSeedMap(seedElement, data);
            // console.log(`getLowestSeedMaps: ${seedElement} ${JSON.stringify(value)}`);
            let location = value[value.length - 1];
            if (location < lowest) {
                lowest = location;
                winner = seedElement;
            }
        }
        console.log(`lowest so far: win ${winner} lowest ${lowest}`);
    }

    return {seed: winner, location: lowest};
}

export function getSeedMaps(data, seedMethod) {
    // let data = processFile(lines);
    // console.log(JSON.stringify(data));
    let results = {};
    for (const seed of data.seeds) {
        //is Iteratable
        if (seedMethod) {
            for (const seedElement of seed) {
                results[seedElement] = [];
                let chunks = getSeedMap(seedElement, data);
                results[seedElement].push(...chunks);
            }
        } else {
            results[seed] = [];
            let chunks = getSeedMap(seed, data);
            results[seed].push(...chunks);
        }
    }
    return results;
}


const path = 'day5.input.txt';
let lines = await readIteratorAsArray(path);
// let data = lowestLocation(lines, true);
// console.log(JSON.stringify(data));
let data2 = getLowestLocationMulti(lines);
console.log(JSON.stringify(data2));

export function getLowestLocationMulti(lines) {
    let fileData = processFile(lines, false);
    console.log(JSON.stringify(fileData));
    let data = getLowestSeedMaps(fileData);
    return data;
}

export function lowestLocation(lines) {
    let fileData = processFile(lines, true);
    let data = getSeedMaps(fileData);
    console.log(JSON.stringify(data));

    let lowest = Number.MAX_VALUE;
    let winner = NaN;
    for (const [key, value] of Object.entries(data)) {
        let location = value[value.length - 1];
        if (location < lowest) {
            lowest = location;
            winner = key;
        }
    }
    return {seed: winner, location: lowest};
}

function extractNumbers(line) {
    let numbers = [];
    let seedsStrings = line.split(" ");
    for (const seedsString of seedsStrings) {
        let number = parseInt(seedsString.trim());
        if (!isNaN(number)) {
            numbers.push(number);
            // console.log(`found seed ${number}`);
        }
    }
    return numbers;
}

export function alternativeSeedExtraction(seedsLine) {
    let cleanLines = extractNumbers(seedsLine);
    let newSeeds = [];
    for (let i = 0; i < cleanLines.length; i += 2) {
        let first = cleanLines[i];
        let second = cleanLines[i + 1];
        // let bucket = [];
        // console.log(`alternativeSeedExtraction: ${first} ${second}`);
        // for (let j = 0; j < second; j++) {
        //     bucket.push(first + j);
        // }
        newSeeds.push([first, second]);
    }
    return newSeeds;
}

export function processFile(lines, seedMethod) {
    let data = {};
    let seeds = [];
    let maps = {};
    let currentMap = "";
    for (const line of lines) {
        if (line.trim() === "")
            continue;
        if (line.startsWith("seeds:")) {
            let seedsLine = line.substring("seeds:".length);
            if (seedMethod)
                seeds.push(...extractNumbers(seedsLine));
            else
                seeds.push(...alternativeSeedExtraction(seedsLine));
        } else {
            if (currentMap !== "") {
                let chunk = extractNumbers(line);
                if (chunk.length > 0)
                    maps[currentMap].push(chunk);
            }
        }
        for (const key of keyOfMaps) {
            if (line.startsWith(key)) {
                currentMap = key;
                maps[currentMap] = [];
            }
        }
    }
    data.seeds = seeds;
    data.maps = maps;
    return data;
}
