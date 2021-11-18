import { defineStore } from "pinia";
import { IProduct } from "@/interfaces/IProduct";
import productsService from "@/services/productsService";
import filterService from "@/services/filterService";
import storeCartService from "@/services/storeCartService";
import { ISet, ISetWChecked } from "@/interfaces/ISet";
import { ref } from "vue";

export interface IType {
    name: string;
    checked: boolean;
}

const searchParamsMapper = (searchQuery: string, typeFilter: IType[], setFilter: ISetWChecked[]): string => {
    const searchParamsEntries :string[] = [];

    if (searchQuery) {
        searchParamsEntries.push(`name:${searchQuery}*`);
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
        loading: ref(false),
        query: ref(''),
        currentPage: ref(1),
        pageSize: ref(12),
        pageSizeValues: ['12', '24', '48', '96'],
        total: ref(1),
        orderBy: ref(''),
        productIndex: ref(0),
        orderByValues: [
            {
                displayValue: 'Alphabetical (A-Z)',
                realValue: 'name',
            },
            {
                displayValue: 'Alphabetical (Z-A)',
                realValue: '-name',
            },
            {
                displayValue: 'Price (ascending)',
                realValue: 'cardmarket.prices.trendPrice',
            },
            {
                displayValue: 'Price (descending)',
                realValue: '-cardmarket.prices.trendPrice',
            },
            {
                displayValue: 'Date (ascending)',
                realValue: 'set.releaseDate',
            },
            {
                displayValue: 'Date (descending)',
                realValue: '-set.releaseDate',
            },
        ]
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
            this.loading = true;

            return productsService.getItems({
                q: searchParamsMapper(
                    this.query,
                    this.filters.types.filter(filter => filter.checked),
                    this.filters.sets.filter(filter => filter.checked)
                ),
                page: page ? page : undefined,
                pageSize: this.pageSize,
                orderBy: this.orderBy
            })
            .then(result => {
                this.products = result.data;
                this.currentPage = result.page;
                this.total = result.totalCount;
                return result.data
            })
            .finally(() => {
                this.loading = false;
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
            this.getProducts(this.currentPage);
        },
        changeCheckedTypeValue(filter: IType) {
            this.filters.types = this.filters.types.map(type => {
                if (type.name === filter.name) {
                    return { ...type, checked: !type.checked }
                } else {
                    return { ...type, checked: false }
                }
            })
            
            this.getProducts(1)
        },
        changeCheckedSetValue(filter: ISetWChecked) {
            this.filters.sets = this.filters.sets.map(set => {
                if (set.id === filter.id) {
                    return { ...set, checked: !set.checked }
                } else {
                    return { ...set, checked: false }
                }
            })
            
            this.getProducts(1)
        },
        addToCart(key: string, value: IProduct) {
            this.cart.push(value);
            storeCartService.setItem(key, this.cart);
        },
        removeFromCart(key: string, value: number) {
            this.cart.splice(value, 1);
            storeCartService.setItem(key, this.cart);
        },
        setSessionItem(key: string, value: any) {
            storeCartService.setItem(key, value);
        },
        getSessionItem(key: string) {
            this.cart = storeCartService.getItem(key);
        }
    }
})