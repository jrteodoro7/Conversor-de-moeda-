document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar elementos do DOM
    const amountInput = document.getElementById('amount');
    const currencyToSelect = document.getElementById('currencyTo');
    const convertButton = document.getElementById('convertButton');
    const resultArea = document.getElementById('resultArea');

    // Chave de API extraída do seu print
    const API_KEY = '6f82dd0ec8b67bc0fe563c50'; 

    // Função principal que faz a conversão
    async function convertCurrency() {
        const amount = amountInput.value;
        const currencyTo = currencyToSelect.value;
        const currencyFrom = 'BRL'; // Nossa moeda base é sempre o Real

        if (amount <= 0 || isNaN(amount)) {
            resultArea.textContent = 'Por favor, insira um valor válido.';
            return;
        }

        resultArea.textContent = 'Carregando cotação...';

        try {
            // URL da API usando sua chave
            const response = await fetch(`v6.exchangerate-api.com{API_KEY}/latest/${currencyFrom}`);
            
            if (!response.ok) {
                // Se a API retornar um erro (ex: 403 Forbidden se a chave for inválida)
                throw new Error(`Erro de comunicação com a API: ${response.status}. Verifique se a chave está ativa.`);
            }

            const data = await response.json();

            // A nova API retorna um objeto de taxas (conversion_rates)
            const rate = data.conversion_rates[currencyTo]; 

            if (!rate) {
                throw new Error(`Cotação para ${currencyTo} não encontrada.`);
            }

            const convertedAmount = amount * rate;
            resultArea.textContent = `Resultado: ${convertedAmount.toFixed(2)} ${currencyTo}`;

        } catch (error) {
            console.error(error);
            resultArea.textContent = `Falha na conversão: ${error.message}`;
        }
    }

    convertButton.addEventListener('click', convertCurrency);
    convertCurrency();
});