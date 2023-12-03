import {readFileSync} from 'fs';

// const lineReader = require('line-reader');

let path = 'test.txt';

/**
 * @param path - path to file
 */
function readAll(path)
{
    let data = readFileSync(path);
    console.log(data.toString());
}

// readAll(path);

import {open} from 'node:fs/promises';

// await myFileReader(path);

export async function myFileReader(path)
{
    const file = await open(path);
    let i = 0;
    for await (const line of file.readLines())
    {
        console.log(`${i++}: ${line}`);
    }
}

function* makeRangeIterator(start = 0, end = Infinity, step = 1)
{
    let iterationCount = 0;
    for (let i = start; i < end; i += step)
    {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}

export async function* readIterator(path)
{
    const file = await open(path);
    let i = 0;
    for await (const line of file.readLines())
    {
        yield line;
    }
}

export async function readIteratorAsArray(path)
{
    let lines = [];
    const file = await open(path);
    for await (const line of file.readLines())
    {
        lines.push(line.trim())
    }
    return lines;
}
