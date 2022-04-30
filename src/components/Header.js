import React, { useContext } from 'react';
import { CurrencyContext } from '../context';

const Header = () => {
    const [currency, setCurrency] = useContext(CurrencyContext);
    const handleChange = (e) => {
        console.log(e);
        setCurrency(e);
    }
    return (
        <div className="header">
            <h1 className="header__title">Crypto Tracker</h1>
            <select value={currency} onChange={(e) => handleChange(e.target.value)}>
                <option value="cad">CAD</option>
                <option value="usd">USD</option>
            </select>
        </div>
    )
}

export default Header