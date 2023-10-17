const vm = require('vm');
const getFunctionName = require('../src/getFunctionName');

const somaTestes = [
  {
    description: 'Teste 1',
    inputs: "(10, 5)",
    expected: 15
  },
  {
    description: 'Teste 2',
    inputs: "(25, 15)",
    expected: 40,
  },
  {
    description: 'Teste 3',
    inputs: "(6, 7)",
    expected: 13
  },
]

async function executarTestes(userCode) {

  const resultados = [];
  const functionName = await getFunctionName(userCode)

  if (functionName != null) {

    for (const teste of somaTestes) {
      const context = {};
      const changedCode = userCode + `\n ${functionName}${teste.inputs}`;

      try {
        vm.createContext(context);
        const result = vm.runInContext(changedCode, context);
        if (result == teste.expected) {
          resultados.push({
            description: teste.description,
            result: result,
            approved: true,
          });
        } else {
          resultados.push({
            description: teste.description,
            result: result,
            approved: false,
          });
        }

      } catch (error) {
        resultados.push({
          description: teste.description,
          result: 'Erro na execução',
        });
      }
    }
    return resultados;
  }
  else{
    return "ei boy, tua função ta feia!!"
  }
}

module.exports = { executarTestes };