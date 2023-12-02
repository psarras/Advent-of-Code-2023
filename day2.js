import {readIterator} from "./bot.js";

export function isValidGame(line, red, green, blue)
{
    let gameToTakes = line.split(":");
    let gameId = parseInt(gameToTakes[0].split(" ")[1]);

    let takes = gameToTakes[1].split(";").map(
        x =>
        {
            return x.split(",").map(
                y =>
                {
                    let components = y.trim().split(" ");
                    return {color: components[1], num: parseInt(components[0])};
                }
            )
        }
    );

    let isValid = true;
    for (const take of takes)
    {
        for (const colorSet of take)
        {
            if (colorSet.color === "red" && colorSet.num > red)
                isValid = false;
            if (colorSet.color === "blue" && colorSet.num > blue)
                isValid = false;
            if (colorSet.color === "green" && colorSet.num > green)
                isValid = false;
        }
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


















