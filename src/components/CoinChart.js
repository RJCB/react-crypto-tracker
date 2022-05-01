import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line
import Chart from 'chart.js/auto';//required--don't remove
import { getChartData } from '../config';
import { CurrencyContext } from '../context';
import Spinner from './Spinner';
import Error from './Error';
// import formatUnixToRealTime from '../helpers/formatTime';

const CoinChart = ({ coinId }) => {
    const [loading, setLoading] = useState(false);
    const [currency] = useContext(CurrencyContext);
    const [chartData, setChartData] = useState([]);
    const [period, setPeriod] = useState(1);
    const [error, setError] = useState(false);
    const chartDays = [
        {
            label: "24 Hours",
            value: 1
        }, {
            label: "30 Days",
            value: 30
        }, {
            label: "3 Months",
            value: 90
        }, {
            label: "1 Year",
            value: 365
        }
    ]

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setError(false);
                setLoading(true);
                const response = await axios.get(getChartData(coinId, currency, period));
                setChartData(response.data.prices);
            } catch (error) {
                setError(true);
                console.log(error);
            }
            setLoading(false);
        }
        fetchChartData();
    }, [coinId, currency, period]);

    const periodButtons = chartDays.map((day, index) => {
        return <button disabled={day.value === period} value={day.value} key={index} onClick={(e) => setPeriod(parseInt(e.target.value))}>{day.label}</button>
    })

    return (
        <>
            {loading ? <Spinner /> :
                <div className="chart__wrapper">
                    <Line
                        data={{
                            labels: chartData.map((data) => {
                                let date = new Date(data[0]);
                                let time =
                                    date.getHours() > 12
                                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                        : `${date.getHours()}:${date.getMinutes()} AM`;
                                return period === 1 ? time : date.toLocaleDateString();
                            }),

                            datasets: [
                                {
                                    data: chartData.map((data) => data[1]),
                                    label: `Price ( Past ${period} Days ) in ${currency}`,
                                    borderColor: "#e7c71a",
                                },
                            ],
                        }}
                        options={{
                            elements: {
                                point: {
                                    radius: 2,
                                    borderDash: 3
                                },
                            },
                        }}
                    />
                    <div className="chart__buttons-wrapper">
                        {periodButtons}
                    </div>
                </div>
            }

            {error && <Error />}
        </>
    )
}

export default CoinChart