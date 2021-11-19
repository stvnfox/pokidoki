import { ISet } from "@/interfaces/ISet";
import axios from "axios";

interface ITypes {
    data: string[];
}

interface ISets {
    data: ISet[];
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
}

export default new class FilterService {
    getTypes(): Promise<ITypes> {
        return axios.get('https://api.pokemontcg.io/v2/types', {
            headers: {
                "X-Api-Key": "816a620f-4498-45ff-b94b-e88fd72c0a1f"
            }
        }).then(results => results.data)
    };
    getSets(): Promise<ISets> {
        return axios.get('https://api.pokemontcg.io/v2/sets', {
            headers: {
                "X-Api-Key": "816a620f-4498-45ff-b94b-e88fd72c0a1f"
            }
        }).then(results => results.data)
    };
}