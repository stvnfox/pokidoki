import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import productsService from "@/services/productsService";
import filterService from "@/services/filterService";
import { ISet } from "@/interfaces/ISet";

export const useStore = defineStore("main", {
    state: () => ({
        products: [] as IProduct[],
        filters: {
            types: [] as string[],
            sets: [] as ISet[],
        },
        cart: [] as IProduct[],
    }),
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
            const types = await filterService.getTypes()
            .then(result => this.filters.types = result.data);
            const sets = await filterService.getSets()
            .then(result => this.filters.sets = result.data)
        },
        addToCart(value: IProduct) {
            this.cart.push(value);
        },
        removeFromCart(value: number) {
            this.cart.splice(value, 1);
        },
    }
})