import { defineStore } from "pinia";

export const useNav = defineStore("nav", {
    state: () => ({
        menuItems: [
            {
                name: "Home",
                url: "/"
            }
        ],
    })
})