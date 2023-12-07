import {fileURLToPath} from "url";
import {readIteratorAsArray} from "./bot.js";

export function CalcWinnings(plays, rule)
{
    let compos = CalcCompos(plays, rule);
    compos = compos.sort((a, b) => a.handValue - b.handValue);
    for (const compo of compos)
    {
        console.log(`compos: ${JSON.stringify(compo.play)} - ${compo.handValue}`);
    }
    let winning = compos.map((x, i) => parseInt(x.play.bet) * (i + 1))
        .reduce((partial, x) => partial + x);

    return winning;
}

export const compos = [
    {combination: "Five of a kind", value: 1200},
    {combination: "Four of a kind", value: 1000},
    {combination: "Full house", value: 800},
    {combination: "Three of a kind", value: 600},
    {combination: "Two Pair", value: 400},
    {combination: "One Pair", value: 200},
    {combination: "High Card", value: 0},
]

export const cardValue = {
    "2": 1,
    "3": 10,
    "4": 20,
    "5": 30,
    "6": 40,
    "7": 50,
    "8": 60,
    "9": 70,
    "T": 80,
    "J": 90,
    "Q": 100,
    "K": 110,
    "A": 120,
};

export const alternativeValue = {
    "J": 1,
    "2": 10,
    "3": 20,
    "4": 30,
    "5": 40,
    "6": 50,
    "7": 60,
    "8": 70,
    "9": 80,
    "T": 90,
    "Q": 100,
    "K": 110,
    "A": 120,
};

export function ProcessPlay(play)
{
    let components = play.split(" ");
    return {cards: components[0], bet: parseInt(components[1])};
}

export function CalcCompos(plays, rule)
{
    let compos = [];
    for (let i = 0; i < plays.length; i++)
    {
        compos.push(CalcCompo(plays[i], rule));
    }
    return compos;
}

function addData(play, card, compo, cardValue)
{
    let newCompo = {...compo};
    newCompo.play = {...play};
    newCompo.handValue =
        newCompo.value + valueOfSecondaryCards(play.cards, cardValue);
    return newCompo;
}

export function valueOfSecondaryCards(cards, cardValue)
{
    let value = 0;
    // console.log(`cards: ${JSON.stringify(cards)}`);
    for (let i = 0; i < cards.length; i++)
    {
        const card = cards[i];
        let divider = Math.pow(20, i)
        let addition = cardValue[card] / divider;
        value += addition;
        // console.log(`card: ${cardValue[card]} / ${divider} = ${addition}`);
    }
    return value;
}

export function CalcCompo(play, oldRule)
{
    let processPlay = ProcessPlay(play);
    let {cards, bet} = processPlay;
    let cardCount = {};
    for (let i = 0; i < cards.length; i++)
    {
        let card = cards[i];
        if (!cardCount[card])
        {
            cardCount[card] = 0;
        }
        cardCount[card]++;
    }
    let entries = Object.entries(cardCount).sort(([, a], [, b]) => b - a);
    let entriesKeys = entries.map(x => x[0]);
    let cardVal = oldRule ? cardValue : alternativeValue;
    // console.log(`entries: ${JSON.stringify(entriesKeys)}`);
    for (let i = 0; i < entries.length; i++)
    {
        let jCount = cardCount["J"];
        const [card, count] = entries[i];
        let countWithJ = count;
        if (card !== "J" && jCount > 0)
            countWithJ += jCount;
        if (card === "J" && jCount != 5)
        {
            let nextBest = entries[i + 1]
            let [, count2] = nextBest;
            countWithJ += count2;
        }
        let finalCount = oldRule ? count : countWithJ;
        console.log(`final count: ${finalCount} - ${cards} - from:${count}`);
        switch (finalCount)
        {
            case 5:
                return addData(processPlay, card, compos[0], cardVal);
            case 4:
            {
                return addData(processPlay, card, compos[1], cardVal);
            }
            case 3:
            {
                let nextBest = entries[i + 1]
                let [card2, count2] = nextBest;
                if (count2 === 2)
                    return addData(processPlay, card, compos[2], cardVal);
                else
                    return addData(processPlay, card, compos[3], cardVal);
            }
            case 2:
            {
                let nextBest = entries[i + 1]
                let [card2, count2] = nextBest;
                let bestCard = cardVal[card] > cardVal[card2] ? card : card2;
                if (count2 === 2)
                    return addData(processPlay, bestCard, compos[4], cardVal);
                else
                    return addData(processPlay, card, compos[5], cardVal);
            }
            case 1:
                return addData(processPlay, card, compos[6], cardVal);
        }
    }

    return "error";
}

if (process.argv[1] === fileURLToPath(import.meta.url))
{
    const path = 'day7.input.txt';
    let lines = await readIteratorAsArray(path);
    let answer = CalcWinnings(lines, true);
    console.log(`Answer to Day7 ${answer}`);
    let answer2 = CalcWinnings(lines, false);
    console.log(`Answer to Day7 part 2 ${answer2}`); //253515787, 253537242 
}
