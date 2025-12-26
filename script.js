document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const currencyToSelect = document.getElementById('currencyTo');
    const convertButton = document.getElementById('convertButton');
    const resultArea = document.getElementById('resultArea');

    // Usaremos uma API pública alternativa do AwesomeAPI
    const API_URL = 'economia.awesomeapi.com.br';

    async function convertCurrency() {
        const amount = amountInput.value;
        const currencyTo = currencyToSelect.value;
        const currencyFrom = 'BRL';

        if (amount <= 0 || isNaN(amount)) {
            resultArea.textContent = 'Por favor, insira um valor válido.';
            return;
        }

        resultArea.textContent = 'Carregando cotação...';

        try {
            // A URL completa será algo como: economia.awesomeapi.com.brUSD
            const response = await fetch(`${API_URL}${currencyTo}`);
            
            if (!response.ok) {
                throw new Error(`Erro de rede: ${response.status}. Servidor pode estar instável.`);
            }

            const data = await response.json();
            // A chave do objeto retornado é dinâmica (ex: 'BRLUSD')
            const currencyKey = `${currencyFrom}${currencyTo}`; 
            const rate = parseFloat(data[currencyKey].high); // Pegar o valor da cotação

            const convertedAmount = amount * rate;
            resultArea.textContent = `Resultado: ${convertedAmount.toFixed(2)} ${currencyTo}`;

        } catch (error) {
            console.error(error);
            resultArea.textContent = `Falha na conversão: ${error.message}`;
        }
    }

    convertButton.addEventListener('click', convertCurrency);
    // Chama a função uma vez ao carregar a página
    convertCurrency(); 
});