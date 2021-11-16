import { IProduct } from "@/interfaces/IProduct";
import axios from "axios";

interface IResult {
    data: IProduct[];
    page: number;
    pageSize: number;
    count: number;
    totalCount: number;
}
interface IParams {
    q?: string,
    page?: number,
    pageSize?: number
}

export default new class ProductsService {
    getItems(params: IParams): Promise<IResult> {
        return axios.get('https://api.pokemontcg.io/v2/cards/', {
            params: params,
            headers: {
                "X-Api-Key": "816a620f-4498-45ff-b94b-e88fd72c0a1f"
            }
        }).then(results => results.data)
    }
}