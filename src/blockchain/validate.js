import Block from './block';

export default (blockchain) => {
//Descomponiedno la blockChain en dos, genesis y el resto de bloques 
  const [genesisBlock, ...blocks] = blockchain;
// Si en genesis no es correcto devolveremos error
  if (JSON.stringify(genesisBlock) !== JSON.stringify(Block.genesis)) throw Error('Invalid Genesis block.');
// Iterando por el resto de los bloques
  for (let i = 0; i < blocks.length; i += 1) {
    // Descomponiendo cada bloque
    const {
      previousHash, timestamp, hash, data, nonce, difficulty,
    } = blocks[i];
    // Sacando el bloque previo
    const previousBlock = blockchain[i];
    //Validando los hash
    if (previousHash !== previousBlock.hash) throw Error('Invalid previous hash.');
    // Que el hash sea el correcto y no se halla mutado
    if (hash !== Block.hash(timestamp, previousHash, data, nonce, difficulty)) throw Error('Invalid hash.');
  }

  return true;
};
