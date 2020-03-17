import {SHA256} from 'crypto-js';
// Bloque que llevara el control de cada unas de las tarjetas
class Block {
    // Los valores tiempo,HashAnterior,HashActual,Datos
    //Constructor de la clase Block
    constructor(timestamp, previousHash, hash, data) {
        // Pasando las propiedades que llegan, a propiedades locales de la instancia
      this.timestamp = timestamp;
      this.previousHash = previousHash;
      this.hash = hash;
      this.data = data;
    }
  
    static get genesis() {
      const timestamp = (new Date(2000, 0, 1)).getTime();
      return new this(timestamp, undefined, 'g3n3s1s-h4sh', 'i like ramen.');
    }

        //Revice bloque previo y el dato que queremos almacenar
    static mine(previousBlock, data){
        // Numero de milisegundos que han transcurrido desde enero de 1970
        const timestamp = Date.now();
        const { hash: previousHash} = previousBlock;
        // Por el momento valor Hash Generico.

        const hash = Block.hash(timestamp,previousHash,data)
        //
      
        //Devolviendo una nueva instancia de la clase block.
        return new this(timestamp,previousHash,hash,data);

    }
    // Generando Hash
   
    static hash(timestamp, previousHash, data) {
        return SHA256(`${timestamp}${previousHash}${data}`).toString();
      }
//   Devolver informacion que tenemos almacenada en el bloque
    toString() {
      const {
        //   Destructurando elementos de this
        timestamp, previousHash, hash, data,
      } = this;
//   Devolvemos la informacion estructurada.
      return `Block -
        timestamp       : ${timestamp}
        previousHash    : ${previousHash}
        hash            : ${hash}
        data            : ${data}
      `;
    }
  }
  
  export default Block;