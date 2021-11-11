import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import featuredItemsService from "@/services/featuredItemsService";
import { IProducts } from "@/interfaces/IProducts";

export const useStore = defineStore("main", {
    state: () => ({
        results: {} as IProducts,
        products: [] as IProduct[],
        featuredItems: [] as IProduct[],
        cart: [] as IProduct[],
    }),
    getters: {
    },
    actions: {
        async getFeaturedItems(take: number) {
            const { results } = await featuredItemsService.getFeaturedItems(take);
            this.featuredItems = results
        },
        addToCart(value: IProduct) {
            this.cart.push(value);
        },
        removeFromCart(value: number) {
            this.cart.splice(value);
        },
    }
})