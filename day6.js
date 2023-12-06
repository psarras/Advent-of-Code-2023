import {readIteratorAsArray} from "./bot.js";
import {fileURLToPath} from "url";

export function WinMultiples(races)
{
    let winConditions = [];
    for (let i = 0; i < races.length; i++)
    {
        const [time, distance] = races[i];
        winConditions.push(WinConditions(distance, time));
    }

    let multiples = 1;
    for (let i = 0; i < winConditions.length; i++)
    {
        multiples *= winConditions[i];
    }
    return multiples;
}

export function WinConditions(distance, time)
{
    let betterTimes = 0;
    for (let i = 1; i < time; i++)
    {
        let rate = i;
        let distanceTraveled = (time - i) * i;
        // console.log(`distance traveled: ${distanceTraveled}`)
        if (distanceTraveled > distance)
        {
            betterTimes++;
        }
    }

    return betterTimes;
}

if (process.argv[1] === fileURLToPath(import.meta.url))
{
    let races = [[41, 214], [96, 1789], [88, 1127], [94, 1055]];
    let multiples = WinMultiples(races);
    console.log(`Answer to Day6 ${multiples}`);

    let winConditions = WinConditions(214178911271055, 41968894);
    console.log(`Answer to Day6 ${winConditions}`);
}
