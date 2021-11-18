export default new class storeCartService {
    setItem(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    removeItem(key: string, value: any) {
        const storeItem = JSON.parse(key)
        const selectedItem = storeItem.includes(value);

        sessionStorage.removeItem(selectedItem);
    }

    getItem(key: string) {
        const storedCart = sessionStorage.getItem(key);
        
        if(storedCart) {
            return JSON.parse(storedCart)
        }
        
        return [];
    }
}