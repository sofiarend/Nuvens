

// Localiza os elementos do formulário no HTML
const formulario = document.getElementById("formQuiz");

const campoTotal = document.getElementById("totalPerguntas");

const campoAcertos = document.getElementById("acertos");

const areaResultado = document.getElementById("resultado");


function mostrarMensagem(mensagem, tipo) {

    areaResultado.textContent = mensagem;

    // Define a aparência da mensagem conforme o resultado
    areaResultado.className = tipo;

}


formulario.addEventListener("submit", function(evento) {

    // Impede que a página seja recarregada
    evento.preventDefault();

    try {

        // Captura os valores digitados
        const valorTotal = campoTotal.value.trim();

        const valorAcertos = campoAcertos.value.trim();


        // Verifica se os campos estão vazios
        if (valorTotal === "" || valorAcertos === "") {

            throw new Error("Preencha todos os campos antes de continuar.");

        }


        const total = Number(valorTotal);

        const acertos = Number(valorAcertos);


        if (!Number.isSafeInteger(total) ||
            !Number.isSafeInteger(acertos)) {

            throw new Error("Digite apenas números inteiros válidos.");

        }


        if (total <= 0) {

            throw new Error("O total de perguntas deve ser maior que zero.");

        }


        if (acertos < 0) {

            throw new Error("A quantidade de acertos não pode ser negativa.");

        }


        if (acertos > total) {

            throw new Error("A quantidade de acertos não pode ser maior que o total de perguntas.");

        }


        const porcentagem = (acertos / total) * 100;

        const resultadoFinal = porcentagem.toFixed(1);

        let desempenho;

        if (porcentagem >= 80) {

            desempenho = "Excelente! Você conhece muito bem as nuvens!";

        } else if (porcentagem >= 60) {

            desempenho = "Muito bom! Você está aprendendo bastante!";

        } else if (porcentagem >= 40) {

            desempenho = "Bom começo! Continue explorando o universo das nuvens!";

        } else {

            desempenho = "Que tal estudar mais um pouco sobre as nuvens? Você consegue!";

        }


        mostrarMensagem(
            `Você acertou ${acertos} de ${total} perguntas! Seu aproveitamento foi de ${resultadoFinal}%. ${desempenho}`,
            "sucesso"
        );

    } catch (erro) {

        mostrarMensagem(erro.message, "erro");

    }

});
