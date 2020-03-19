import Block from './block';
import validate from './validate';
import MemoryPool from './memoryPool';

class Blockchain {
    //Constructir no recibe ningun parametro 
  constructor() {
    // Array de bloques ordenados  
    this.blocks = [Block.genesis];
    this.memoryPool = new MemoryPool();
  }
    // Nuevo metodo de instancia, solo recibe un parametro que es data
  addBlock(data) {
    // Sacando el ultimo elemento de la block chain
    const previousBlock = this.blocks[this.blocks.length - 1];
    // Mimando el bloque anterior
    const block = Block.mine(previousBlock, data);
    // Metiendo el array minado
    this.blocks.push(block);

    return block;
  }

  replace(newBlocks = []) {
    // Comprobando la longitud de los valores
    if (newBlocks.length < this.blocks.length) throw Error('Received chain is not longer than current chain.');
    // Validando nuevos bloques
    try {
      validate(newBlocks);
    } catch (error) {
      throw Error('Received chain is invalid');
    }
    // Si han pasado todos los test sustituimos los chains
    this.blocks = newBlocks;

    return this.blocks;
  }
}

export default Blockchain;
