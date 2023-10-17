const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const tests = require('./testes/testes')

app.use(cors());
app.use(express.json());

app.post('/teste', async (req, res) => {

    const stringParam = req.body.stringParam;
    const results = await tests.executarTestes(stringParam);
    let isCorreto = true;

    for (const result of results) {
        if (result.approved === false) {
            isCorreto = false;
            break;
        }
    }

    if(isCorreto){
        res.status(200).json({ results: results, isCorreto: true });
    }else{
        res.status(200).json({ results: results, isCorreto: "se fodeu" });
    }

});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});