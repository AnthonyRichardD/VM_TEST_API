const vm = require('vm');
const getFunctionName = require('../src/getFunctionName');

const somaTestes = [
  {
    description: 'Somar 10 + 5',
    inputs: "(10, 5)",
    expected: 15
  },
  {
    description: 'Somar 25 + 15',
    inputs: "(25, 15)",
    expected: 40,
  },
  {
    description: 'Somar 6 + 7',
    inputs: "(6, 7)",
    expected: 13
  },
]

async function executarTestes(userCode) {

  const resultados = [];
  const functionName = await getFunctionName(userCode)

  if (functionName != null) {

    let passed = 0;
    let failed = 0;

    for (const teste of somaTestes) {
      const context = {};
      const changedCode = userCode + `\n ${functionName}${teste.inputs}`;

      try {
        vm.createContext(context);

        const startTime = process.hrtime();

        const result = vm.runInContext(changedCode, context);

        const finishTime = process.hrtime(startTime);
        const tempoExecucaoMs = Math.round(finishTime[0] * 1000 + finishTime[1] / 1e6)

        if (result == teste.expected) {
          passed += 1;
          resultados.push({
            description: teste.description,
            result: result,
            approved: true,
            tempoExecucaoMs: tempoExecucaoMs
          });
        } else {
          failed += 1;
          resultados.push({
            description: teste.description,
            result: result,
            approved: false,
            tempoExecucaoMs: tempoExecucaoMs
          });
        }

      } catch (error) {
        resultados.push({
          description: teste.description,
          approved: false,
          result: 'Erro na execução',
        });
      }
    }
    return { resultados: resultados, passed: passed, failed: failed };
  }
  else {
    return "ei boy, tua função ta feia!!"
  }
}

module.exports = { executarTestes };