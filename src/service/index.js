import express from 'express';
import bodyParser from 'body-parser';

import Blockchain from '../blockchain';
import P2PService from './p2p';

const { HTTP_PORT = 3000 } = process.env;

const app = express();
const blockchain = new Blockchain();
// Creando una nueva instancia de P2P
const p2pService = new P2PService(blockchain);

// Generando un nuevo bloque
//blockchain.addBlock('express')

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
// Llamar metodo sync, cuando se mine un nuevo bloque se sincroniza  
  p2pService.sync();
// el largo de los datos dados
  res.json({
    //   Numero de bloques, y el bloque que genero
    blocks: blockchain.blocks.length,
    block,
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Service HTTP:${HTTP_PORT} listening...`);
  // Una vez que todo cargue correcro dejamos a la escucha el servicio
  p2pService.listen();
});
