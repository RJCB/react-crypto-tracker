export const getTrendingCoins = `https://api.coingecko.com/api/v3/search/trending`;

export const getCoinsList = (currency) => {
    return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
}

export const getCoinData = (coinId) => {
    return `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&market_data=true`
}

export const getChartData = (coinId, currency, days) => {
    return `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`;
}