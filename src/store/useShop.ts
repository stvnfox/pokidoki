import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import productsService from "@/services/productsService";
import filterService from "@/services/filterService";
import { ISet } from "@/interfaces/ISet";

export interface IType {
    name: string;
    checked: boolean;
}

export const useStore = defineStore("main", {
    state: () => ({
        products: [] as IProduct[],
        filters: {
            types: [] as IType[],
            sets: [] as ISet[],
        },
        cart: [] as IProduct[],
        activeFilter: [] as any[],
    }),
    getters: {
        checkedFilters: (state) => state.filters.types.filter(filter => filter.checked)
    },
    actions: {
        async getProducts(amount: number, query?: string, page?: number) {
            const results = await productsService.getItems({
                q: query ? `name:${query}*` : undefined,
                page: page ? page : undefined,
                pageSize: amount
            })
            .then(result => this.products = result.data);
        },
        async getFilters() {
            this.filters.types = await filterService.getTypes()
            .then(result => {
                return result.data.map((filters: string) => ({
                    name: filters,
                    checked: false
                }))
            });
            const sets = await filterService.getSets()
            .then(result => this.filters.sets = result.data)
        },
        changeCheckedValue(filter: IType) {
            filter.checked = !filter.checked;
        },
        addToCart(value: IProduct) {
            this.cart.push(value);
        },
        removeFromCart(value: number) {
            this.cart.splice(value, 1);
        },
    }
})