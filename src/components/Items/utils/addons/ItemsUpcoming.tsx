import React, { useState, useEffect } from 'react'; import '../../Items.css';
import Item from '../../Item'; import axios from 'axios'; import './Carrousel.css';
import UseWindowDimensions from '../config/windowDimensions';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FaCircle } from 'react-icons/fa'
import { act } from 'react-dom/test-utils';

const ItemsUpcoming = () => {
    const { width, height } = UseWindowDimensions();
    let [_rafflesObj, setRafflesObj] = useState([{
        "id": 0,
        "type": "Raffle",
        "img": "https://i.imgur.com/E3y9m83.png",
        "tittle": "Loading Data...",
        "reference": "Fetching Data",
        "payment_token": "Coin",
        "address_token": " ",
        "price_card": "0",
        "limit_tickets_card": "333",
        "limit_tickets_user": "333",
        "status_card": "enabled",
        "collection_verified": "true",
        "web_url": "https://twitter.com/rotten_ville",
        "discord_url": "https://twitter.com/rotten_ville",
        "twitter_url": "https://twitter.com/rotten_ville",
        "magic_eden_url": "https://twitter.com/rotten_ville",
        "date": "{\"start\":\"31 JUL 21:00:00\",\"end\":\"31 JUL 21:00:00\"}",
        "winner": "{\"result\":[{\"wallet\":\"None\"}],\"amount\":1,\"data_users_raffle\":{\"total_users\":0,\"total_tickets\":0,\"total_rot\":0}}"
    }]);

    let [transformNumber, setTransformNumber] = useState(0), [sizeItems, setSizeItems] = useState(0),
        [itemsProgressBar, setItemsProgressBar] = useState(0), [window_items, setWindowItems] = useState(0),
        [actualItemProgressBar, setActualItemProgressBar] = useState(1), [loadWallet, setLoadWallet] = useState(1),
        [items_screen, setItems_screen] = useState("items-screen");

    const slide = () => ({
        transform: `translateX(${transformNumber}%)`
    })

    const setVariablesProgressBar = () => {

        switch (true) {
            case (width <= 770):
                setWindowItems(1);
                setItems_screen("sitems-screen-1");
                break;
            case (width <= 1100 && width > 770):
                setWindowItems(2);
                if (sizeItems === 1) {
                    setItems_screen("sitems-screen-1");
                    setWindowItems(1);
                } else  {
                    setItems_screen("sitems-screen-2");
                }
                break;
            case (width <= 1450 && width > 1100):
                setWindowItems(3);
                if (sizeItems === 2) {
                    setItems_screen("sitems-screen-2");
                    setWindowItems(2);
                } else if (sizeItems === 1) {
                    setItems_screen("sitems-screen-1");
                    setWindowItems(1);
                } else {
                    setItems_screen("sitems-screen-3");
                }
                break;
            case (width <= 1850 && width > 1450):
                setWindowItems(4);
                if (sizeItems === 3) {
                    setItems_screen("sitems-screen-3");
                    setWindowItems(3);
                } else if (sizeItems === 2) {
                    setItems_screen("sitems-screen-2");
                    setWindowItems(2);
                } else if (sizeItems === 1) {
                    setItems_screen("sitems-screen-1");
                    setWindowItems(1);
                } else {
                    setItems_screen("items-screen-4");
                }
                break;
            default:
                setWindowItems(4);
                setItems_screen("items-screen-4");
                if (sizeItems < 4 && sizeItems > 2) {
                    setItems_screen("sitems-screen-3");
                    setWindowItems(3);
                } else if (sizeItems < 3 && sizeItems > 1) {
                    setItems_screen("sitems-screen-2");
                    setWindowItems(2);
                } else if (sizeItems < 2) {
                    setItems_screen("sitems-screen-1");
                    setWindowItems(1);
                }
                break;
        }
        console.log(sizeItems)
        setItemsProgressBar(Math.ceil(sizeItems / window_items));
    }

    const validateSlide = () => {

        if (actualItemProgressBar > itemsProgressBar) {
            setActualItemProgressBar(1);
            setTransformNumber(0);
        }

        if (actualItemProgressBar <= 0) {
            setActualItemProgressBar(itemsProgressBar);
            setTransformNumber((itemsProgressBar - 1) * -100);
        }

    }

    const progressBar = (actual_items: any) => {
        var rows = [];
        for (let index = 0; index < itemsProgressBar; index++) {
            rows.push(<div className={"mr-2 cursor-pointer hover:text-[#6414FF] transition ease-in-out delay-150" +
                (actual_items - 1 === index ? "mr-2 text-[#6414FF]" : "text-black")
            } key={index} > <FaCircle /></div>);
        }
        return <div className='mt-4 flex text-[12px] text-[#2c1755]' >{rows}</div>
    }


    const rafflesFunction = async () => {
        try {
            let data = await axios.get("https://api.rottenville.io/items/search/type/Upcoming")
                .then(response => {
                    if (response.data.length === 0) {
                        response.data = [{
                            "id": 0,
                            "type": "Raffle",
                            "img": "https://i.imgur.com/E3y9m83.png",
                            "tittle": "Not Data Found",
                            "reference": "Not Data Found",
                            "payment_token": "Coin",
                            "address_token": "RoTksthszZDGGZq4uZZZxVmV7xsaz4X8kBESMyeLZkE",
                            "price_card": "0",
                            "limit_tickets_card": "333",
                            "limit_tickets_user": "333",
                            "status_card": "enabled",
                            "collection_verified": "true",
                            "web_url": "https://twitter.com/rotten_ville",
                            "discord_url": "https://twitter.com/rotten_ville",
                            "twitter_url": "https://twitter.com/rotten_ville",
                            "magic_eden_url": "https://twitter.com/rotten_ville",
                            "date": "{\"start\":\"31 JUL 21:00:00\",\"end\":\"31 JUL 21:00:00\"}",
                            "winner": "{\"result\":[{\"wallet\":\"None\"}],\"amount\":1,\"data_users_raffle\":{\"total_users\":0,\"total_tickets\":0,\"total_rot\":0}}"
                        }]
                    }
                    setSizeItems(response.data.length);
                    setRafflesObj(response.data)
                })
        } catch (error) {
            console.log(error);
        }
    }

    const { publicKey, sendTransaction } = useWallet();

    const checkingWallet = () => {
        if (publicKey != null) {
            if (loadWallet === 0) {
                window.location.reload();
                setLoadWallet(1);
            }
        } else {
            setLoadWallet(0);
        }
    }


    useEffect(() => {
        const interval = setInterval(() => {
            checkingWallet();
        }, 1000);

        return () => clearInterval(interval);
    }, [publicKey, loadWallet])

    useEffect(() => {
        setVariablesProgressBar();
        validateSlide();
    })

    useEffect(() => {
        const interval = setInterval(() => {
            rafflesFunction();
        }, 2000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            validateSlide();
            setTransformNumber(transformNumber - 100);
            setActualItemProgressBar(actualItemProgressBar + 1)
        }, 9000);

        return () => clearInterval(interval);
    }, [transformNumber])

    return (
        <div className='grid place-content-center'>
            <div className='row mb-4'>
                <div className='header grid place-content-center'>
                    <h3 className='text-[2.3rem] md:text-[2.5rem] text-center justify-center text-[#FFBF3B] akira-font-apply'>Upcoming Raffles</h3>
                </div>
            </div>

            <div className='container'>
                <button className='handle left-handle' onClick={() => { setTransformNumber(transformNumber + 100); setActualItemProgressBar(actualItemProgressBar - 1) }}>
                    <div className='text relative left-4'>&#8249;</div>
                </button>
                <div style={slide()} className={`${items_screen} items-screen-${Object.keys(_rafflesObj).length} slider grid ${(Object.keys(_rafflesObj).length === 1) ? 'place-content-center' : 'place-content-left'}`}>
                    {
                        Object.keys(_rafflesObj).map(function (key: any) {
                            let data = _rafflesObj[key];
                            return <div className='item-content grid place-content-center'><Item key={key} id={String(data.id)} type={data.type} img={data.img} tittle={data.tittle} reference={data.reference} payment_token={data.payment_token} address_token={data.address_token} price_card={parseInt(data.price_card)} limit_tickets_card={parseInt(data.limit_tickets_card)} limit_tickets_user={parseInt(data.limit_tickets_user)} status_card={data.status_card} collection_verified={Boolean(data.collection_verified)} web_url={data.web_url} discord_url={data.discord_url} twitter_url={data.twitter_url} magic_eden_url={data.magic_eden_url} date={JSON.parse(data.date)} winner={JSON.parse(data.winner)} /></div>
                        })
                    }
                </div>
                <button className='handle right-handle' onClick={() => { setTransformNumber(transformNumber - 100); setActualItemProgressBar(actualItemProgressBar + 1) }}>
                    <div className='text relative right-4'>
                        &#8250;
                    </div>
                </button>
            </div>
            <div className='grid mb-9 mt-[-10px] place-content-center progress-bar'>
                {
                    progressBar(actualItemProgressBar)
                }
            </div>
        </div>
    )
}

export default ItemsUpcoming
