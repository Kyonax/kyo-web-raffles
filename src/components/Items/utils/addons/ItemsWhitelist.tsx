import React, { useState, useEffect } from 'react'; import '../../Items.css';
import Item from '../../Item'; import axios from 'axios';

interface ItemsWhitelistProps {

}

const ItemsWhitelist: React.FC<ItemsWhitelistProps> = ({ }) => {

    let [_rafflesObj, setRafflesObj] = useState([{
        "id": 0,
        "type": "Raffle",
        "img": "https://i.imgur.com/E3y9m83.png",
        "tittle": "Loading Data...",
        "reference": "Fetching Data",
        "payment_token": "Coin",
        "address_token": "Network congestion may affect loading times.",
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

    const rafflesFunction = async () => {
        try {
            let data = await axios.get("https://api.rottenville.io/items/search/type/Whitelist")
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
                    setRafflesObj(response.data.reverse())
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            rafflesFunction();
        }, 2000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className='grid place-items-center'>
            <div className='w-[100%] flex flex-wrap justify-center'>{
                Object.keys(_rafflesObj).map(function (key: any) {
                    let data = _rafflesObj[key];
                    return <Item key={key} id={String(data.id)} type={data.type} img={data.img} tittle={data.tittle} reference={data.reference} payment_token={data.payment_token} address_token={data.address_token} price_card={parseInt(data.price_card)} limit_tickets_card={parseInt(data.limit_tickets_card)} limit_tickets_user={parseInt(data.limit_tickets_user)} status_card={"enabled"} collection_verified={Boolean(data.collection_verified)} web_url={data.web_url} discord_url={data.discord_url} twitter_url={data.twitter_url} magic_eden_url={data.magic_eden_url} date={JSON.parse(data.date)} winner={JSON.parse(data.winner)} />
                })
            }
            </div>
        </div>
    )
}

export default ItemsWhitelist