import {fileURLToPath} from "url";
import {readIteratorAsArray} from "./bot.js";

export function getVariantsRecursive(start, springs, index, numberOfBrokenSprings)
{
    console.log(`Recursion for: ${springs} at:${index} with:${numberOfBrokenSprings}`);
    if (index === numberOfBrokenSprings.length)
        return [start];
    if (springs.length < numberOfBrokenSprings[index])
        return [start];
    let currentSprings = numberOfBrokenSprings[index];
    let variants = [];
    for (let i = 0; i < springs.length; i++)
    {
        let leftOver = springs.length - i;
        if (springs[i] === ".")
            continue;

        // Nothing to do we are done
        if (leftOver < currentSprings)
            break;

        // We need to place the broken springs
        // Scan until we find sequential ? or end of string
        // each position is now known and a working spring
        let firstPart = start + springs.slice(0, i).replaceAll("?", ".");
        console.log(`Checking firstPart: ${firstPart}`);
        let questionmarks = springs.slice(i, i + currentSprings);
        if (Array.from(questionmarks).every(x => x === "?"))
        {
            firstPart += "#".repeat(currentSprings);
            let rest = springs.slice(i + currentSprings, springs.length);
            i += currentSprings - 1; //we need to skip as much as we placed
            console.log(`found solution: ${firstPart},checking rest:${rest}`);
            //TODO: need to only return if we have actually matched all broken springs
            variants.push(...getVariantsRecursive(firstPart, rest, ++index, numberOfBrokenSprings));
        }
    }
    console.log(`variants:${index} - ${JSON.stringify(variants)}`);
    return variants;
}

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

    let index = 0;
    for (let i = 0; i < groups.length; i++)
    {
        let chunk = groups[i];
        let combinations = getVariants(chunk, counts[index]);
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