import {fileURLToPath} from "url";
import {readIteratorAsArray} from "./bot.js";

export function CalcWinnings(plays)
{
    // let componentPlays = plays.map(x => ProcessPlay(x));
    let compos = CalcCompos(plays);
    // let maxRanks = compos.length;
    // for (let i = 0; i < compos.length; i++)
    // {
    //     const compo = compos[i];
    // compo.winning = ProcessValue(compo, i, maxRanks);
    // }
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

export function ProcessPlay(play)
{
    let components = play.split(" ");
    return {cards: components[0], bet: parseInt(components[1])};
}

export function CalcCompos(plays)
{
    let compos = [];
    for (let i = 0; i < plays.length; i++)
    {
        compos.push(CalcCompo(plays[i]));
    }
    return compos;
}

function addData(play, card, others, compo)
{
    let newCompo = {...compo};
    newCompo.play = {...play};
    newCompo.others = others;
    newCompo.othersValue = valueOfSecondaryCards(others);
    newCompo.highCardValue = cardValue[card];
    newCompo.handValue =
        // cardValue[card] + // * newCompo.value +
        newCompo.value + valueOfSecondaryCards(play.cards);
    return newCompo;
}

export function valueOfSecondaryCards(cards)
{
    let value = 0;
    console.log(`cards: ${JSON.stringify(cards)}`);
    for (let i = 0; i < cards.length; i++)
    {
        const card = cards[i];
        let divider = Math.pow(20, i)
        let addition = cardValue[card] / divider;
        value += addition;
        console.log(`card: ${cardValue[card]} / ${divider} = ${addition}`);
    }
    return value;
}

export function CalcCompo(play)
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
    // console.log(`entries: ${JSON.stringify(entriesKeys)}`);
    for (let i = 0; i < entries.length; i++)
    {
        const [card, count] = entries[i];
        let others = entries
            .filter(x => x[0] !== card)
            .map(x => x[0]);
        switch (count)
        {
            case 5:
                return addData(processPlay, card, entriesKeys, compos[0]);
            case 4:
            {
                return addData(processPlay, card, entriesKeys, compos[1]);
            }
            case 3:
            {
                let nextBest = entries[i + 1]
                let [card2, count2] = nextBest;
                if (count2 === 2)
                    return addData(processPlay, card, entriesKeys, compos[2]);
                else
                    return addData(processPlay, card, entriesKeys, compos[3]);
            }
            case 2:
            {
                let nextBest = entries[i + 1]
                let [card2, count2] = nextBest;
                let bestCard = cardValue[card] > cardValue[card2] ? card : card2;
                if (count2 === 2)
                    return addData(processPlay, bestCard, entriesKeys, compos[4]);
                else
                    return addData(processPlay, card, entriesKeys, compos[5]);
            }
            case 1:
                return addData(processPlay, card, entriesKeys, compos[6]);
        }
    }

    return compos[0];
}

if (process.argv[1] === fileURLToPath(import.meta.url))
{
    const path = 'day7.input.txt';
    let lines = await readIteratorAsArray(path);
    let answer = CalcWinnings(lines);
    console.log(`Answer to Day7 ${answer}`);
}
