document.addEventListener('DOMContentLoaded', () => {
    // 1. Selecionar elementos do DOM
    const amountInput = document.getElementById('amount');
    const currencyToSelect = document.getElementById('currencyTo');
    const convertButton = document.getElementById('convertButton');
    const resultArea = document.getElementById('resultArea');

    // URL da API Gratuita (AwesomeAPI)
    // Usaremos a cotação atual para BRL
    const API_URL = 'economia.awesomeapi.com.br';

    // Função principal que faz a conversão
    async function convertCurrency() {
        // Obter os valores que o usuário digitou
        const amount = amountInput.value;
        const currencyTo = currencyToSelect.value;
        const currencyFrom = 'BRL'; // Nossa moeda base é sempre o Real

        // Validar se o valor é válido
        if (amount <= 0 || isNaN(amount)) {
            resultArea.textContent = 'Por favor, insira um valor válido.';
            return;
        }

        // Mostrar mensagem de carregando
        resultArea.textContent = 'Carregando cotação...';

        try {
            // 2. Fazer a requisição para a API usando fetch e async/await
            const response = await fetch(`${API_URL}${currencyFrom}-${currencyTo}`);
            
            if (!response.ok) {
                throw new Error('Erro ao buscar cotação. Tente novamente mais tarde.');
            }

            const data = await response.json();

            // A chave do objeto retornado pela API depende das moedas escolhidas (ex: 'BRLUSD')
            const currencyKey = `${currencyFrom}${currencyTo}`;
            const rate = parseFloat(data[currencyKey].high); // Pegar o valor da cotação (compra)

            // 3. Calcular o resultado
            const convertedAmount = amount * rate;

            // 4. Exibir o resultado formatado
            resultArea.textContent = `Resultado: ${convertedAmount.toFixed(2)} ${currencyTo}`;

        } catch (error) {
            // 5. Tratar erros (mostra a importância do try/catch no currículo!)
            console.error(error);
            resultArea.textContent = error.message;
        }
    }

    // Adicionar um "ouvinte de evento" ao botão para chamar a função quando clicado
    convertButton.addEventListener('click', convertCurrency);

    // Opcional: já converte ao carregar a página
    convertCurrency();
});