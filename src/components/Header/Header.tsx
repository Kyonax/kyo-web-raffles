import React, { useState } from 'react'; import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import * as Exe from '../../tools/functions';
import WalletButton from "../Select Wallet/Wallet"
import HeadRottenLogo from '../../assets/Icons/HeadRottenLogo'

interface HeaderProps {
    solana_tps: any,
    rot_data: any
}

const Header: React.FC<HeaderProps> = ({ solana_tps, rot_data }) => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    return (
        <div className='z-[63] fixed w-full h-[60px] flex justify-between items-center px-4 bg-[#0a0a0a] text-white'>
            <div className='justify-center items-center tracking-widest'>
                <a href="/" > <div className='bg-[#6414ff] rounded-md w-[80px] h-[35px] md:w-[100px] md:h-[40px] flex place-items-left ml-[10%] mt-[0px]'> <div className='w-[50px] md:w-[55px] mr-0 mt-[4.5px] ml-[-6px]'><HeadRottenLogo /></div> <div className='grid relative left-[-4.5px] md:left-[-6.5px] top-[2px]'><p className='akira-font-apply relative text-[7.5px] md:text-[9.5px] mt-[-5px] md:mt-[-7px] bottom-[-11px] md:bottom-[-14px]'>STORE</p><p className='relative bottom-[0px] text-[7.5px] md:text-[9px]'>v1.2.0</p></div></div></a>
            </div>

            {/* Menu */}
            <ul className='hidden md:flex mr-[1%] font-normal text-sm text-[12px]'>
                <li className='mr-3 mt-[3px]'><div className='flex'><a href="https://solscan.io/token/RoTksthszZDGGZq4uZZZxVmV7xsaz4X8kBESMyeLZkE" className='flex'>{rot_data.data.symbol} Supply <p className='text-[#FFBF3B] ml-1'>${rot_data.data.supply}</p></a></div><div className='flex'><a href="https://status.solana.com" className='flex'>Solana Network <p className='text-[#FFBF3B] ml-1'>{solana_tps}TPS</p></a></div></li>
                <li><WalletButton /></li>
            </ul>


            {/* Hamburger */}
            <div onClick={handleClick} className='md:hidden'>
                {!nav ? <FaBars /> : <FaTimes />}
            </div>

            {/* Mobile Menu */}
            <ul className={!nav ? 'hidden' : 'md:hidden absolute top-[60px] left-0 w-full h-screen bg-[#0a0a0a] bg-opacity-95 flex flex-col justify-center items-center font-thin text-sm z-40'}>
                <li><WalletButton /></li>
                <li className='mr-3 mt-1 text-center justify-center'><div className='flex text-center justify-center'><a href="https://solscan.io/token/RoTksthszZDGGZq4uZZZxVmV7xsaz4X8kBESMyeLZkE" className='flex text-center justify-center ml-3 mt-6'>{rot_data.data.symbol} Supply <p className='text-[#F9F871] ml-1'>${rot_data.data.supply}</p></a></div><div className='flex text-center justify-center'><a href="https://status.solana.com" className='flex text-center justify-center ml-3'>Solana Network <p className='text-[#F9F871] ml-1'>{solana_tps}TPS</p></a></div></li>
            </ul>

        </div >
    )
}

export default Header