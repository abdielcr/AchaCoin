import PKG from './package.json';
import Block from './src/blockchain/block'

const { name, version } = PKG;

// Sacando Genesis de la clase bloque.
const {genesis} = Block;
console.log(genesis.toString());

const block1 = Block.mine(genesis,'data-1');
console.log(block1.toString());

const block2 = Block.mine(block1,'MiDato-2');
console.log(block2.toString());
// console.log(`${name} v${version}`);

// console.log(genesis.toString());

// // Creando una nueba Instancia e iniciando un nuevo bloque
// // Llamamos al constructor
// // Datos de ejemplo de una instancia con datos iniciados Fake const block = new Block('A','B','C','D');
// const block = new Block('A','B','C','D');

// console.log(block.toString());