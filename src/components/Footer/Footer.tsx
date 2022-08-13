import React from 'react'; import './Footer.css';
import { FaHeart, FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa'
import RottenLogo from '../../assets/Icons/RottenLogo'

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <div className='absolute text-[9px] md:text-[11px] w-full h-[105px] flex flex-wrap items-center bg-[#141414] text-[#FDF7FF] tracking-widest'>
            <div className='flex w-full mt-1 mb-1 z-10'><div className='flex absolute left-3 mt-1'><a href="https://magiceden.io/creators/rotten_ville" className='highlight'>Rotten Ville Collections</a></div><div className='text-[13px] flex absolute right-0 mr-3 mt-1'><a href='https://twitter.com/rotten_ville' target={"_blank"} className='cursor-pointer highlight'><FaTwitter className='mr-2' /></a><a href="https://www.instagram.com/rotten_ville/" target={"_blank"}><FaInstagram className='mr-2 cursor-pointer highlight' /></a><a href="https://discord.gg/yNFXRzFgXD" target={"_blank"}><FaDiscord className='cursor-pointer highlight' /></a></div></div>
            <div className='flex w-full mt-1 mb-[65px]'> <div className='flex absolute left-3 z-10'><a href="https://staking.rottenville.io" className='highlight'>Rotten NFT Staking</a></div> <div className='invisible sm:visible absolute top-[-3px] md:top-[-14px] w-full grid place-items-center'> <RottenLogo alt="RottenVille Logo" className='w-[120px] md:w-[150px]' /></div> <a href='https://twitter.com/rotten_ville' target={"_blank"} className='absolute right-0 mr-3' >© 2022 ROTTEN VILLE PROJECT</a></div>
            <div className='absolute bottom-0 w-full h-[50px] flex flex-wrap items-center text-center bg-[#171717]'>
                <div className='w-full text-center mt-2'>Made with <FaHeart className='text-[9px] ml-1 mr-1 mb-[2px] inline-flex' /><a href='https://twitter.com/kyonax_on_nft' target={"_blank"} className='cursor-pointer'>- Dev Team</a></div>
                <div className='w-full mb-2'> RoT Smart Contract Address: <a href="https://solscan.io/token/RoTksthszZDGGZq4uZZZxVmV7xsaz4X8kBESMyeLZkE" target={"_blank"} className='highlight'>RoTksthszZDGGZq4uZZZxVmV7xsaz4X8kBESMyeLZkE</a></div>
            </div>
        </div>

    )
}

export default Footer