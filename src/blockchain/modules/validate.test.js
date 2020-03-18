import Blockchain from '../blockchain';
import validate from '../validate';

describe('validate()', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  //Validar cadena correcta
  it('validates a valid chain', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.addBlock('bl4ck-2');

    expect(validate(blockchain.blocks)).toBe(true);
  });
// Validando Genesis corrupto mutandolo..
  it('invalidates a chain with a corrupt genesis block', () => {
    blockchain.blocks[0].data = 'h4ck-data';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid Genesis block.');
  });
// Validando con un hash corrupto
  it('invalidates a chain with a corrupt previousHash within a block', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.blocks[1].previousHash = 'h4ck-previoushash';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid previous hash.');
  });
// Validando Chain con un chain corroptu dentro del bloque
  it('invalidates a chain with a corrupt hash within a block', () => {
    blockchain.addBlock('bl4ck-1');
    blockchain.blocks[1].hash = 'h4ck-hash';

    expect(() => {
      validate(blockchain.blocks);
    }).toThrowError('Invalid hash.');
  });
});
