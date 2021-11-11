import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import productsService from "@/services/productsService";

export const useStore = defineStore("main", {
    state: () => ({
        products: [] as IProduct[],
        cart: [] as IProduct[],
        pageSize: 0,
        more: 9
    }),
    getters: {
        featuredItems(state) {
            const featuredItems = state.products.filter(product => product.image.original !== "").splice(4);
            return featuredItems;
        },
        productsWithImage(state) {
            const filteredProducts = state.products.filter(product => product.image.original !== "");
            return filteredProducts;
        },
    },
    actions: {
        async getProducts(take: number) {
            const { results } = await productsService.getItems(take);
            this.products = results
        },
        addToCart(value: IProduct) {
            this.cart.push(value);
        },
        removeFromCart(value: number) {
            this.cart.splice(value);
        }, 
    }
})