import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import productsService from "@/services/productsService";

export const useStore = defineStore("main", {
    state: () => ({
        products: [] as IProduct[],
        cart: [] as IProduct[],
    }),
    actions: {
        async getProducts(amount: number, query?: string, page?: number) {
            const { data } = await productsService.getItems({
                q: query ? `name:${query}*` : undefined,
                page: page ? page : undefined,
                pageSize: amount
            });
            this.products = data;
        },
        addToCart(value: IProduct) {
            this.cart.push(value);
        },
        removeFromCart(value: number) {
            this.cart.splice(value, 1);
        },
    }
})