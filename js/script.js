const app = new PIXI.Application({ backgroundAlpha: '0' });
document.body.appendChild(app.view);

const containerGame = new PIXI.Container();

app.stage.addChild(containerGame);

const markX1 = PIXI.Texture.from('./img/x.png');
const markX2 = PIXI.Sprite.from(markX1);
const markBola = PIXI.Sprite.from('/img/bola.png');
// markX.anchor.set(0.5);
markBola.anchor.set(0.5)

let arrayGraphics = [];
let size = 100;
let qnt = Array(9);
let tampao = Array(16);

// Troca a vez de um jogador para outro
let swapS = true;

// Combinações possível para ganhar o jogo
const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let altCardX = [-200, -100, 0, 100, 200, 200, 200, 200, 200, 100, 0, -100, -200, -200, -200, -200];
let altCardY = [-200, -200, -200, -200, -200, -100, 0, 100, 200, 200, 200, 200, 200, 100, 0, -100];

// Function Rectangle - Posicionamento dos cards
for (i = 0; i < qnt.length; i++) {
    const graphics1 = new PIXI.Graphics();
    graphics1.beginFill(0x8D8C8C);
    //  graphics1.beginTextureFill({texture: markX2.texture});
    graphics1.lineStyle(5, 0x1a1a1a, 1);
    graphics1.drawRect(
        (i === 0 || i === 3 || i === 6 ?
            ((app.screen.width / 2) - (size / 2) - size) :
            i === 1 || i === 4 || i === 7 ?
                (app.screen.width / 2) - (size / 2) :
                (app.screen.width / 2) - (size / 2) + size),

        arrayGraphics.length >= 3 && arrayGraphics.length <= 5 ?
            ((app.screen.height / 2) - (size / 2)) :
            i >= 6 ?
                ((app.screen.height / 2) - (size / 2) + size) :
                ((app.screen.height / 2) - (size / 2) - size),
        size,
        size
    );
    graphics1.endFill();
    graphics1.cursor = 'pointer';
    graphics1.interactive = true;
    containerGame.addChild(graphics1);
    arrayGraphics.push(graphics1);

    graphics1.name = i;

    // Ao clicar...
    graphics1.on('pointerdown', () => {
        marcar(graphics1);
    });
}

for (i = 0; i < tampao.length; i++) {
    const graphics2 = new PIXI.Graphics();
    graphics2.beginFill(0x8D8C8C);
    //  graphics1.beginTextureFill({texture: markX2.texture});
    graphics2.lineStyle(5, 0x8D8C8C, 1);
    graphics2.drawRect(
        ((app.screen.width / 2) - (size / 2) - altCardX[i]),
        ((app.screen.height / 2) - (size / 2) - altCardY[i]),
        size,
        size
    );
    graphics2.endFill();
    containerGame.addChild(graphics2);
}

const basicText = new PIXI.Text(`Vez do ${swapS === true ? 'verde' : 'vermelho'}`);
basicText.x = (app.screen.width / 2);
basicText.y = (app.screen.height / 2 - 200);
basicText.anchor.set(0.5, 0.5);
containerGame.addChild(basicText);

function marcar(graphics) {
    // Troca de cores/simbolos
    graphics.tint = swapS ? '0x00ff00' : '0xff0000';
    console.log(graphics);

    // Desativa click
    graphics.interactive = false;

    // Pega o Array qnt e preenche com 'xis' e 'bola' nos devidos posicionamentos
    qnt[graphics.name] = swapS ? 'verde' : 'vermelho'

    let resultado = conferir("verde") || conferir("vermelho");

    if (resultado) {
        basicText.text = resultado.mensagem;
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    // Intercala a vez
    swapS = !swapS;
    
}

function conferir(jogador) {
    let jogadas = qnt.reduce((arrayJogadas, elemento, indice) => {
        if (elemento == jogador) {
            return arrayJogadas.concat(indice);
        }
        else {
            return arrayJogadas;
        }
    }, []);

    // Itera o Array 'combinacoes' e passa por cada elemento
    for (combinacao of combinacoes) {
        // Every - Passa por todos os elementos para cumprir a condicional - boolean
        let ganhou = combinacao.every(elemento => {
            // Includes - Verifica se o elemento contém no Array - boolean
            return jogadas.includes(elemento);
        })

        if (ganhou) {
            return {
                combinacao,
                mensagem: `O jogador ${jogador} ganhou!`,
            }
        }

        if (!qnt.includes(undefined) && jogadas.length === 4) {
            return {
                mensagem: `Empate!`
            }
        }

        if (qnt.includes(undefined)){
            basicText.text = `Vez do ${swapS === false ? 'verde' : 'vermelho'}`;
        }
    }

}