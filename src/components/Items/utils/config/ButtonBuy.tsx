import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID, transferChecked, createTransferInstruction, createTransferCheckedInstruction, transferCheckedInstructionData, getAssociatedTokenAddress } from "@solana/spl-token";
import BaseModalWrapper from '../modals/BaseModalWrapper';
import React, { FC, useCallback, useEffect, useState } from 'react';
import * as bs58 from "bs58";

import axios from "axios"; import '../../Items.css';
import { lowerCase } from 'lodash';

interface ButtonBuyProps {
    costorot: number;
    number: number;
    title: string;
    type: string;
    limitReached: any;
    isLimitReached: any;
    isActive: string;
    date: any,
    sumador_rots_string: any,
    payment_token: any,
    address_token: any,
    limit_user: any,
    wallet_tickets: any
}

export const ButtonBuy: React.FC<ButtonBuyProps> = ({ limit_user, wallet_tickets, number, address_token, payment_token, sumador_rots_string, costorot, title, type, isActive, limitReached, isLimitReached, date }) => {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [typeMessage, setTypeOfMessage] = useState("info");
    const [messageState, setMessageState] = useState("Processing transaction...");

    let [_number, _setNumber] = useState(number), [_payment_token, _setPayment_token] = useState(payment_token), [_sumador_rots_string, _setSumador_rots_string] = useState(sumador_rots_string),
        [_costorot, _setCostorot] = useState(costorot), [_title, _setTitle] = useState(title), [_type, _setType] = useState(type), [_isActive, _setIsActive] = useState(isActive),
        [_limitReached, _setLimitReached] = useState(limitReached), [_isLimitReached, _setIsLimitReached] = useState(isLimitReached), [_date, _setDate] = useState(date),
        [_address_token, _setAddress_token] = useState(address_token), [timeLeft, setTimeLeft] = useState({ state: "Starts in ", day: 0, month: 0, time: { hour: 0, minutes: 0, seconds: 0 } });

    const _init_data_ui = (_p_number: any, _p_address_token: any, _p_payment_token: any, _p_sumador_rots_string: any, _p_costorot: any, _p_title: any, _p_type: any, _p_isActive: any,
        _p_limitReached: any, _p_isLimitReached: any, _p_date: any) => {
        if (_p_title === "Loading Data..." || _p_title === "Not Data Found" || _p_isActive) {
            _setNumber(_p_number); _setPayment_token(_p_payment_token); _setSumador_rots_string(_p_sumador_rots_string);
            _setCostorot(_p_costorot); _setTitle(_p_title); _setType(_p_type); _setIsActive(_p_isActive);
            _setLimitReached(_p_limitReached); _setIsLimitReached(_p_isLimitReached); _setDate(_p_date);
            _setAddress_token(_p_address_token);
        }
    }

    function enviardatos(t: any, titu: any, b: any, rot: any, tickets: any, signature: any) {
        console.log(`e: REFERENCE = ${titu}`)
        // console.log(t,titu,w,rot,tickets,signature);     
        axios.post(process.env.REACT_APP_API_PATH + "", {
            "tipo": t,
            "tituloitem": titu,
            "billetera": b,
            "rotgastado": rot,
            "tickets": tickets,
            "signature": signature,
            "web": process.env.REACT_APP_CLAVEWEB

        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(function (response) {
                //console.log(response);
                // Setbshowmensaje('mostrar');        
                //setTypeOfMessage("warning")
                //setMessageState("Saved data, Done!");

            })
            .catch(function (error) {
                console.log(error.response);
                console.log(process.env.REACT_APP_API_PATH);

                //   Setbshowmensaje('mostrar');        
                setTypeOfMessage("error")
                setMessageState("Error Saving data! - " + error.response);
            });
    }

    const sendMessageTransaction = () => {
        setTypeOfMessage("info")
        setMessageState("Processing transaction...");
    }

    const togglePopUp = () => {
        if (!isPopUpVisible) {
            setIsPopUpVisible(wasPopUpVisible => !wasPopUpVisible)
        }
    }

    const { connection } = useConnection();

    // var connection = new connection(clusterApiUrl("mainnet-beta"));  
    const { publicKey, sendTransaction } = useWallet();

    const timeRaffle = () => {
        let day, month, time, prefix = "Starts in ";

        const monthsLong = {
            jan: '0', feb: '1', mar: '2', apr: '3',
            may: '4', jun: '5', jul: '6', aug: '7',
            sep: '8', oct: '9', nov: '10', dec: '11',
        };

        if (_isActive === "enabled") {
            prefix = "Ends in ";
            day = _date.end.split(' ')[0]; month = _date.end.split(' ')[1]; time = _date.end.split(' ')[2];
        } else {
            prefix = "Starts in ";
            day = _date.start.split(' ')[0]; month = _date.start.split(' ')[1]; time = _date.start.split(' ')[2];
        }
        let _month = month;
        month = monthsLong[String(month).toLowerCase() as keyof typeof monthsLong];
        let hour = time.split(':')[0], minutes = time.split(':')[1], seconds = time.split(':')[2];
        let date_card = new Date(Date.UTC(2022, parseInt(month), parseInt(day), parseInt(hour), parseInt(minutes), parseInt(seconds), 0));
        let now = new Date().getTime();
        let left_time = date_card.getTime() - now, left_day = Math.floor(left_time / (1000 * 60 * 60 * 24)),
            left_hours = Math.floor((left_time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), left_minutes = Math.floor((left_time % (1000 * 60 * 60)) / (1000 * 60)),
            left_seconds = Math.floor((left_time % (1000 * 60)) / 1000);



        let _dateUpdate = {
            state: prefix,
            day: left_day,
            month: _month,
            time: {
                hour: left_hours,
                minutes: left_minutes,
                seconds: left_seconds
            }
        }

        setTimeLeft(_dateUpdate)
        //console.log(`Day: ${day} Month: ${month}| Time: ${hour} - ${minutes} - ${seconds}`)
    };

    const onClick = useCallback(async (_costorot: any, _number: any) => {

        if (publicKey === null) {
            setTypeOfMessage("warning")
            setMessageState("Connect your Wallet!");
        } else {
            sendMessageTransaction();
        }

        if (_number === 0) {            
            setTypeOfMessage("error");
            return setMessageState("Transaction Failed! - You can't buy 0 Tickets");
        }

        if ((_number + wallet_tickets) > limit_user) {
            setTypeOfMessage("error");
            return setMessageState("Transaction Failed! - Tickets Limit reached");
        }

        if (!publicKey) throw new WalletNotConnectedError();

        const alice = Keypair.fromSecretKey(
            bs58.decode(
                "2cQQQSbSDuqLUgdPocPRRtV5h7PPC6v2MU6xGSsaJPr2ALveGYYGaDk47gZrgxeZ2MkGYfFvjWiKhm1ynquLuEDi"
            )
        );

        /// nuestro token (este el token devnet)
        const mintPubkey = new PublicKey(
            "RotMAyKDv5g1UMaUzJjBriSBqzVb3eQHopc6DjW7XTp"
        );


        /// nuestro token (este el token main)
        const mintPubkeyreal = new PublicKey(_address_token);

        /// esta es la dichosa funcion 
        let ata = await getAssociatedTokenAddress(
            mintPubkeyreal, // mint
            publicKey // owner
        );

        console.log(`ATA de la billetera actual: ${ata.toBase58()}`);

        const tokenAccountXPubkeybilleteraconectada = new PublicKey(
            ata.toBase58()
        );
        console.log(tokenAccountXPubkeybilleteraconectada);


        /// la adress que se saca del token, accaount
        const tokenAccountXPubkey = new PublicKey(
            "7Bsh5kqxqGP5gbyGKQH9T21Nqn6S5db4XizXFx8mZbY8"
        );

        /// la adress del la billetera a la que se manda, account (esta es la de devnet)
        const tokenAccountYPubkey = new PublicKey(
            "C5fLifityTAH8XpBeLqFenKavz64z5xsN4TNTH5SrMXU"
        );

        const transaction = new Transaction().add(
            createTransferInstruction(
                tokenAccountXPubkeybilleteraconectada,
                tokenAccountYPubkey,
                publicKey,
                parseFloat(_costorot + "e9"),
                [],
                TOKEN_PROGRAM_ID
            )
        );

        try {

            const signature = await sendTransaction(transaction, connection);
            const confirmationSignature = await connection.confirmTransaction(signature, 'processed');

            setTypeOfMessage("success")
            setMessageState("Transaction Success: You bought " + _number + " ticket.");
            setTimeout(togglePopUp, 3000);

            enviardatos(_type, _title, publicKey, _costorot, _number, signature);

        } catch (error: any) {
            console.table(error)
            setTypeOfMessage("error")
            setMessageState("Transaction Failed! - " + error.message);

        }


    }, [publicKey, sendTransaction, connection, _type, _title, _address_token, limit_user, wallet_tickets]);

    useEffect(() => {
        _init_data_ui(number, address_token, payment_token, sumador_rots_string, costorot, title, type, isActive, limitReached, isLimitReached, date);
    })

    useEffect(() => {
        const interval = setInterval(() => {
            timeRaffle();
        }, 1000);

        return () => clearInterval(interval);
    }, [_date, _isActive])

    return (
        <div>
            <button disabled={_isActive === "disabled" || _limitReached === "true" || _isActive === "finished"} className={`mt-[-6px] buyticket-limit-${_limitReached} buyticket buyticket-${_isActive} buyticket-${_isActive}-all`} onClick={() => { onClick(_costorot, _number); togglePopUp(); isLimitReached(); }}><div className='tracking-tight grid'><span className='font-bold text-[14px]'>Buy {_number} Ticket(s)</span><span className='text-[10px] flex text-white'><p className='font-bold mr-[3px] text-[#FFBF3B]'>{timeLeft.state}</p> {timeLeft.day} days {timeLeft.time.hour} hrs {timeLeft.time.minutes} mins {timeLeft.time.seconds} s</span> <span className='font-bold text-[12px] text-[#6414ff]'>${_sumador_rots_string} {_payment_token}</span></div></button>
            <BaseModalWrapper isModalVisible={isPopUpVisible} onBackdropClick={togglePopUp} typeAlert={typeMessage} textContent={messageState} />
        </div>
    );
};

export default ButtonBuy;