export interface IProduct {
    id: string;
    sku: string;
    brand: string;
    name: string;
    colorway: string;
    gender: string;
    silhouette: string;
    retailPrice: number;
    releaseDate: string;
    releaseYear: number;
    links: {
        stockX: string;
        goat: string;
        fightClub: string;
    };
    image: {
        original: string;
        small: string;
        thumbnail: string;
    };
    story: string;
}