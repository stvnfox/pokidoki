import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import productsService from "@/services/productsService";
import filterService from "@/services/filterService";
import { ISet } from "@/interfaces/ISet";
import { ref } from "vue";

export interface IType {
    name: string;
    checked: boolean;
}

export interface ISetWChecked extends ISet {
    checked: boolean;
}

export const useStore = defineStore("main", {
    state: () => ({
        products: [] as IProduct[],
        filters: {
            types: [] as IType[],
            sets: [] as ISetWChecked[]
        },
        cart: [] as IProduct[],
        activeFilter: [] as any[],
        query: ref(''),
        page: ref(1),
        total: ref(1)
    }),
    getters: {
        checkedFilters: (state) => {
            const typeFilters = state.filters.types.filter(filter => filter.checked);
            const setFilters = state.filters.sets.filter(filter => filter.checked);
            const filters = [...typeFilters, ...setFilters];

            return filters;
        }
    },
    actions: {
        async getProducts(amount?: number, query?: string, page?: number) {
            const results = await productsService.getItems({
                q: query ? `name:${query}*` : undefined,
                page: page ? page : undefined,
                pageSize: amount ? amount : undefined
            })
            .then(result => {
                this.products = result.data;
                this.page = result.page;
                this.total = result.totalCount;
            });
        },
        async getFilters() {
            this.filters.types = await filterService.getTypes()
            .then(result => {
                return result.data.map((filters: string) => ({
                    name: filters,
                    checked: false
                }))
            });
            this.filters.sets = await filterService.getSets()
            .then(result => {
                return result.data.map((filters: ISet) => ({
                    ...filters,
                    checked: false
                }))
            });
        },
        changePage(page: number, query: string) {
            this.getProducts(12, query, page);
        },
        changeCheckedValue(filter: IType | ISetWChecked) {
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