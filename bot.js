import {readFileSync} from 'fs';

let path = 'test.txt';

/**
 * @param path - path to file
 */
function readAll(path) {
    let data = readFileSync(path);
    console.log(data.toString());
}

readAll(path);

import {open} from 'node:fs/promises';

await myFileReader(path);

export async function myFileReader(path) {
    const file = await open(path);
    let i = 0;
    for await (const line of file.readLines()) {
        console.log(`${i++}: ${line}`);
    }
}