import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencyContext } from '../context';

const Header = () => {
    const [currency, setCurrency] = useContext(CurrencyContext);
    const history = useNavigate();
    const handleChange = (e) => {
        setCurrency(e);
    }
    const handleLogoClick = () => {
        history('/');
    }
    return (
        <div className="header">
            <h1 className="header__title" onClick={handleLogoClick}>Crypto Tracker</h1>
            <select value={currency} onChange={(e) => handleChange(e.target.value)}>
                <option value="cad">CAD</option>
                <option value="usd">USD</option>
            </select>
        </div>
    )
}

export default Header