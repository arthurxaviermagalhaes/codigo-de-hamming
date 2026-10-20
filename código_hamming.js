const regexBinario = /^[01]+$/;
let codigoOriginal = "";

// Loop para realizar a validação da entrada (garante que sejam apenas 0s e 1s)
do {
    codigoOriginal = prompt("Digite o código original:");

    if (codigoOriginal) {
        codigoOriginal = codigoOriginal.trim();
    }

    if (!regexBinario.test(codigoOriginal)) {
        console.log("Entrada inválida, digite o código novamente.");
    }
} while (!regexBinario.test(codigoOriginal));

function estruturarCodigoHamming(){
    const n = codigoOriginal.length;
    let k = 0;

    // Calculando a quantidade de bits de paridade necessários
    while (Math.pow(2, k) < k + n + 1){
        k++;
    }

    // Definindo um array para definir as posições dos bits de paridade 
    let tamanhoTotal = n + k; // Tamanho do código será sempre n + k !!
    let hamming = new Array(tamanhoTotal + 1).fill(null);
    let indiceDado = 0;

    // Inserindo os bits de dados nas posições que não são potências de 2
    for (let i = 1; i <= tamanhoTotal; i++) {
        // Verifica se 'i' não é uma potência de 2 usando operação bitwise
        if ((i & (i - 1)) !== 0) {
            if (indiceDado < n) {
                hamming[i] = parseInt(codigoOriginal[indiceDado], 10);
                indiceDado++;
            }
        }
    }

    console.log("\nVisualização dos Bits de Paridade");

    // Calculando os bits de paridade que ficarão nas posições que são potências de 2
    for (let i = 0; i < k; i++) {
        let posicaoParidade = Math.pow(2, i);
        let contador = 0; // Contador para estabelecer a soma dos bits de dados e qual o valor que cada paridade vai receber

        for (let j = 1; j <= tamanhoTotal; j++) {
            // Verifica se a posição 'j' participa do grupo de paridade atual e não é nula
            if ((j & posicaoParidade) !== 0 && hamming[j] !== null && j !== posicaoParidade) {
                if (hamming[j] === 1) {
                    contador++;
                }
            }
        }
        // Define o bit de paridade (0 se a quantidade de 1s for par, 1 se for ímpar)
        hamming[posicaoParidade] = contador % 2;
        
        // Exibição individual da visualização de cada bit de paridade calculado
        console.log(`Posição 2^${i} (Índice ${posicaoParidade}): Bit de Paridade = ${hamming[posicaoParidade]}`);
    }

    // Método slice() para retirar o índice 0 e join() para criar espaços visuais
    let codigoHammingFinal = hamming.slice(1).join("");

    // Exibindo os resultados iniciais no console
    console.log(`\nCódigo Original: ${codigoOriginal}`);
    console.log(`Quantidade de bits de paridade: ${k}`);
    console.log(`Código de Hamming Final: ${codigoHammingFinal}`);

    // Simulação de Erro e Correção

    let desejaSimular = prompt("Deseja simular um erro na transmissão? (Digite 'sim' ou pressione OK para continuar)");

    if (desejaSimular !== null && desejaSimular.trim().toLowerCase() !== "nao" && desejaSimular.trim().toLowerCase() !== "não") {
        let codigoCorrompido = "";
        
        // Loop para inserir o novo código garantindo binário válido e o mesmo tamanho
        do {
            codigoCorrompido = prompt(`Insira o código corrompido em binário (deve ter exatamente ${codigoHammingFinal.length} caracteres):`);
            
            if (codigoCorrompido) {
                codigoCorrompido = codigoCorrompido.trim();
            }

            if (!regexBinario.test(codigoCorrompido) || codigoCorrompido.length !== codigoHammingFinal.length) {
                console.log("Entrada inválida! O código deve conter apenas 0s e 1s e possuir o mesmo tamanho do código original de Hamming.");
            }
        } while (!regexBinario.test(codigoCorrompido) || codigoCorrompido.length !== codigoHammingFinal.length);

        console.log("\nSimulação de Transmissão com Erro");
        console.log(`Código de Hamming Original: ${codigoHammingFinal}`);
        console.log(`Código Corrompido Inserido: ${codigoCorrompido}`);

        // Transformando o código corrompido em um array com índice 1 base
        let hammingCorrompido = [null, ...codigoCorrompido.split('').map(Number)];
        let posicaoErro = 0;

        // Calculando a síndrome para detectar a posição do erro
        for (let i = 0; i < k; i++) {
            let posicaoParidade = Math.pow(2, i);
            let contador = 0;

            for (let j = 1; j <= tamanhoTotal; j++) {
                if ((j & posicaoParidade) !== 0 && j !== posicaoParidade) {
                    if (hammingCorrompido[j] === 1) {
                        contador++;
                    }
                }
            }

            // Verifica se o bit de paridade atual diverge do esperado
            let bitCalculado = contador % 2;
            if (bitCalculado !== hammingCorrompido[posicaoParidade]) {
                posicaoErro += posicaoParidade;
            }
        }

        console.log("\nDetecção e Correção de Erros");
        if (posicaoErro === 0) {
            console.log("Nenhum erro foi detectado no código corrompido inserido.");
        } else {
            console.log(`Erro detectado na posição (índice): ${posicaoErro}`);

            // Corrigindo o bit na posição do erro (inverte 0 para 1 ou 1 para 0)
            hammingCorrompido[posicaoErro] = hammingCorrompido[posicaoErro] === 1 ? 0 : 1;

            let codigoCorrigidoFinal = hammingCorrompido.slice(1).join("");
            console.log(`Código Corrigido: ${codigoCorrigidoFinal}`);
        }
    } else {
        console.log("\nSimulação de erro ignorada pelo usuário.");
    }

    return codigoHammingFinal;
}

estruturarCodigoHamming();
