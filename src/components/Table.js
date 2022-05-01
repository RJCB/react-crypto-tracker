import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner'
import { getCoinsList } from '../config';
import { CurrencyContext } from '../context';
import formatCurrency from '../helpers/currencyFormatter';
import Error from './Error';

const Table = () => {
    const [coinsList, setCoinsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currency] = useContext(CurrencyContext);
    const history = useNavigate();
    const [input, setInput] = useState('');
    const [inputBasedList, setInputBasedList] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchCoinsList = async () => {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(getCoinsList(currency));
                setCoinsList(response.data);
            } catch (error) {
                setError(true);
                console.log(error);
            }
            setLoading(false);
        }
        fetchCoinsList();
    }, [currency]);

    const handleCoinClick = (id) => {
        history(`/coins/${id}`);
    }

    const handleInputChange = (e) => {
        const inputBasedList = coinsList.filter(coin => (coin.symbol).includes(e));
        setInput(e);
        setInputBasedList(inputBasedList);
    }
    const test = (input) => {
        const rowElements = (!input ? coinsList : inputBasedList).map(({ id, image, name, market_cap, symbol, current_price, price_change_percentage_24h, price_change_24h
        }) => {
            return (<tr key={id} onClick={() => handleCoinClick(id)}>
                <th scope="row">
                    <img src={image} alt="name" />
                    <div>
                        <span className="symbol">{symbol}</span>
                        <span>{name}</span>
                    </div>
                </th>
                <td>{formatCurrency(current_price)}</td>
                <td>{formatCurrency(price_change_24h)}<span className={`price__percentage ${price_change_percentage_24h < 0 ? "negative" : "positive"}`}>{price_change_percentage_24h}</span></td>
                <td>{formatCurrency(market_cap)}</td>
            </tr>)
        })
        return rowElements;
    };
    return (
        <div className="market__data">
            <h3>Cryptocurrency Prices by Market Cap</h3>
            <input className="market__data-input" type="text" value={input} onChange={(e) => handleInputChange(e.target.value)} placeholder="Search for a coin from list below" />
            <table className="market__data-table">
                <thead>
                    <tr>
                        <th scope="col">Coin</th>
                        <th scope="col">Price</th>
                        <th scope="col">24h Change</th>
                        <th scope="col">Market Cap</th>
                    </tr>
                </thead>
                {!loading && <tbody>{test(input)}</tbody>}
            </table>
            {loading && <Spinner />}
            {error && <Error />}
        </div>
    )
}

export default Table