export interface IProduct {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: string[];
    evolvesTo: string[];
    flavorText: string;
    rules: string[];
    attacks: IAttack[];
    weaknesses: ITypeValue[];
    resistances: ITypeValue[];
    retreatCost: string[];
    convertedRetreatCost: number;
    level: string;
    set: {
        id: string;
        name: string;
        series: string;
        printedTotal: number;
        total: number;
        legalities: {
            unlimited: string;
            expanded: string;
        };
        ptcgoCode: string;
        releaseDate: string;
        updatedAt: string;
        images: {
            symbol: string;
            logo: string;
        };
    };
    number: string;
    artist: string;
    rarity: string;
    nationalPokedexNumbers: number[];
    legalities: {
        unlimited: string;
        expanded: string;
    };
    images: {
        small: string;
        large: string;
    };
    tcgplayer: {
        url: string;
        updatedAt: string;
        prices: {
            holofoil: {
                directLow: number;
                high: number;
                low: number;
                market: number;
                mid: number;
            },
            reverseHolofoil: {
                directLow: number;
                high: number;
                low: number;
                market: number;
                mid: number;
            }
        };
    };
    cardmarket: {
        url: string;
        updatedAt: string;
        prices: {
            averageSellPrice: number;
            avg1: number;
            avg30: number;
            avg7: number;
            germanProLow: number;
            lowPrice: number;
            lowPriceExPlus: number;
            reverseHoloAvg1: number;
            reverseHoloAvg30: number;
            reverseHoloAvg7: number;
            reverseHoloLow: number;
            reverseHoloSell: number;
            reverseHoloTrend: number;
            suggestedPrice: number;
            trendPrice: number;
        }
    }
}

interface IAttack {
    name: string;
    cost: string[];
    convertedEnergyCost: number;
    damage: string;
    text: string;
}

interface ITypeValue {
    type: string;
    value: string;
}