# Simulador de Código de Hamming em JavaScript

> Uma implementação em JavaScript puro (Vanilla JS) do **Código de Hamming (7,4 e genérico)** para detecção e correção de erros em transmissões de dados binários.

## Sobre o Projeto

Este projeto tem como objetivo demonstrar de forma prática o funcionamento do **Código de Hamming**, um algoritmo clássico de controle de erros utilizado em redes de computadores e sistemas de armazenamento. 

O script interage com o usuário via navegador (`prompt` / `console`), permitindo inserir uma sequência binária original, calcular automaticamente os bits de paridade necessários, estruturar a palavra de Hamming e, opcionalmente, **simular um erro de transmissão** para testar a capacidade do algoritmo de detectar a posição exata da falha e corrigi-la.

## Funcionalidades

- **Validação de Entrada:** Garante que o usuário insira apenas caracteres binários válidos (`0` e `1`).
- **Cálculo Automático de Paridade:** Determina dinamicamente a quantidade de bits de paridade ($k$) necessários com base no tamanho da mensagem ($n$).
- **Geração do Código de Hamming:** Insere os bits de dados nas posições que não são potências de 2 e calcula os valores dos bits de paridade utilizando lógica bitwise.
- **Simulação de Erros:** Permite simular um cenário real de ruído em transmissão, onde um bit pode ser corrompido.
- **Detecção e Correção (Síndrome):** Calcula a síndrome do erro para identificar a posição exata do bit corrompido e revertê-lo automaticamente.

## Tecnologias Utilizadas

- **JavaScript (ES6+)**
- Executável diretamente no ambiente do navegador (Console do Desenvolvedor) ou em Node.js (com adaptação para input/output).

## Como Executar

1. Certifique-se de ter um navegador web moderno (Chrome, Firefox, Edge, etc.).
2. Abra o **Console do Desenvolvedor** do navegador (`F12` ou `Ctrl+Shift+J` no Windows/Linux, `Cmd+Option+J` no Mac).
3. Copie todo o código contido no arquivo `hamming.js`.
4. Cole no console e pressione **Enter**.
5. Siga as instruções das janelas pop-up (`prompt`) que aparecerão na tela:
   - Digite o código binário original (ex: `1011`).
   - Decida se deseja simular um erro na transmissão.
   - Caso queira, insira uma string binária corrompida com o mesmo tamanho para ver o algoritmo agir.
6. Acompanhe os resultados detalhados impressos no console.

## Como Funciona a Lógica

1. **Posições de Paridade:** As posições correspondentes às potências de 2 ($1, 2, 4, 8, \dots$) são reservadas para os bits de paridade.
2. **Posições de Dados:** As demais posições recebem os bits da mensagem original fornecida.
3. **Cálculo de Paridade (Paridade Par/Ímpar):** Cada bit de paridade cobre um subconjunto específico de posições determinado por operações bitwise (`&`).
4. **Detecção por Síndrome:** Ao receber um dado corrompido, o algoritmo recalcula a paridade. A soma das posições de paridade que falharam aponta diretamente para o índice onde ocorreu o erro.

## Autor

Feito por **Arthur Xavier de Magalhães**. Sinta-se à vontade para contribuir, abrir *issues* ou utilizar o código para fins educacionais!

---

## Licença

Este projeto está sob a licença [MIT](LICENSE).
