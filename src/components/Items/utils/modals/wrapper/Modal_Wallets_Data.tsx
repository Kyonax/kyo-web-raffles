import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { FaBars } from 'react-icons/fa'
import { Keypair, SystemProgram, Transaction, PublicKey } from '@solana/web3.js';
import React, { FC, useCallback, useState } from 'react';
import BaseModalWallets from './BaseModalWallets'


import axios from "axios"; import '../App.css'


const API_DATA = process.env.REACT_APP_API_DATA_PATH;

interface Data_WalletsProps {
    props: any;
    isActive: string;
    isLimitReached: any;
}

export const Data_Wallets: React.FC<Data_WalletsProps> = ({ isActive, isLimitReached, props }) => {
    const [isPopUpVisible, setIsPopUpVisible] = useState(false);
    const [publicAddress, setPublicAddress] = useState(Object);
    const [arrayWallets, setArrayWallets] = useState(Object);
    let [tickets_total, setTickets_total] = useState(0)


    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();

    const togglePopUp = () => {
        if (!isPopUpVisible) {
            setIsPopUpVisible(wasPopUpVisible => !wasPopUpVisible)
        }
    }

    const onClick = useCallback(async () => {
        interface DataWallet {
            wallet: string;
            tickets: number;
            signatures: any;
        }

        interface SignaturesData {
            signature: string;
        }

        let wallet_info: DataWallet[] = [];
        let publicKey_: any, arrayTest_: Array<any>;
        let totales_tickets_all = 0

        await axios.get(API_DATA + "").then((api: any) => {

            api.data.forEach((data: any) => {                
                if (data.tituloitem === props.reference) {
                    let tickets_totales_wallet = 0
                    let wallet_ = data.billetera, isSaved = false, signatures: SignaturesData[] = [];

                    if (arrayTest_ !== undefined) {
                        arrayTest_.forEach(data_array => {
                            if (wallet_ === data_array.wallet) {
                                isSaved = true;
                            }
                        });
                    }

                    if (isSaved === false) {

                        api.data.forEach((data_: any) => {
                            if (data_.tituloitem === props.reference) {
                                if (data_.billetera === wallet_) {
                                    signatures.push(data_.signature)
                                    tickets_totales_wallet = tickets_totales_wallet + parseInt(data_.tickets)
                                }
                            }
                        });

                        const push_wallet_info: DataWallet = {
                            wallet: wallet_,
                            tickets: tickets_totales_wallet,
                            signatures: signatures,
                        }

                        wallet_info.push(push_wallet_info)
                        arrayTest_ = wallet_info

                    }
                    totales_tickets_all = totales_tickets_all + parseInt(data.tickets);
                }
            });


            if (arrayTest_ != undefined) {
                arrayTest_.forEach(pubkey_wallet_data => {
                    if (publicKey + "" === pubkey_wallet_data.wallet) {
                        publicKey_ = {
                            wallet: publicKey + "",
                            tickets: pubkey_wallet_data.tickets,
                            signatures: pubkey_wallet_data.signatures,
                        }
                    }
                });
            }

            setPublicAddress(publicKey_);
            setArrayWallets(arrayTest_)
            setTickets_total(totales_tickets_all)
            togglePopUp();

        })




    }, [publicKey, sendTransaction, connection, props]);

    return (
        <div>
            <button disabled={isActive == "disabled"} className={`relative bottom-[-2px] h-[55px] mb-2 buyticket buyticket-${isActive}-2`} onClick={() => { onClick(); isLimitReached(); }}><FaBars /></button>
            <BaseModalWallets props={props} isModalVisible={isPopUpVisible} onBackdropClick={togglePopUp} publicAddress={publicAddress} arrayWallets={arrayWallets} togglePopUp={setIsPopUpVisible} total_tickets={tickets_total} />
        </div>
    );
};

export default Data_Wallets;