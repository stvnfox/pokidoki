import { IProducts } from "@/interfaces/IProducts";
import axios from "axios";

export default new class FeaturedItemsService {
    getFeaturedItems(limit: number): Promise<IProducts> {
        return axios.get('https://the-sneaker-database.p.rapidapi.com/sneakers', {
            params: {
                limit
            },
            headers: {
                'x-rapidapi-host': 'the-sneaker-database.p.rapidapi.com',
                'x-rapidapi-key': 'c4fa14a479msh12d7fa74e19af35p13fe76jsnca3fa07ef864'
            }
        }).then(results => results.data)
    }
}