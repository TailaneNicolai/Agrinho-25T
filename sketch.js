let posAgricultor = 0;
let posEmpresario = 0;
let currentPlayer = 1; // 1 = Empresário, 2 = Agricultor
let gameState = 'jogando';
let questionIndex = 0;
let timer;
let timeLimit = 35;
let timeInterval;
let activeQuestion = null;
let feedbackMessage = '';
let feedbackDuration = 0;
let victoryMessage = ''; // Mensagem de vitória

let perguntas = [
  // Espaço Rural
  {
    pergunta: "Qual o impacto da agricultura familiar na economia local?",
    opcoes: [
      "0) Gera emprego e renda",
      "1) Diminui a produção de alimentos",
      "2) Aumenta a urbanização",
    ],
    resposta: 0,
  },
  {
    pergunta: "Como a agroecologia contribui para a sustentabilidade no campo?",
    opcoes: [
      "0) Utiliza produtos químicos em larga escala",
      "1) Foca apenas na produção em grande escala",
      "2) Promove a biodiversidade e a preservação do solo",
    ],
    resposta: 2,
  },
  {
    pergunta: "Quais são os principais desafios enfrentados pelos pequenos agricultores?",
    opcoes: [
      "0) Acesso a crédito e tecnologias",
      "1) Excesso de terras disponíveis",
      "2) Baixa demanda por produtos rurais",
    ],
    resposta: 0,
  },
  {
    pergunta: "Qual é a importância da irrigação na agricultura moderna?",
    opcoes: [
      "0) Aumenta o consumo de água",
      "1) Permite o cultivo em regiões áridas",
      "2) Reduz a variedade de culturas",
    ],
    resposta: 1,
  },
  {
    pergunta: "Como as mudanças climáticas afetam a produção agrícola?",
    opcoes: [
      "0) Aumentam a produtividade de todas as culturas",
      "1) Podem causar secas e inundações, afetando as colheitas",
      "2) Não têm impacto significativo na agricultura",
    ],
    resposta: 1,
  },
  {
    pergunta: "Qual é o papel das cooperativas na agricultura?",
    opcoes: [
      "0) Facilitar a compra e venda de produtos, aumentando a renda dos associados",
      "1) Promover a competição entre os agricultores",
      "2) Reduzir a qualidade dos produtos agrícolas",
    ],
    resposta: 0,
  },
  {
    pergunta: "O que caracteriza a agricultura de precisão?",
    opcoes: [
      "0) Uso de técnicas tradicionais sem tecnologia",
      "1) Cultivo em grandes extensões sem monitoramento",
      "2) Aplicação de insumos com base em dados e informações geográficas",
    ],
    resposta: 2,
  },
  {
    pergunta: "Como a rotação de culturas contribui para a saúde do solo?",
    opcoes: [
      "0) Reduz a diversidade de nutrientes",
      "1) Aumenta a dependência de fertilizantes químicos",
      "2) Previne o esgotamento do solo e controla pragas",
    ],
    resposta: 2,
  },
  {
    pergunta: "Quais são as consequências da monocultura?",
    opcoes: [
      "0) Aumento da biodiversidade",
      "1) Maior vulnerabilidade a pragas e doenças",
      "2) Melhoria da qualidade do solo",
    ],
    resposta: 1,
  },
  {
    pergunta: "Qual é o impacto da tecnologia na produção agrícola?",
    opcoes: [
      "0) Diminui a eficiência dos agricultores",
      "1) Melhora a produtividade e a gestão de recursos",
      "2) Aumenta a dependência de mão de obra",
    ],
    resposta: 1,
  },
  // Espaço Urbano
  {
    pergunta: "Qual é a principal característica do espaço urbano?",
    opcoes: [
      "0) Alta densidade populacional",
      "1) Baixa densidade populacional",
      "2) Muitas áreas verdes",
    ],
    resposta: 0,
  },
  {
    pergunta: "Qual é a função principal de um centro comercial?",
    opcoes: [
      "0) Produção agrícola",
      "1) Educação",
      "2) Vendas e compras",
    ],
    resposta: 2,
  },
  {
    pergunta: "O que caracteriza o transporte público urbano?",
    opcoes: [
      "0) Carros particulares",
      "1) Bicicletas",
      "2) Ônibus e metrô",
    ],
    resposta: 2,
  },
  {
    pergunta: "Qual é um problema comum nas cidades grandes?",
    opcoes: [
      "0) Baixa poluição",
      "1) Trânsito intenso",
      "2) Pouca população",
    ],
    resposta: 1,
  },
  {
    pergunta: "Qual tipo de habitação é mais comum em áreas urbanas?",
    opcoes: [
      "0) Sítio",
      "1) Apartamento",
      "2) Chácara",
    ],
    resposta: 1,
  },
  {
    pergunta: "O que é uma área de lazer?",
    opcoes: [
      "0) Um espaço para diversão",
      "1) Um lugar para trabalho",
      "2) Um mercado",
    ],
    resposta: 0,
  },
  {
    pergunta: "Qual é um dos principais desafios nas cidades?",
    opcoes: [
      "0) Baixa criminalidade",
      "1) Acesso a serviços públicos",
      "2) Trânsito e poluição",
    ],
    resposta: 2,
  },
  {
    pergunta: "Qual é um evento comum em áreas urbanas?",
    opcoes: [
      "0) Festejos rurais",
      "1) Shows e concertos",
      "2) Feiras de produtos agrícolas",
    ],
    resposta: 1,
  },
  {
    pergunta: "O que são zonas comerciais?",
    opcoes: [
      "0) Áreas para cultivo",
      "1) Espaços residenciais",
      "2) Regiões com lojas e serviços"
    ],
    resposta: 2,
  },
  {
    pergunta: "Qual é uma forma de reduzir a poluição nas cidades?",
    opcoes: [
      "0) Aumentar o uso de carros",
      "1) Incentivar o transporte público",
      "2) Construir mais fábricas",
    ],
    resposta: 1,
  },
];

const totalCasas = 51;
const perguntasPosicoes = [0, 3, 5, 8, 10, 13, 15, 18, 20, 23, 25, 28, 30, 33, 35, 38, 40, 43, 45, 48]; // Casas para perguntas

function setup() {
  createCanvas(1080, 600);
  textAlign(CENTER, CENTER);
  textFont('Arial');
}

function draw() {
  background(240);
  drawBoard();
  drawStatusPanel();
  drawTimer();
  
  if (gameState === 'pergunta') {
    drawQuestionOverlay();
    highlightSelectedOption();
  }
  
  if (feedbackDuration > 0) {
    fill(0, 255, 0);
    textSize(24);
    text(feedbackMessage, width / 2, height / 2 + 100);
    feedbackDuration--;
  }

  // Exibir mensagem de vitória
  if (victoryMessage) {
    fill(0, 255, 0);
    textSize(32);
    text(victoryMessage, width / 2, height / 2);
  }
}

function drawBoard() {
  // Fundo do tabuleiro com gradiente
  noStroke();
  for (let y = height / 2 - 100; y < height / 2 + 50; y++) {
    let inter = map(y, height / 2 - 100, height / 2 + 50, 0, 1);
    let c = lerpColor(color('#8BC34A'), color('#5a9c3e'), inter);
    fill(c);
    rect(30, y, width - 47, 1);
  }
  
  // Borda decorativa
  fill(0, 0, 0, 0);
  stroke('#5a7e3e');
  strokeWeight(4);
  rect(30, height / 2 - 100, width - 45, 150, 15);
  
  // Casas do tabuleiro
  for (let i = 0; i < totalCasas; i++) {
    let x = 40 + i * 20;
    let y = height / 2 - 50;
    
    // Estilo da casa
    if (i === 0) {
      fill('#4CAF50'); // Casa inicial (verde)
    } else if (perguntasPosicoes.includes(i)) {
      fill('#FFA500'); // Casas de pergunta (laranja)
    } else {
      fill(255); // Casas normais (branco)
    }
    
    // Sombra
    drawingContext.shadowBlur = 5;
    drawingContext.shadowColor = 'rgba(0,0,0,0.2)';
    
    // Desenha casa
    stroke(0);
    strokeWeight(0.5);
    rect(x, y, 18, 40, 5);
    
    // Número
    fill(0);
    noStroke();
    textSize(i === 0 ? 9 : 10);
    text(i === 0 ? "" : i, x + 9, y + 20);
    
    drawingContext.shadowBlur = 0;
  }
  
  // Peças dos jogadores
  drawPlayers();
}

function drawPlayers() {
  // Agricultor (peça marrom)
  drawPlayer(posAgricultor, '#795548', 3, 'A');
  
  // Empresário (peça azul)
  drawPlayer(posEmpresario, '#2196F3', 27, 'E');
}

function drawPlayer(position, color, offsetY, initial) {
  let x = 50 + position * 20 + -1;
  let y = height / 2 - 45 + offsetY;
  
  // Sombra
  drawingContext.shadowBlur = 10;
  drawingContext.shadowColor = color;
  
  // Peça circular
  fill(color);
  ellipse(x, y, 16, 16);
  
  // Inicial do jogador
  fill(255);
  textSize(13);
  text(initial, x, y + 1);
  
  drawingContext.shadowBlur = 0;
}

function drawStatusPanel() {
  // Painel de fundo
  fill(255);
  stroke('#333');
  strokeWeight(1);
  rect(20, 20, width - 40, 80, 10);
  
  // Texto do status
  fill('#333');
  textSize(24);
  text(`Vez do ${currentPlayer === 1 ? 'Empresário' : 'Agricultor'}`, width / 2, 50);
  
  // Instruções
  textSize(16);
  if (currentPlayer === 1) {
    text("Pressione 'E' para rolar o dado", width / 2, 80);
  } else {
    text("Pressione 'A' para rolar o dado", width / 2, 80);
  }
}

function drawTimer() {
  if (gameState === 'pergunta' && timer > 0) {
    fill(200);
    noStroke();
    rect(width / 2 - 150, height - 50, 300, 20, 10);
    
    let w = map(timer, 0, timeLimit, 0, 300);
    fill(255 - timer * 7, timer * 7, 0);
    rect(width / 2 - 150, height - 50, w, 20, 10);
    
    fill(0);
    textSize(16);
    text(`${timer} segundos`, width / 2, height - 40);
  }
}

function drawQuestionOverlay() {
  fill(0, 0, 0, 150);
  rect(0, 0, width, height);
  
  fill(255);
  stroke('#333');
  strokeWeight(2);
  rect(width / 2 - 250, height / 2 - 150, 500, 400, 20);
  
  fill('#333');
  textSize(18);
  text(activeQuestion.pergunta, width / 2, height / 2 - 130);
  
  textSize(16);
  for (let i = 0; i < activeQuestion.opcoes.length; i++) {
    let optionY = height / 2 - 15 + i * 60;
    fill(i === selectedOption ? 200 : 240);
    rect(width / 2 - 120, optionY, 240, 40, 5);
    
    fill('#333');
    text(activeQuestion.opcoes[i], width / 2, optionY + 20);
  }
}

function highlightSelectedOption() {
  if (selectedOption >= 0) {
    let optionY = height / 2 - 15 + selectedOption * 60;
    fill(200, 230, 255);
    rect(width / 2 - 120, optionY, 240, 40, 5);
    fill('#333');
    textAlign(LEFT, CENTER);
    text(activeQuestion.opcoes[selectedOption], width / 2 - 110, optionY + 20);
    textAlign(CENTER, CENTER);
  }
}

function keyPressed() {
  if (gameState === 'jogando') {
    if ((key === 'e' || key === 'E') && currentPlayer === 1) {
      rollDice();
    } else if ((key === 'a' || key === 'A') && currentPlayer === 2) {
      rollDice();
    }
  } else if (gameState === 'pergunta') {
    if (key === '0') {
      selectedOption = 0;
      setTimeout(() => handleQuestionAnswer(0), 100);
    } else if (key === '1') {
      selectedOption = 1;
      setTimeout(() => handleQuestionAnswer(1), 100);
    } else if (key === '2') {
      selectedOption = 2;
      setTimeout(() => handleQuestionAnswer(2), 100);
    } else if (key === 'Enter' && selectedOption >= 0) {
      handleQuestionAnswer(selectedOption);
    }
    return false;
  }
  return true;
}

function rollDice() {
  let diceValue = floor(random(1, 7));
  
  if (currentPlayer === 1) {
    posEmpresario += diceValue;
    if (posEmpresario >= totalCasas) {
      posEmpresario = totalCasas - 1; // Limite do tabuleiro
    }
    checkQuestion(posEmpresario);
  } else {
    posAgricultor += diceValue;
    if (posAgricultor >= totalCasas) {
      posAgricultor = totalCasas - 1; // Limite do tabuleiro
    }
    checkQuestion(posAgricultor);
  }
  
  currentPlayer = currentPlayer === 1 ? 2 : 1; // Troca de jogador
}

function checkQuestion(pos) {
  if (perguntasPosicoes.includes(pos)) {
    gameState = 'pergunta';
    activeQuestion = perguntas[perguntasPosicoes.indexOf(pos)]; // Pega a pergunta correspondente
    askQuestion();
  } else if (pos === 50) {
    // Mensagem de vitória se chegar à casa 50
    if (currentPlayer === 1) {
      victoryMessage = "Parabéns😄! Ganhou uma empresa de trator, R$ 10.000 reais.";
    } else {
      victoryMessage = "Parabéns😁! Ganhou um trator, R$ 10.000 reais.";
    }
    noLoop(); // Para o jogo
  }
}

function askQuestion() {
  timer = timeLimit;
  selectedOption = -1;
  timeInterval = setInterval(() => {
    timer--;
    if (timer <= 0) {
      clearInterval(timeInterval);
      handleWrongAnswer();
      gameState = 'jogando';
    }
  }, 1000);
}

function handleQuestionAnswer(answer) {
  clearInterval(timeInterval);
  
  if (answer === activeQuestion.resposta) {
    feedbackMessage = "✅ Parabéns, resposta correta! ✅😎";
    feedbackDuration = 60; // Durar 1 segundo
  } else {
    feedbackMessage = "❌ Pergunta incorreta ❌😢";
    feedbackDuration = 60; // Durar 1 segundo
    if (currentPlayer === 1) {
      posEmpresario = max(0, posEmpresario - 2);
    } else {
      posAgricultor = max(0, posAgricultor - 2);
    }
  }
  
  questionIndex++;
  gameState = 'jogando';
}

function handleWrongAnswer() {
  if (currentPlayer === 1) {
    posEmpresario = max(0, posEmpresario - 2);
  } else {
    posAgricultor = max(0, posAgricultor - 2);
  }
}