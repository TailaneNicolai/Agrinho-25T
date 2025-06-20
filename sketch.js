// Código p5.js: Jogo de tabuleiro entre Agricultor e Empresário

let posAgricultor = 0;
let posEmpresario = 0;
let currentPlayer = 1; // 1 = Empresário, 2 = Agricultor
let gameState = 'jogando';
let timer;
let timeLimit = 35;

let feedbackMessage = ""; // Mensagem de feedback para o jogador
let feedbackTimeout;

// Perguntas específicas para as casas
let perguntas = [
  {
    pergunta: "Qual é o principal produto agrícola do Brasil?",
    opcoes: ["Café", "Soja", "Algodão"],
    resposta: 1
  },
  {
    pergunta: "Qual é a sequência correta de cultivo em uma rotação?",
    opcoes: ["Milho, Trigo, Soja", "Soja, Milho, Algodão", "Trigo, Feijão, Milho"],
    resposta: 0
  },
  {
    pergunta: "O que caracteriza a agricultura familiar?",
    opcoes: ["Uso de tecnologia", "Produção para o mercado", "Produção para o consumo próprio"],
    resposta: 2
  },
  {
    pergunta: "Qual é a função principal das áreas verdes nas cidades?",
    opcoes: ["Estacionamento", "Recreação", "Comércio"],
    resposta: 1
  },
  {
    pergunta: "O que caracteriza um bairro residencial?",
    opcoes: ["Muitas lojas", "Casas e apartamentos", "Indústrias"],
    resposta: 1
  },
  {
    pergunta: "O que são transportes públicos?",
    opcoes: ["Carros particulares", "Ônibus e trens", "Bicicletas"],
    resposta: 1
  },
  {
    pergunta: "Qual é uma característica de uma cidade sustentável?",
    opcoes: ["Poluição alta", "Uso de energia renovável", "Desmatamento"],
    resposta: 1
  },
  {
    pergunta: "O que é um centro comercial?",
    opcoes: ["Área de lazer", "Conjunto de lojas", "Escola"],
    resposta: 1
  },
  {
    pergunta: "Qual é a função de uma praça na cidade?",
    opcoes: ["Aumentar o tráfego", "Espaço de convivência", "Armazenar lixo"],
    resposta: 1
  },
  {
    pergunta: "O que é urbanização?",
    opcoes: ["Aumento do espaço rural", "Redução da população", "Crescimento das cidades"],
    resposta: 2
  },
  {
    pergunta: "Um exemplo de poluição urbana?",
    opcoes: ["Barulho", "Flores", "Águas limpas"],
    resposta: 0
  },
  {
    pergunta: "O que são favelas?",
    opcoes: ["Comunidades carentes", "Áreas de luxo", "Parques"],
    resposta: 0
  },
  {
    pergunta: "Qual a vantagem do transporte coletivo?",
    opcoes: ["Mais carros nas ruas", "Aumento da poluição", "Redução de tráfego"],
    resposta: 2
  },
  // Perguntas sobre o espaço rural
  {
    pergunta: "Qual é a principal atividade econômica no espaço rural?",
    opcoes: ["Agricultura", "Indústria", "Comércio"],
    resposta: 0
  },
  {
    pergunta: "O que é uma propriedade rural?",
    opcoes: ["Casa na cidade", "Loja", "Fazenda ou sítio"],
    resposta: 2
  },
  {
    pergunta: "Qual produto é um típico da pecuária?",
    opcoes: ["Leite", "Frutas", "Pão"],
    resposta: 1
  },
  {
    pergunta: "O que caracteriza uma agricultura familiar?",
    opcoes: ["Grandes plantações", "Produção para consumo próprio", "Indústria pesada"],
    resposta: 1
  },
  {
    pergunta: "Qual é uma técnica comum de cultivo?",
    opcoes: ["Plantio direto", "Urbanização", "Transporte coletivo"],
    resposta: 0
  },
  {
    pergunta: "Qual é um benefício das roscas agrícolas?",
    opcoes: ["Reduzir a biodiversidade", "Aumentar a produção alimentar", "Poluir o solo"],
    resposta: 1
  },
  {
    pergunta: "O que é agroecologia?",
    opcoes: ["Uso de agrotóxicos", "Pecuária intensiva", "Agricultura sustentável"],
    resposta: 2
  },
  {
    pergunta: "Qual é uma atividade importante no espaço rural?",
    opcoes: ["Silvicultura", "Comércio varejista", "Construção civil"],
    resposta: 0
  },
  {
    pergunta: "O que são culturas de subsistência?",
    opcoes: ["Culturas para exportação", "Culturas industriais", "Culturas para consumo da família"],
    resposta: 2
  },
  {
    pergunta: "Qual é um exemplo de produto agrícola?",
    opcoes: ["Arroz", "Carvão", "Plástico"],
    resposta: 0
  }
];

let diceValue = 0;
let rollingDice = false;
let winner = null;

const totalCasas = 50;
const perguntasPosicoes = Array.from({ length: totalCasas }, (_, i) => (i + 1) % 5 === 0); // Casas com perguntas

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(16);
}

function draw() {
  background(220);
  
  drawBoard();
  drawTimer();
  drawFeedback(); // Chama a função para desenhar a mensagem de feedback

  if (winner !== null) {
    fill(0);
    textSize(24);
    text(`Parabéns! ${winner} ganhou um certificado de mérito e R$10.000!`, width / 2, height / 2);
    noLoop();
  }

  drawStatus();
}

function drawBoard() {
  for (let i = 0; i < totalCasas; i++) {
    let x = 50 + i * 15;
    fill(perguntasPosicoes[i] ? 'rgb(240,227,227)' : 'white');
    stroke(0);
    rect(x, height / 2 - 50, 15, 25);
    fill(0);
    text(i + 1, x + 7.5, height / 2 - 37.5);
  }

  let baseX = 50 + 7.5;

  // Agricultor
  let posAgriX = baseX + posAgricultor * 15;
  fill('green');
  rect(posAgriX - 5, height / 2 - 45, 10, 10);

  // Empresário
  let posEmpX = baseX + posEmpresario * 15;
  fill('blue');
  rect(posEmpX + 5, height / 2 - 45, 10, 10);
}

function drawStatus() {
  fill(0);
  textSize(16);
  text(`Jogador ${currentPlayer} é sua vez`, width / 2, 30);

  if (currentPlayer === 1) {
    text("Pressione 'E' para rolar o dado, Empresário", width / 2, 60);
  } else {
    text("Pressione 'A' para rolar o dado, Agricultor", width / 2, 60);
  }

  if (diceValue > 0) {
    text(`Dado: ${diceValue}`, width / 2, 90);
  }
}

function drawTimer() {
  if (gameState === 'pergunta' && timer > 0) {
    fill(0);
    textSize(24);
    text(`Tempo: ${timer} s`, width / 2, height - 30);
  }
}

function drawFeedback() {
  if (feedbackMessage) {
    fill(0);
    textSize(24);
    text(feedbackMessage, width / 2, height / 2);
  }
}

function keyPressed() {
  if (gameState !== 'jogando') return;

  if ((key === 'a' || key === 'A') && currentPlayer === 2 && !rollingDice) {
    rollingDice = true;
    rollDice();
  }

  if ((key === 'e' || key === 'E') && currentPlayer === 1 && !rollingDice) {
    rollingDice = true;
    rollDice();
  }
}

function rollDice() {
  diceValue = floor(random(1, 7));
  setTimeout(() => {
    movePlayer();
    rollingDice = false;
  }, 500);
}

function movePlayer() {
  if (currentPlayer === 1) {
    posEmpresario += diceValue;
    if (posEmpresario >= totalCasas) {
      winner = 'Empresário';
    } else {
      checkQuestion(posEmpresario);
    }
    currentPlayer = 2;
  } else {
    posAgricultor += diceValue;
    if (posAgricultor >= totalCasas) {
      winner = 'Agricultor';
    } else {
      checkQuestion(posAgricultor);
    }
    currentPlayer = 1;
  }
}

function checkQuestion(pos) {
  if (perguntas[pos]) {
    gameState = 'pergunta';
    askQuestion(pos);
  }
}

function askQuestion(pos) {
  let q = perguntas[pos]; // Pergunta específica para a casa

  timer = timeLimit;
  let timeInterval = setInterval(() => {
    timer--;
    if (timer <= 0) {
      clearInterval(timeInterval);
      gameState = 'jogando'; // Não mudar a posição
    }
  }, 1000);

  let answer = prompt(
    `${q.pergunta}\nOpções:\n0: ${q.opcoes[0]}\n1: ${q.opcoes[1]}\n2: ${q.opcoes[2]}`
  );
  answer = int(answer);

  clearInterval(timeInterval);

  if (answer === q.resposta) {
    // Mensagem de resposta correta
    feedbackMessage = "✅Parabéns, resposta correta!✅😎";
    setTimeout(() => {
      feedbackMessage = ""; // Limpa a mensagem após 0,1 segundos
    }, 8000);
    // Avança apenas o número do dado
    if (currentPlayer === 1) {
      posEmpresario += diceValue; 
    } else {
      posAgricultor += diceValue; 
    }
  } else {
    // Mensagem de resposta incorreta
    feedbackMessage = "❌Pergunta incorreta❌😢";
    setTimeout(() => {
      feedbackMessage = ""; // Limpa a mensagem após 0,1 segundos
    }, 8000);
    // Permanece na mesma casa
  }

  gameState = 'jogando';
}