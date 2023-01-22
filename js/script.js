const app = new PIXI.Application({ backgroundAlpha: '0' });
document.body.appendChild(app.view);

const containerGame = new PIXI.Container();

app.stage.addChild(containerGame);

let arrayGraphics = [];
let size = 100;
let qnt = Array(9);

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

// Function Rectangle - Posicionamento dos cards
for (i = 0; i < qnt.length; i++) {
    const graphics1 = new PIXI.Graphics();
    graphics1.beginFill(0x8D8C8C);
    graphics1.lineStyle(5, 0x1a1a1a, 1);
    graphics1.drawRect(
        (i === 0 || i === 3 || i === 6 ?
            ((app.screen.width / 2) - (size / 2) - 100) :
            i === 1 || i === 4 || i === 7 ?
                (app.screen.width / 2) - (size / 2) :
                (app.screen.width / 2) - (size / 2) + 100),

        arrayGraphics.length >= 3 && arrayGraphics.length <= 5 ?
            ((app.screen.height / 2) - (size / 2)) :
            i >= 6 ?
                ((app.screen.height / 2) - (size / 2) + 100) :
                ((app.screen.height / 2) - (size / 2) - 100),
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
        // console.log(graphics1.name)
        marcar(graphics1);
    });
}

function marcar(graphics) {
    // Troca de cores/simbolos
    graphics.tint = swapS ? '0x00ff00' : '0xff0000';

    // Desativa click
    graphics.interactive = false;

    // Pega o Array qnt e preenche com 'xis' e 'bola' nos devidos posicionamentos
    qnt[graphics.name] = swapS ? 'xis' : 'bola'

    let resultado = conferir("xis") || conferir("bola");

    if (resultado) {
        alert(resultado.mensagem);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
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

    console.log(jogadas);

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
                mensagem: `O jogador ${jogador} ganhou!`
            }
        }
        if (jogadas.length >= 5) {
            return {
                mensagem: `Empate!`
            }
        }
    }
}