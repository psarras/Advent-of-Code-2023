export const compos = [
    {combination: "Five of a kind", value: 100},
    {combination: "Four of a kind", value: 100},
    {combination: "Full house", value: 100},
    {combination: "Three of a kind", value: 100},
    {combination: "Two Pair", value: 100},
    {combination: "One Pair", value: 100},
    {combination: "High Card", value: 100},
]

function ProcessPlay(play)
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

export function CalcCompo(play)
{
    let {cards, bet} = ProcessPlay(play);
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
    console.log(entries);
    for (let i = 0; i < entries.length; i++)
    {
        const [card, count] = entries[i];
        switch (count)
        {
            case 5:
                return compos[0];
            case 4:
                return compos[1];
            case 3:
            {
                let nextBest = entries[i + 1]
                let [card2, count2] = nextBest;
                if (count2 === 2)
                    return compos[2];
                else
                    return compos[3];
            }
            case 2:
            {

                let nextBest = entries[i + 1]
                let [card2, count2] = nextBest;
                if (count2 === 2)
                    return compos[4];
                else
                    return compos[5];
            }
            case 1:
                return compos[6];
        }
    }

    return compos[0];
}
