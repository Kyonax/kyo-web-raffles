import React, { ReactNode, useEffect, useMemo } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Body from '../components/Body/Body'
import ItemsUpcoming from '../components/Items/utils/addons/ItemsUpcoming';



interface HomeProps {
    solana_tps: any,
    rot_data: any
}

const Home: React.FC<HomeProps> = ({ solana_tps, rot_data }) => {    
    return (
        <div >
            <Context>
                <div><Header solana_tps={solana_tps} rot_data={rot_data} /></div>
                <div className='h-[75px]'></div>
                <div><Body /></div>
                <div className='mt-10 grid place-content-center'>
                    <div className='flex'><ItemsUpcoming /></div>
                </div>
                <div className='h-[100px]'></div>
                <div><Footer /></div>
            </Context>
        </div>
    )

}

export default Home

const Context: React.FC<{ children: ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const network2 = process.env.ENDPOINT_ROTTEN

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network2]);
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    //const network = WalletAdapterNetwork.Mainnet;

    // You can also provide a custom RPC endpoint.
    //const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};