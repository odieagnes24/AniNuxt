export default defineNuxtPlugin(() => {
    return {
        provide: {
            search: {
                getHistory() {
                    if (process.client) {
                        return JSON.parse(localStorage.getItem('searchHistory')) || []
                    } else {
                        return []
                    }
                },
                storeNewHistory(anime) {
                    if (process.client) {
                        let storedArray = JSON.parse(localStorage.getItem('searchHistory')) || [];
                        
                        const itemIndex = storedArray.findIndex(item => item.id === anime.id);
                        
                        if (itemIndex > -1) {
                            storedArray[itemIndex] = anime;
                        } else {
                            storedArray.unshift(anime);
                        }
                        
                        if (storedArray.length > 20) {
                            storedArray.pop(); 
                        }
                        
                        localStorage.setItem('searchHistory', JSON.stringify(storedArray));

                        return this.getHistory()
                    }
                },
                clearSearchHistory() {
                    localStorage.removeItem('searchHistory');

                    return this.getHistory()
                },
                removeFromHistory(animeId) {
                    if (process.client) {
                        let storedArray = JSON.parse(localStorage.getItem('searchHistory')) || [];

                        storedArray = storedArray.filter(item => item.id !== animeId);
                        
                        localStorage.setItem('searchHistory', JSON.stringify(storedArray));

                        return this.getHistory()
                    }
                }
            }
        }
    }
})