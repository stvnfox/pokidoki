<template>
    <ul class="pagination">
        <li :class="{'disabled': currentPage === 1}">
            <button :disabled="currentPage === 1" @click="goToFirstPage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-4.5 -3 24 24" width="16" fill="currentColor"><path d="M8.828 7.071l4.95 4.95a1 1 0 1 1-1.414 1.414L6.707 7.778a1 1 0 0 1 0-1.414L12.364.707a1 1 0 0 1 1.414 1.414l-4.95 4.95zm-6 0l4.95 4.95a1 1 0 1 1-1.414 1.414L.707 7.778a1 1 0 0 1 0-1.414L6.364.707a1 1 0 1 1 1.414 1.414l-4.95 4.95z"></path></svg>
            </button>
        </li>
        <li :class="{'disabled': currentPage === 1}">
            <button :disabled="currentPage === 1" @click="prevPage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -3 24 24" width="16" fill="currentColor">
                    <path d="M2.757 7l4.95 4.95a1 1 0 1 1-1.414 1.414L.636 7.707a1 1 0 0 1 0-1.414L6.293.636A1 1 0 0 1 7.707 2.05L2.757 7z"></path>
                </svg>
            </button>
        </li>
        <li
            v-for="(item, index) in pages"
            :key="index"
            :class="{'active': item.name === currentPage}"
        >
            <button type="button" @click="goToPage(item.name)">
                {{ item.name }}
            </button>
        </li>
        <li :class="{'disabled': currentPage === lastPage}">
            <button :disabled="currentPage === lastPage" @click="nextPage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-8 -3 24 24" width="16" fill="currentColor">
                    <path d="M5.314 7.071l-4.95-4.95A1 1 0 0 1 1.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"></path>
                </svg>
            </button>
        </li>
        <li :class="{'disabled': currentPage === lastPage}">
            <button :disabled="currentPage === lastPage" @click="goToLastPage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -3 24 24" width="16" fill="currentColor">
                    <path d="M11.314 7.071l-4.95-4.95A1 1 0 0 1 7.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95zm-6 0l-4.95-4.95A1 1 0 1 1 1.778.707l5.657 5.657a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 0 1-1.414-1.414l4.95-4.95z"></path>
                </svg>
            </button>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from 'vue';
import { useStore } from '@/store/useShop';
import debounce from 'lodash/debounce';

export default defineComponent({
    props: {
        maxButtons: {
            type: Number,
            required: false,
            default: 5
        },
        totalPages: {
            type: Number,
            required: true
        },
        perPage: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
    },
    setup(props) {
        const store = useStore();
        const lastPage = Math.ceil(store.total / store.pageSize);

        const pages = computed(() => {
            const buttons: any[] = [];
            
            if(props.totalPages) {
                for (let index = 0; index < props.totalPages; index++) {
                    buttons.push({
                        name: index + 1
                    })
                }
                
                const first = 1;
                const last = Math.ceil(props.totalPages);

                if (store.currentPage === first || store.currentPage === 2) {
                    return buttons.slice(0, 5);
                } else if (store.currentPage === last - 1) {
                    return buttons.slice(store.currentPage - 4, last)
                } else if (store.currentPage === last) {
                    return buttons.slice(store.currentPage - 5, last)
                }

                return buttons.slice(store.currentPage - 3, store.currentPage + 2)
            }
            return buttons;
        })

        const goToFirstPage = () => {
            store.goToFirstPage();
        }

        const prevPage = () => {
            store.prevPage();
        }

        const nextPage = () => {
            store.nextPage();
        }

        const goToLastPage = () => {
            store.goToLastPage();
        }

        const goToPage = (value: number) => {
            store.goToPage(value);
        }

        watch(
            () => store.currentPage,
            debounce(() => {
                store.changePage()
            }, 300)
        )

        return {
            goToFirstPage,
            prevPage,
            nextPage,
            goToLastPage,
            goToPage,
            lastPage,
            pages,
            store
        }
    },
})
</script>
