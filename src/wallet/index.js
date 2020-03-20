import Transaction from './transaction';
import Wallet from './wallet';

const blockchainWallet = new Wallet();//A qui podemos definir el numero tope

export { Transaction, blockchainWallet };
export default Wallet;