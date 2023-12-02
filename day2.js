import {readIterator} from "./bot.js";

export function getObject(line)
{
    let gameToTakes = line.split(":");
    let gameId = parseInt(gameToTakes[0].split(" ")[1]);

    let takes = gameToTakes[1].split(";").map(
        x =>
        {
            let dictionary = {};
            x.split(",").map(
                y =>
                {
                    let components = y.trim().split(" ");
                    let key = components[1];
                    let value = parseInt(components[0]);
                    dictionary[key] = value;
                    return {color: key, num: value};
                }
            )
            return dictionary;
        }
    );
    return {gameId, takes};
}

export function isValidGame(line, red, green, blue)
{
    let {gameId, takes} = getObject(line);

    let isValid = true;
    for (const take of takes)
    {
        if (take["red"] && take["red"] > red)
            isValid = false;
        else if (take["blue"] && take["blue"] > blue)
            isValid = false;
        else if (take["green"] && take["green"] > blue)
            isValid = false;
    }

    return {Valid: isValid, Game: gameId};
}

export function sumOfNonValidGames(datas, red, green, blue)
{
    let sum = 0;
    for (const data of datas)
    {
        let result = isValidGame(data, red, green, blue);
        if (result.Valid)
        {
            sum += result.Game;
        }

    }
    return sum;
}


async function day2_part1(path, red, green, blue)
{
    let sum = 0;
    for await (const data of readIterator(path))
    {
        let result = isValidGame(data, red, green, blue);
        if (result.Valid)
        {
            sum += result.Game;
        }
    }
    return sum;
}

console.log("Answer to Day 2 part 1 is: " +
    await day2_part1("day2.input.txt", 12, 13, 14))


export function powerOfGame(data)
{
    let {gameId, takes} = getObject(data);
    let coloursMax = {};
    for (const take of takes)
    {
        for (const [key, value] of Object.entries(take))
        {
            if (!coloursMax[key] || coloursMax[key] < value)
                coloursMax[key] = value;
        }
    }

    console.log(`For this line: ${JSON.stringify(takes)} minimal = ${JSON.stringify(coloursMax)}`);
    let power = 1;
    for (const [key, value] of Object.entries(coloursMax))
    {
        power *= value;
    }
    return {power: power};
}


async function day2_part2(path)
{
    let sum = 0;
    for await (const data of readIterator(path))
    {
        let result = powerOfGame(data);
        sum += result.power;
    }
    return sum;
}

console.log("Answer to Day 2 part 2 is: " +
    await day2_part2("day2.input.txt"))














