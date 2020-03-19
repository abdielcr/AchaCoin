import express from 'express';
import bodyParser from 'body-parser';

import Blockchain from '../blockchain';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();

// Generando un nuevo bloque
blockchain.addBlock('express')

// Midlewhere
app.use(bodyParser.json());
// Exponiendo ruta url
app.get('/blocks', (req, res) => {
  res.json(blockchain.blocks);
});
// Mandando datos para minar
app.post('/mine', (req, res) => {
    // Descomponiendo Body
  const { body: { data } } = req;
//   Generando un nuevo bloque con lo que nos llegan, con lo que estamos miniano
  const block = blockchain.addBlock(data);
// el largo de los datos dados
  res.json({
    //   Numero de bloques, y el bloque que genero
    blocks: blockchain.blocks.length,
    block,
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Service HTTP:${HTTP_PORT} listening...`);
});
