import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import './Wallet.css'


require('@solana/wallet-adapter-react-ui/styles.css');

interface WalletProps {

}

const Wallet: React.FC<WalletProps> = ({ }) => {
    return (
        <div >

            <WalletMultiButton className='btn-style' />

        </div>
    )
}

export default Wallet;


