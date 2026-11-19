

/* =========================================
   CLOUD ATLAS - QUIZ INTERATIVO
   ========================================= */

// 1. BANCO DE PERGUNTAS

const perguntas = [
    {
        pergunta: "Qual tipo de nuvem possui aparência semelhante a fios ou penas?",
        alternativas: [
            "Cumulus",
            "Cirrus",
            "Stratus",
            "Cumulonimbus"
        ],
        correta: 1
    },

    {
        pergunta: "Qual nuvem está frequentemente associada a tempestades e raios?",
        alternativas: [
            "Cirrus",
            "Stratus",
            "Cumulonimbus",
            "Altocumulus"
        ],
        correta: 2
    },

    {
        pergunta: "Como as nuvens se formam?",
        alternativas: [
            "Pela evaporação das pedras",
            "Pelo resfriamento e condensação do vapor de água",
            "Pela luz do Sol",
            "Pelo movimento das árvores"
        ],
        correta: 1
    },

    {
        pergunta: "Qual tipo de nuvem forma uma camada uniforme e acinzentada?",
        alternativas: [
            "Stratus",
            "Cirrus",
            "Cumulus",
            "Altocumulus"
        ],
        correta: 0
    },

    {
        pergunta: "Qual é uma função importante das nuvens na Terra?",
        alternativas: [
            "Impedir completamente a entrada de luz solar",
            "Produzir oxigênio",
            "Participar do ciclo da água",
            "Criar os ventos"
        ],
        correta: 2
    }
];


// 2. LOCALIZANDO OS ELEMENTOS DO HTML

const progresso = document.getElementById("quizProgresso");
const perguntaTexto = document.getElementById("quizPergunta");
const alternativasArea = document.getElementById("quizAlternativas");
const botaoProxima = document.getElementById("btnProxima");
const resultado = document.getElementById("quizResultado");
const botaoReiniciar = document.getElementById("btnReiniciar");


// 3. VARIÁVEIS DO QUIZ

let perguntaAtual = 0;
let pontuacao = 0;
let respondeu = false;


// 4. FUNÇÃO PARA MOSTRAR AS PERGUNTAS

function mostrarPergunta() {

    respondeu = false;

    const pergunta = perguntas[perguntaAtual];

    // Atualiza o número da pergunta
    progresso.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    // Mostra o enunciado
    perguntaTexto.textContent = pergunta.pergunta;

    // Limpa as alternativas anteriores
    alternativasArea.replaceChildren();

    // Limpa mensagens anteriores
    resultado.textContent = "";

    // Desativa o botão até o visitante responder
    botaoProxima.disabled = true;

    // Altera o texto do botão na última pergunta
    botaoProxima.textContent =
        perguntaAtual === perguntas.length - 1
        ? "Ver resultado"
        : "Próxima pergunta";


    // Cria uma alternativa para cada resposta
    pergunta.alternativas.forEach(function(alternativa, indice) {

        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = alternativa;
        botao.classList.add("alternativa");

        // Verifica a resposta quando o botão é clicado
        botao.addEventListener("click", function() {

            verificarResposta(indice);

        });

        alternativasArea.appendChild(botao);

    });

}


// 5. FUNÇÃO PARA VERIFICAR AS RESPOSTAS

function verificarResposta(indiceEscolhido) {

    // Impede que o visitante responda mais de uma vez
    if (respondeu) {
        return;
    }

    respondeu = true;

    const pergunta = perguntas[perguntaAtual];

    const botoes = alternativasArea.querySelectorAll(".alternativa");


    // Desativa todas as alternativas
    botoes.forEach(function(botao) {

        botao.disabled = true;

    });


    // Verifica se a resposta escolhida está correta
    if (indiceEscolhido === pergunta.correta) {

        pontuacao++;

        botoes[indiceEscolhido].classList.add("correta");

        resultado.textContent = "Muito bem! Você acertou!";

    } else {

        botoes[indiceEscolhido].classList.add("incorreta");

        botoes[pergunta.correta].classList.add("correta");

        resultado.textContent =
            "Não foi dessa vez! A resposta correta está destacada em verde.";

    }


    // Libera o botão para continuar
    botaoProxima.disabled = false;

}


// 6. FUNÇÃO PARA AVANÇAR AS PERGUNTAS

function avancarQuiz() {

    if (!respondeu) {
        return;
    }

    perguntaAtual++;

    // Verifica se ainda existem perguntas
    if (perguntaAtual < perguntas.length) {

        mostrarPergunta();

    } else {

        mostrarResultado();

    }

}


// 7. FUNÇÃO PARA MOSTRAR O RESULTADO FINAL

function mostrarResultado() {

    progresso.textContent = "Quiz finalizado!";

    perguntaTexto.textContent =
        "Seu resultado no Desafio das Nuvens:";

    alternativasArea.replaceChildren();

    botaoProxima.hidden = true;

    // Calcula a porcentagem de acertos
    const porcentagem =
        (pontuacao / perguntas.length) * 100;

    let mensagem;

    if (porcentagem >= 80) {

        mensagem = "Excelente! Você conhece muito bem as nuvens!";

    } else if (porcentagem >= 60) {

        mensagem = "Muito bom! Você aprendeu bastante!";

    } else if (porcentagem >= 40) {

        mensagem = "Bom começo! Continue explorando o universo das nuvens!";

    } else {

        mensagem = "Continue estudando! Você pode melhorar ainda mais!";

    }

    // Apresenta a pontuação
    resultado.textContent =
        `Você acertou ${pontuacao} de ${perguntas.length} perguntas! ` +
        `Seu aproveitamento foi de ${porcentagem}%. ${mensagem}`;

    // Mostra o botão para refazer o quiz
    botaoReiniciar.hidden = false;

}


// 8. FUNÇÃO PARA REINICIAR O QUIZ

function reiniciarQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    respondeu = false;

    botaoProxima.hidden = false;

    botaoReiniciar.hidden = true;

    // Volta para a primeira pergunta
    mostrarPergunta();

}


// 9. EVENTOS DOS BOTÕES

botaoProxima.addEventListener("click", avancarQuiz);

botaoReiniciar.addEventListener("click", reiniciarQuiz);


// 10. INICIALIZAÇÃO DO QUIZ

try {

    // Confere se os elementos do HTML existem
    if (
        !progresso ||
        !perguntaTexto ||
        !alternativasArea ||
        !botaoProxima ||
        !resultado ||
        !botaoReiniciar
    ) {

        throw new Error(
            "Não foi possível encontrar os elementos do quiz no HTML."
        );

    }

    // Confere se existem perguntas cadastradas
    if (perguntas.length === 0) {

        throw new Error(
            "Não existem perguntas cadastradas no quiz."
        );

    }

    // Inicia o quiz
    mostrarPergunta();

} catch (erro) {

    console.error("Erro ao iniciar o quiz:", erro);

    if (resultado) {

        resultado.textContent =
            "O quiz não conseguiu iniciar. Confira a estrutura do HTML.";

    }

}

