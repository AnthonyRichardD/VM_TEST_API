const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const performance = require('performance-now'); // Importe o módulo performance-now
const tests = require('./testes/testes')


app.use(cors());
app.use(express.json());

app.post('/teste', async (req, res) => {
    const start = performance(); 

    const stringParam = req.body.stringParam;
    console.log(stringParam);
    const results = await tests.executarTestes(stringParam);

    let isCorreto = true;

    if (results.failed > 0) {
        isCorreto = false
    }

    
    const end = performance();
    const executionTime = end - start; 
    const executionTimeInt = `${Math.floor(executionTime)}ms`

    if (isCorreto) {
        res.status(200).json({ results: results.resultados, isCorreto: true, totalExecutionTime: executionTimeInt, failed: results.failed, passed: results.passed });
    } else {
        res.status(200).json({ results: results.resultados, isCorreto: false, totalExecutionTime: executionTimeInt, failed: results.failed, passed: results.passed });
    }

});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});