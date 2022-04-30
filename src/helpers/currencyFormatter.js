import NumberFormat from 'react-number-format';

const formatCurrency = (amount) => {
    return <NumberFormat value={`${amount}`} displayType={'text'} thousandSeparator={true} thousandsGroupStyle prefix={'$'} decimalScale={2} />
}

export default formatCurrency;