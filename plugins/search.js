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

                storeNewHistory(animeId, details) {
                    if (process.client) {
                        let storedArray = JSON.parse(localStorage.getItem('searchHistory')) || [];
                        
                        const itemIndex = storedArray.findIndex(item => item.key === animeId);
                        
                        if (itemIndex > -1) {
                            storedArray[itemIndex].value = details;
                        } else {
                            storedArray.unshift({ key: animeId, value: details });
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

                        storedArray = storedArray.filter(item => item.key !== animeId);
                        
                        localStorage.setItem('searchHistory', JSON.stringify(storedArray));

                        return this.getHistory()
                    }
                }
            }
        }
    }
})