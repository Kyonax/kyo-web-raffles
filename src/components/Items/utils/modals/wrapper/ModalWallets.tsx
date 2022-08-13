import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { FaTimes, FaGlobe, FaDiscord, FaTwitter, FaCheckCircle } from 'react-icons/fa'
import { MdOutlineDocumentScanner } from 'react-icons/md'
import '../App.css'; import '../Modal.css'; import '../Modal_Responsive.css'
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { numberWith } from '../../../../../tools/functions';

interface ModalProps {
    props: any;
    setModalVisible: any;
    publicAddress: any;
    arrayWallets: any;
    total_tickets: number;
    onBackdropClick: () => void;
}

const ModalWallet: React.FC<ModalProps> = ({ props, publicAddress, arrayWallets, onBackdropClick, setModalVisible, total_tickets }) => {
    let connected_Wallet_Text = "Connected Wallet"; const [showModal, setShowModal] = useState(false);
    const [openTab, setOpenTab] = React.useState(1);

    if (publicAddress === undefined) {
        publicAddress = {
            wallet: "Connect your Wallet",
            tickets: 0,
            signatures: [],
        }

        connected_Wallet_Text = "Wallet"
    }

    if (arrayWallets === undefined) {
        arrayWallets = [{
            wallet: "No Tickets were found in the database",
            tickets: 0,
        }]
    }
    let contentAddress = {
        content: publicAddress.wallet,
        message: publicAddress.wallet,
        tickets: publicAddress.tickets,
        signatures: publicAddress.signatures,
    }


    let _awesome = props.reference.split(' ')[0]

    const Tabs = (color: any) => {

        color = color.color;
        return (
            <>
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <ul
                            className="flex mb-0 list-none flex-wrap pt-1 flex-row"
                            role="tablist"
                        >
                            <li className="mr-2 last:mr-0 text-center">
                                <a
                                    className={
                                        "text-sm w-[100px] font-bold px-0 py-3 rounded block leading-normal " +
                                        (openTab === 1
                                            ? "text-[#f2f3b6] bg-[#59594F] border border-3 border-[#59594F] hover:text-[#e6e6cc]"
                                            : "text-[" + color + "] hover:text-[#01d091] border border-3 border-[#252424]")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(1);
                                    }}
                                    data-toggle="tab"
                                    href="#link1"
                                    role="tablist"
                                >
                                    Wallet
                                </a>
                            </li>

                            <li className=" mr-2 last:mr-0 flex-auto text-center">
                                <a
                                    className={
                                        "text-sm w-[150px] font-bold px-5 py-3 rounded block leading-normal " +
                                        (openTab === 2
                                            ? "text-[#f2f3b6] bg-[#59594F] border border-3 border-[#59594F] hover:text-[#e6e6cc]"
                                            : "text-[" + color + "] hover:text-[#01d091] border border-3 border-[#252424]")
                                    }
                                    onClick={e => {
                                        e.preventDefault();
                                        setOpenTab(2);
                                    }}
                                    data-toggle="tab"
                                    href="#link2"
                                    role="tablist"
                                >
                                    x{props.winner.amount} Winner(s)
                                </a>

                            </li>

                        </ul>



                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded">
                            <div className="px-4 py-5 flex-auto">
                                <div className="tab-content tab-space">
                                    <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                        <p>
                                            <a className='font-bold card-tittle-tickets text-[16px] lg:text-[18px]'>Your Tickets</a> <br />
                                            <a className={`address text-[13px] lg:text-[16px] address-${contentAddress.content}`}><div><a>{contentAddress.message}</a><a className='tickets-wallet'>{contentAddress.tickets} Tickets</a></div> <div className='mt-3 design-list-2 flex'> <ul><a className='text-[13px] mb-2'><MdOutlineDocumentScanner className='mb-1 inline-flex' /> Solscan Signatures Transactions</a> {contentAddress.signatures.map((child: any, index: number) => {
                                                return <li data-icon="🔍" className='flex'><a className='text-[10px] lenght-size mb-1' target="_blank" href={`https://solscan.io/tx/${child}`}>{child}</a></li>;
                                            })}</ul></div></a>
                                        </p>
                                    </div>

                                    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                        <p>
                                            <a className='font-bold card-tittle-tickets text-[16px] lg:text-[18px]'>Winner Raffle</a> <br />
                                            <a className={`address address-${contentAddress.content}`}> <div className='design-list-2 mt-3 flex'> <ul>{props.winner.result.map((child: any, index: number) => {
                                                return (<div>
                                                    <li data-icon="👑" className='text-white inline-flex text-[11px] lg:text-[15px] mb-6 lg:mb-2 '>
                                                        <div className='inline-flex'>
                                                            <div className='grid'><a className='ml-1'> {child.wallet}</a> <a className='text-[#6414FF] font-bold text-[12px] lg:text-[17px]'>The {props.type} is {child.claimed}</a></div>
                                                            <div className='tickets-wallet mt-5 lg:mt-0 grid text-[#02C98C] text-right text-[11px] lg:text-[14px]'><a>{child.tickets} / {props.winner.data_users_raffle.total_tickets} Tickets - {child.tokens} ${props.payment_token}</a><a >{child.percentage}% Probabilities</a></div>
                                                        </div>
                                                    </li>
                                                </div>);
                                            })}</ul></div></a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    return ReactDOM.createPortal(
        <div onClick={onBackdropClick}>
            <div id="myModal" className="modal">

                {/**  Modal content */}


                <div
                    className="justify-center mt-[60px] items-center flex overflow-x-hidden overflow-y-auto z-50 outline-none focus:outline-none"
                >
                    <div className="modal-content relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 relative flex flex-col w-full">
                            {/*header*/}
                            <button className="close mt-[20px] mr-[7px] lg:mt-[-30px] lg:mr-[-30px]" onClick={() => { setModalVisible(false); }}> <FaTimes /></button>
                            {/*body*/}
                            <div className="relative flex-auto py-4">
                                <div className='grid lg:inline-flex mb-3'>
                                    <div className='imagencita-wallets'><img width="100%" src={props.img} alt={props.tittle} /></div> <div className='mt-3 lg:mt-6 lg:ml-6 card-title'><span className='text-[16px] lg:text-[19px]'>{props.type + " -  x" + props.winner.amount + " Winner(s)"}</span><br /><span className='text-[23px] lg:text-[30px]'><strong>{props.tittle}</strong> <a className={`inline-flex card-verified-${props.collection_verified}`} target="_blank" href={props.magic_eden_url}><FaCheckCircle className='absolute mt-[-13px] lg:mt-[-14px] ml-[0px]' /></a></span><br /><strong><span className='prize-tittle mt-0'><strong>{props.reference}</strong></span></strong><br /><span className='card-items flex mt-2 text-[18px]'><a className='mr-2' target="_blank" href={props.web_url}><FaGlobe /></a><a className='mr-2' target="_blank" href={props.discord_url}><FaDiscord /></a><a className='mr-2' target="_blank" href={props.twitter_url}><FaTwitter /></a></span></div>
                                </div>
                            </div>


                            <Tabs color="#59594F" />


                            <div className='linea mt-5'></div>

                            <div className='flex design-list mb-5'>
                                <ul>
                                    Wallet
                                    {arrayWallets.map((child: any, index: number) => {
                                        return <li data-icon="🔗">{child.wallet}</li>;
                                    })}
                                </ul> <ul className='list-tickets down-tickets'><span className='invisible lg:visible'>Tickets</span> {arrayWallets.map((child: any, index: number) => {
                                    return <li data-icon="🎫">{child.tickets}</li>;
                                })}</ul>
                            </div>
                            <div className='design-list mb-10'><ul className='list-tickets-2 text-[14px] lg:text-[16px]'>Total Tickets <li className='text-total' data-icon="🎫">{total_tickets}</li></ul>
                            <ul className='list-tickets-3 text-[14px] lg:text-[16px]'>Total {props.payment_token} <li className='text-total' data-icon="💰">{numberWith(props.winner.data_users_raffle.total_rot, ",")}</li></ul>
                            <ul className='list-tickets-4 text-[14px] lg:text-[16px]'>Total Wallets <li className='text-total' data-icon="🧠">{numberWith(props.winner.data_users_raffle.total_users, ",")}</li></ul>
                            </div>
                                <div className='mt-3'></div>
                            {/*footer*/}
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>


            </div>
        </div>, document.getElementById('modal-root')!);
}

export default ModalWallet