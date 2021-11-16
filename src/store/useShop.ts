import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import productsService from "@/services/productsService";
import filterService from "@/services/filterService";
import { ISet, ISetWChecked } from "@/interfaces/ISet";
import { ref } from "vue";

export interface IType {
    name: string;
    checked: boolean;
}

const searchParamsMapper = (searchQuery: string, typeFilter: IType[], setFilter: ISetWChecked[]): string => {
    const searchParamsEntries :string[] = [];

    if (searchQuery) {
        searchParamsEntries.push(`name:${searchQuery}`);
    }
    if (typeFilter.length > 0) {
        searchParamsEntries.push(`types:${typeFilter[0].name}`);
    }
    if (setFilter.length > 0) {
        searchParamsEntries.push(`set.id:${setFilter[0].id}`);
    }

    return searchParamsEntries.join(' ');
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
        pageSize: 12,
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
        async getProducts(page?: number) {
            const results = await productsService.getItems({
                q: searchParamsMapper(
                    this.query,
                    this.filters.types.filter(filter => filter.checked),
                    this.filters.sets.filter(filter => filter.checked)
                ),
                page: page ? page : undefined,
                pageSize: this.pageSize
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
        changePage() {
            this.getProducts(this.page);
        },
        changeCheckedTypeValue(filter: IType) {
            // TODO: Only change 1 check value
            filter.checked = !filter.checked;
            
            if (filter.checked) {
                this.getProducts()
            } else {
                this.getProducts(this.page)
            }
        },
        changeCheckedSetValue(filter: ISetWChecked) {
            filter.checked = !filter.checked;
            
            if (filter.checked) {
                this.getProducts()
            } else {
                this.getProducts(this.page)
            }
        },
        addToCart(value: IProduct) {
            this.cart.push(value);
        },
        removeFromCart(value: number) {
            this.cart.splice(value, 1);
        },
    }
})