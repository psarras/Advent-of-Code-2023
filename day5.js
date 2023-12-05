import {readIteratorAsArray} from "./bot.js";

const path = 'day5.input.txt';
let lines = await readIteratorAsArray(path);

function extractNumbers(line) {
    let numbers = [];
    let seedsStrings = line.split(" ");
    for (const seedsString of seedsStrings) {
        let number = parseInt(seedsString.trim());
        if (!isNaN(number))
            numbers.push(parseInt(seedsString.trim()));
    }
    return numbers;
}

export function processFile(lines) {
    let data = {};
    let seeds = [];
    let maps = {};
    let i = 0;
    let currentMap = "";
    let keyOfMaps = [
        "seed-to-soil",
        "soil-to-fertilizer",
        "fertilizer-to-water",
        "water-to-light",
        "light-to-temperature",
        "temperature-to-humidity",
        "humidity-to-location"
    ];
    for (const line of lines) {
        if(line.trim() === "")
            continue;
        if (line.startsWith("seeds:")) {
            let seedsLine = line.substring("seeds:".length);
            seeds.push(...extractNumbers(seedsLine));
        } else {
            if (currentMap !== "")
                maps[currentMap].push(extractNumbers(line));
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
