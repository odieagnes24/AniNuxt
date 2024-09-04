export default defineNuxtPlugin(() => {
    return {
        provide: {
            watchHistory: {
                getHistory() {
                    if (process.client) {
                        return JSON.parse(localStorage.getItem('watchHistory')) || []
                    } else {
                        return []
                    }
                },
                storeNewHistory(anime) {
                    if (process.client) {
                        let storedArray = JSON.parse(localStorage.getItem('watchHistory')) || [];
                        
                        const itemIndex = storedArray.findIndex(item => item.id === anime.id)
                        
                        if (itemIndex > -1) {
                            storedArray[itemIndex] = anime
                        } else {
                            storedArray.unshift(anime)
                        }
                        
                        if (storedArray.length > 20) {
                            storedArray.pop(); 
                        }
                        
                        localStorage.setItem('watchHistory', JSON.stringify(storedArray))

                        return this.getHistory()
                    }
                },
                clearWatchHistory() {
                    localStorage.removeItem('watchHistory');

                    return this.getHistory()
                },
                removeFromHistory(animeId) {
                    if (process.client) {
                        let storedArray = JSON.parse(localStorage.getItem('watchHistory')) || [];

                        storedArray = storedArray.filter(item => item.id !== animeId)
                        
                        localStorage.setItem('watchHistory', JSON.stringify(storedArray))

                        return this.getHistory()
                    }
                }
            }
        }
    }
})