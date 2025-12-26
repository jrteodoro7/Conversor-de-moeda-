document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const currencyToSelect = document.getElementById('currencyTo');
    const convertButton = document.getElementById('convertButton');
    const resultArea = document.getElementById('resultArea');


    const API_BASE_URL = 'economia.awesomeapi.com.br';

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

            const response = await fetch(`${API_BASE_URL}${currencyFrom}-${currencyTo}`);
            
            if (!response.ok) {
               
                throw new Error(`O servidor retornou um status: ${response.status}. Verifique se as moedas selecionadas são válidas.`);
            }

            const data = await response.json();
            const currencyKey = `${currencyFrom}${currencyTo}`; 
            const rate = parseFloat(data[currencyKey].high); 

            const convertedAmount = amount * rate;
            resultArea.textContent = `Resultado: ${convertedAmount.toFixed(2)} ${currencyTo}`;

        } catch (error) {
            console.error(error); 

            resultArea.textContent = `Falha na conversão. Tente novamente mais tarde.`;
        }
    }

    convertButton.addEventListener('click', convertCurrency);
    

    convertCurrency(); 
});