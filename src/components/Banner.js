import React, { useCallback, useContext, useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getTrendingCoins } from '../config';
import axios from 'axios';
import Spinner from './Spinner';
import { Link, useNavigate } from 'react-router-dom';
const Banner = () => {
    const [trendingList, setTrendingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const fetchTrending = async () => {
        try {
            setLoading(true);
            const response = await axios.get(getTrendingCoins);
            let res = [];
            res = (response.data.coins).map((listItem) => {
                return listItem.item;
            })
            setTrendingList(res);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchTrending();
    }, [])

    const carouselElements = trendingList.map(({ id, large, name, symbol }) => {
        return (<Link to={`/coins/${id}`} className="carousel__item" key={id}>
            <img src={large} alt={name} />
            <p className="carousel__item-name">{name}</p>
            <p className="carousel__item-symbol">{symbol}</p>
        </Link>)
    })

    let sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        autoplay: true,
        touchMove: true,
        pauseOnHover: true,
        slidesToShow: 4,
        useCSS: true,
        useTransform: true,
        autoplaySpeed: 2000,
        centerMode: true,
        centerPadding: "50px"
    }

    return (
        <div className="banner">
            <div className="banner__content">
                <h2>Crypto Tracker</h2>
                <p>Get All The Info Regarding Your Favorite Crypto Currency</p>
            </div>
            <div>
                {loading ? <Spinner /> :
                    <Slider {...sliderSettings}>
                        {carouselElements}
                    </Slider>
                }
            </div>
        </div>
    )
}

export default Banner