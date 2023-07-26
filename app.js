const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/comprar', (req, res) => {
  const itensComprados = req.body;
  
  // Verificar se o arquivo existe
  fs.readFile('itens_comprados.json', 'utf8', (err, data) => {
    let compras = [];

    if (!err) {
      try {
        compras = JSON.parse(data);
      } catch (err) {
        console.error('Erro ao parsear o arquivo JSON:', err);
        return res.status(500).json({ error: 'Erro ao parsear o arquivo JSON' });
      }
    }

    compras.push(itensComprados);

    fs.writeFile('itens_comprados.json', JSON.stringify(compras, null, 2), (err) => {
      if (err) {
        console.error('Erro ao salvar o arquivo:', err);
        return res.status(500).json({ error: 'Erro ao salvar o arquivo' });
      }
      console.log('Compra salva com sucesso!');
      res.json({ message: 'Compra salva com sucesso!' });
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
