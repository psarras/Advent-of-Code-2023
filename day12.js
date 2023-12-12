import {fileURLToPath} from "url";
import {readIteratorAsArray} from "./bot.js";

export function getVariants(springs, numberOfBrokenSprings)
{
    let variants = [];
    for (let i = 0; i < springs.length; i++)
    {
        let combo = "";
        let lastPart = "";
        let leftOver = springs.length - i;
        if (leftOver < numberOfBrokenSprings)
            break;

        for (let j = 0; j < i; j++)
        {
            combo += ".";
        }

        for (let j = 0; j < numberOfBrokenSprings; j++)
        {
            combo += "#";
        }

        for (let j = 0; j < leftOver - numberOfBrokenSprings; j++)
        {
            lastPart += "?";
        }
        variants.push({combo: combo + lastPart, lastPart: lastPart});
    }
    return variants;
}

function processSprings(line)
{
    let springArray = line.split(" ");
    let damagedGroups = springArray[1].split(",")
        .map(parseInt);
    let springs = springArray[0].split("");
    return {
        allSymbols: springArray[0],
        springs: springs,
        counts: damagedGroups
    };
}

export function getArrangements(line)
{
    let {allSymbols, springs, counts} = processSprings(line);
    let groups = allSymbols.split(".");
    groups = groups.filter(x => x.length > 0);
    console.log(`groups: ${groups}`);
    let arrangements = 0;

    for (let i = 0; i < groups.length; i++)
    {
        let chunk = groups[i];
        let combinations = getVariants(chunk, counts[i]);
    }

    return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url))
{
    let path = "day12.input.txt";
    let data = await readIteratorAsArray(path);
    console.log(`Answer to Day 12 part 1${"dummy"}`);

    console.log(`Answer to Day 12 part 2 ${"dummy"}`);
}