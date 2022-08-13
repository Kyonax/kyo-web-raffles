import React, { useEffect, useState } from 'react'; import './Items.css';
import { FaCircle, FaCheckCircle, FaInfinity } from 'react-icons/fa'
import { useWallet } from '@solana/wallet-adapter-react';
import ButtonBuy from './utils/config/ButtonBuy';
import { Data_Wallets } from '../Items/utils/modals/wrapper/Modal_Wallets_Data'

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import BaseModalWrapper from './utils/modals/BaseModalWrapper';
import NoImage from '../../assets/No_Img.jpg'
import * as Exe from '../../tools/functions';

interface ItemProps {
    id: string, type: string, img: string, tittle: string, reference: string,
    payment_token: string, address_token: string, price_card: number, limit_tickets_card: number,
    limit_tickets_user: number, status_card: string, collection_verified: boolean,
    web_url: string, discord_url: string, twitter_url: string, magic_eden_url: string,
    date: any, winner: any
}

const Item: React.FC<ItemProps> = ({ id, type, img, tittle, reference, payment_token, address_token, price_card, limit_tickets_card, limit_tickets_user, status_card, collection_verified, web_url, discord_url, twitter_url, magic_eden_url, date, winner }) => {

    // Creación de Pop Ups y Mensajes de Advertencia, Información o Errores  
    // [id - img - tittle - payment_token - addres_token - collection_verified - web_url - discord_url - twitter_url - magic_eden_url - date - winner] 
    // type - reference - price_card - limit_tickets_card - limit_tickets_user - status_card 
    const [isPopUpVisible, setIsPopUpVisible] = useState(false); const [typeMessage, setTypeOfMessage] = useState("info");
    const [messageState, setMessageState] = useState("Processing transaction...");

    const togglePopUp = () => {
        if (!isPopUpVisible) {
            setIsPopUpVisible(wasPopUpVisible => !wasPopUpVisible)
        }
    }

    let [_type_text, _setType_text] = useState("normal"), [_loading, _setLoading] = useState("not"), [_status_card_ui, _setStatus_card_ui] = useState(status_card),
        [_limit_reached, _setLimit_reached] = useState("false"), [_tickets_total, _setTickets_total] = useState(winner.data_users_raffle.total_tickets),
        [_limit_card, _setLimit_card] = useState(limit_tickets_card), [_limit_user, _setLimit_user] = useState(limit_tickets_user), [_sumador_rots, _setSumador_rots] = useState(price_card),
        [_sumador_tickets, _setSumador_tickets] = useState(0), [_is_popUp_visible, _setIs_popUp_visible] = useState(false), [_current_price_card, _setCurrentSet_price_card] = useState(price_card),
        [_reference, _setReference] = useState("Fetching Data"), [_wallet_tickets, _setWallet_tickets] = useState(null), [_loadingTickets, _setLoadingTickets] = useState("spin"),
        [_sumador_rots_string, _setSumador_rots_string] = useState(price_card);

    let [_id, _setID] = useState(id), [_img_url, _setImg_url] = useState(img), [_tittle, _setTittle] = useState(tittle), [_symbol_payment_token, _setSymbol_payment_token] = useState(payment_token),
        [_address_payment_token, _setAddress_payment_token] = useState(address_token), [_collection_verified, _setCollection_verified] = useState(collection_verified), [_web_url, _setWeb_url] = useState(web_url),
        [_discord_url, _setDiscord_url] = useState(discord_url), [_twitter_url, _setTwitter_url] = useState(twitter_url), [_magic_eden_url, _setMagic_eden_url] = useState(magic_eden_url),
        [_date, _setDate] = useState(date), [_winner, _setWinner] = useState(winner), [_type, _setType] = useState(type);

    const { publicKey } = useWallet(); let props = {
        id: _id, type: _type, img: _img_url, reference: _reference,
        payment_token: _symbol_payment_token, address_token: _address_payment_token, price_card: _current_price_card,
        limit_tickets_card: _limit_card, limit_tickets_user: _limit_user, status_card: _status_card_ui, collection_verified: _collection_verified,
        web_url: _web_url, discord_url: _discord_url, twitter_url: _twitter_url, magic_eden_url: _magic_eden_url,
        date: _date, winner: _winner, tittle: _tittle
    }

    //DESITIONS        
    const _is_limit_reached = () => { if (_tickets_total >= limit_tickets_card) { _setLimit_reached("true") } else { _setLimit_reached("false") } }

    const _plus_card_props = () => {
        if (_loadingTickets !== "spin") {
            let _limit_card_string = String(_limit_card).replace(",", "");
            let _limit_user_string = String(_limit_user).replace(",", "");

            if (_sumador_tickets < (parseInt(_limit_card_string) - _tickets_total) && _sumador_tickets < (parseInt(_limit_user_string) - _wallet_tickets)) {
                _setSumador_tickets(_sumador_tickets + 1); _setSumador_rots((_sumador_tickets + 1) * _current_price_card); _setSumador_rots_string(Exe.numberWith(((_sumador_tickets + 1) * _current_price_card), ","))
            }
        } else {
            togglePopUp();
            setTypeOfMessage("warning")
            setMessageState("Connect your Wallet!");
        }
    }

    const _less_card_props = () => {
        if (_loadingTickets !== "spin") {
            if (_sumador_tickets > 0) {
                _setSumador_tickets(_sumador_tickets - 1); _setSumador_rots((_sumador_tickets - 1) * _current_price_card); _setSumador_rots_string(Exe.numberWith(((_sumador_tickets - 1) * _current_price_card), ","))
            }
        } else {
            togglePopUp();
            setTypeOfMessage("warning")
            setMessageState("Connect your Wallet!");
        }

    }

    const _loading_form = () => {
        if (_loading === "spin") { return <div className="w-3 h-3 border-b-2 border-gray-900 rounded-full animate-spin"></div> }
        else { return <FaCheckCircle /> }
    }

    const _loading_tickets = () => {
        if (_loadingTickets === "spin") { return 0 }
        else { return <span className='mr-2'>{_wallet_tickets}</span> }
    }

    const _init_data_ui = (_p_tickets_total: any, _p_limit_tickets_card: any, _p_status_card_ui: any, _p_price_card: any, _p_current_price_card: any, _p_reference: any, _p_current_reference: any,
        _p_id: any, _p_img: any, _p_tittle: any, _p_symbol_payment_token: any, _p_address_payment_token: any, _p_collection_verified: any, _p_web_url: any, _p_discord_url: any, _p_twitter_url: any,
        _p_magic_eden_url: any, _p_date: any, _p_winner: any, _p_type: any) => {

        if (publicKey === null) { _setLoadingTickets("spin") };
        if (_p_tittle === "Loading Data...") { _setLoading("spin") } else { _setLoading("not") }
        if (_p_tickets_total >= _p_limit_tickets_card) { _setLimit_reached("true") } else { _setLimit_reached("false") }

        if (_p_tittle === "Loading Data..." || _p_tittle === "Not Data Found" || _p_status_card_ui === "disabled") {
            _setStatus_card_ui("disabled"); _setType_text("muted");
        }

        if (_p_current_price_card === 0) { _setCurrentSet_price_card(_p_price_card); _setSumador_rots(_p_price_card); _setSumador_rots_string(Exe.numberWith(_p_price_card, ",")) }

        if (_p_current_reference === "Fetching Data" || _p_current_reference === "Not Data Found") {
            _setReference(_p_reference); _setID(_p_id); _setImg_url(_p_img); _setTittle(_p_tittle); _setSymbol_payment_token(_p_symbol_payment_token);
            _setAddress_payment_token(_p_address_payment_token); _setCollection_verified(_p_collection_verified); _setWeb_url(_p_web_url); _setDiscord_url(_p_discord_url);
            _setTwitter_url(_p_twitter_url); _setDate(_p_date); _setWinner(_p_winner); _setType(_p_type); _setMagic_eden_url(_p_magic_eden_url); _setStatus_card_ui(_p_status_card_ui);
        }
    }

    const _number_factor = async (_p_tickets_total: any, _p_limit_user: any, _p_limit_card: any) => {
        _p_tickets_total = await Exe.numberWith(_p_tickets_total, ","); _setTickets_total(_p_tickets_total);
        _p_limit_user = await Exe.numberWith(_p_limit_user, ","); _setLimit_user(_p_limit_user);
        _p_limit_card = await Exe.numberWith(_p_limit_card, ","); _setLimit_card(_p_limit_card);
    }

    const _api_wallet_tickets = async (_p_reference: any) => {
        if (publicKey != null) {
            let _dataApi = await Exe.axiosGet(process.env.REACT_APP_API_DATA_PATH), _wallet = publicKey.toString(), tickets = 0; _dataApi = _dataApi.data;
            _dataApi.forEach((ticket: any) => {
                if (ticket.billetera === _wallet && ticket.tituloitem === _p_reference) {
                    tickets += parseInt(ticket.tickets);
                }
            });
            _setWallet_tickets(tickets);
            _setLoadingTickets("not");
        } else {
            _setLoadingTickets("spin");
        }
    }

    useEffect(() => {
        _init_data_ui(winner.data_users_raffle.total_tickets, limit_tickets_card, status_card, price_card, _current_price_card, reference, _reference,
            id, img, tittle, payment_token, address_token, collection_verified, web_url, discord_url, twitter_url, magic_eden_url, date, winner, type);

        _number_factor(winner.data_users_raffle.total_tickets, limit_tickets_user, limit_tickets_card);
    });

    useEffect(() => {
        const interval = setInterval(() => {
            _api_wallet_tickets(_reference);
        }, 4000);

        return () => clearInterval(interval);
    }, [_reference])

    return (
        <div>
            {
                (_loading === "spin")
                    ? <div className='flex text-center'> <div className="mr-2 mt-[5.25px] w-3 h-3 border-b-2 border-gray-900 rounded-full animate-spin"></div> Loading, please wait...</div>
                    : (_reference === "Not Data Found")
                        ? <div className='text-center text-[#616161]'> No {_type}(s) were found <p>Wait for the upcoming <a className='border-b-2' target="_blank" href="https://twitter.com/rotten_ville">announcements</a></p></div>
                        : <div className={`m-3 mb-6 item item-${_status_card_ui} text-white`}>

                            <div className='text-center mt-2'> <span className={`inline-flex text-[16px] font-bold text-${_type_text}`}>{_tittle} <a className={`mt-[6px] ml-2 text-[14px] card-verified-${_collection_verified}`} href={_magic_eden_url} target="_blank"> {_loading_form()}</a></span></div>

                            <div className={`image image-${_status_card_ui} resize-image`}>
                                <LazyLoadImage effect='blur' loading='lazy' width="100%" height="100%" src={_img_url} alt={_tittle} placeholderSrc={NoImage} />
                            </div>

                            <div className={`text-center text-${_type_text}`}>
                                <span className={`text-[#00f7ae] font-bold text-[14px] text-${_status_card_ui} tittle-limit-${_limit_reached} text-${_type_text}`}>{reference}</span>
                                <span className={`font-bold text-[12px] ml-2 text-${_status_card_ui} tittle-limit-${_limit_reached} text-${_type_text}`}>x{_winner.amount} Winner(s)</span>
                                <div className='flex'>
                                    <div className='text-[12px] ml-3 mr-9 mt-2 block text-left'><span className='text-[#8083FF] font-bold '>Tickets Per Wallet</span><br /><span className='flex tracking-tight text-[14px]'>{_loading_tickets()} / {_limit_user}</span></div>
                                    <div className='text-[12px] ml-10 mt-2 block text-left'><span className='text-[#8083FF] font-bold '>Price/Ticket</span><br /><span className='tracking-tight text-[14px]'>{_current_price_card} ${_symbol_payment_token} 💸</span></div>
                                </div>
                                <div className='flex'>
                                    <div className='text-[12px] ml-3 mr-7 mt-3 block text-left'><span className='text-[#8083FF] font-bold '>Tickets Remaining</span><br /><span className='tracking-tight text-[14px]'>{_tickets_total} / {_limit_card} Sold</span></div>
                                    <div className='mt-4 ml-10'> <button className={`limit-${_limit_reached} menos buyticket-${_status_card_ui} circle-${_status_card_ui}`} disabled={_status_card_ui === "disabled" || _status_card_ui === "finished" || _status_card_ui === "finished"} onClick={() => { _less_card_props(); _is_limit_reached(); }}>-</button>  <button className={`limit-${_limit_reached} mas buyticket-${_status_card_ui}`} disabled={_status_card_ui == "disabled" || _status_card_ui === "finished"} onClick={() => { _plus_card_props(); _is_limit_reached(); }}>+</button> </div>
                                </div>
                            </div>

                            <div className='mt-4 flex pr-5 pl-5 place-items-center'> <div className='mr-5'><ButtonBuy wallet_tickets={_wallet_tickets} limit_user={_limit_user} number={_sumador_tickets} address_token={_address_payment_token} payment_token={_symbol_payment_token} sumador_rots_string={_sumador_rots_string} costorot={_sumador_rots} type={_type} title={_reference} isActive={_status_card_ui} limitReached={_limit_reached} isLimitReached={_is_limit_reached} date={_date}></ButtonBuy> </div> <Data_Wallets isActive={_status_card_ui} isLimitReached={_is_limit_reached} props={props} /> </div>
                            <BaseModalWrapper isModalVisible={isPopUpVisible} onBackdropClick={togglePopUp} typeAlert={typeMessage} textContent={messageState} />
                        </div>
            }
        </div>
    )
}

export default Item