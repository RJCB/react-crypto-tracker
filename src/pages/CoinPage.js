import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCoinData } from '../config';
import { CurrencyContext } from '../context';
import formatCurrency from '../helpers/currencyFormatter';
const initialState = {
    id: '',
    name: '',
    description: '',
    rank: '',
    currentPrice: '',
    marketCap: '',
    symbol: '',
    image: ''
}
const CoinPage = () => {
    const [coinData, setCoinData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [currency] = useContext(CurrencyContext);
    const { id } = useParams();
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(getCoinData(id));
                const data = response.data;
                setCoinData(prevState => {
                    return {
                        ...prevState,
                        id: data.id,
                        name: data.name,
                        description: data.description.en,
                        rank: data.market_cap_rank,
                        currentPrice: data.market_data.current_price[currency],
                        marketCap: data.market_data.market_cap[currency],
                        symbol: data.symbol,
                        image: data.image
                    }
                })
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        fetchCoinData();
    }, [id, currency])

    const description = !showMore ? coinData.description.slice(0, 250) : coinData.description;

    return (
        <div>
            <img src={coinData.image.large} alt="" />
            <h2>{coinData.name}</h2>
            <p>{description}<button onClick={() => setShowMore(prevState => !prevState)}>{showMore ? "Show less" : "Show more"}</button></p>
            <p><span className="bold">Rank:</span>{coinData.rank}</p>
            <p><span className="bold">Current Price:</span>{formatCurrency(coinData.currentPrice)}</p>
            <p><span className="bold">Market Price:</span>{formatCurrency(coinData.marketCap)}</p>
        </div>
    )
}

export default CoinPage