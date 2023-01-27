const app = new PIXI.Application({ backgroundAlpha: '0' });
document.body.appendChild(app.view);

// ? SOUND EFFECT
const sound = PIXI.sound.Sound.from('./sound/elevador.mp3');
sound.volume = 0.05;
sound.loop = true;
sound.play();

// const startText1 = new PIXI.Text(`Começar jogo`);
// startText1.x = (app.screen.width / 2);
// startText1.y = (app.screen.height / 2);
// startText1.anchor.set(0.5);
// startText1.interactive = true;
// startText1.cursor = 'pointer';
// startText1.on('pointerdown', startFunction);
// app.stage.addChild(startText1);

const sprt1 = PIXI.Sprite.from("./img/x.png");
const sprt2 = PIXI.Sprite.from("./img/bola.png");

const cursor = PIXI.sound.Sound.from('./sound/Cursor1.ogg');
cursor.volume = 0.05;

let player1 = 0;
let player2 = 0
let swapS = true;

function startGame() {

    const containerGame = new PIXI.Container();
    app.stage.addChild(containerGame);

    let arrayGraphics = [];
    let size = 100;
    let qnt = Array(9);
    let tampao = Array(16);

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
        // graphics1.beginTextureFill({ texture: sprt1.texture});
        graphics1.beginFill(0x8D8C8C);
        graphics1.lineStyle(5, 0x1a1a1a, 1);
        graphics1.drawRect(
            (i % 3 === 0 ?
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

        //! Ao clicar...
        graphics1.on('pointerdown', () => {
            marcar(graphics1);
        });
    }

    for (i = 0; i < tampao.length; i++) {
        const graphics2 = new PIXI.Graphics();
        graphics2.beginFill(0x8D8C8C);
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

    const squad1 = new PIXI.Graphics();
    squad1.beginFill(0x00ff00);
    squad1.drawRect(
        (app.screen.width / 2) - 100,
        (app.screen.height / 2) + 175,
        50,
        50
    )
    squad1.endFill();
    containerGame.addChild(squad1);

    const basicText1 = new PIXI.Text(`${player1}`);
    basicText1.x = (app.screen.width / 2) - 75;
    basicText1.y = (app.screen.height / 2 + 200);
    basicText1.anchor.set(0.5);
    containerGame.addChild(basicText1);

    const squad2 = new PIXI.Graphics();
    squad2.beginFill(0xff0000);
    squad2.drawRect(
        (app.screen.width / 2) + 50,
        (app.screen.height / 2) + 175,
        50,
        50
    )
    squad2.endFill();
    containerGame.addChild(squad2);

    const basicText2 = new PIXI.Text(`${player2}`);
    basicText2.x = (app.screen.width / 2) + 75;
    basicText2.y = (app.screen.height / 2 + 200);
    basicText2.anchor.set(0.5);
    containerGame.addChild(basicText2);

    const basicText = new PIXI.Text(`Vez do ${swapS === true ? 'verde' : 'vermelho'}`);
    basicText.x = (app.screen.width / 2);
    basicText.y = (app.screen.height / 2 - 200);
    basicText.anchor.set(0.5, 0.5);
    containerGame.addChild(basicText);

    function marcar(graphics) {
        cursor.play();
        graphics.tint = swapS ? '0x00ff00' : '0xff0000';
        graphics.interactive = false;
        qnt[graphics.name] = swapS ? 'verde' : 'vermelho'

        let resultado = conferir("verde") || conferir("vermelho");

        if (resultado) {
            arrayGraphics.forEach((e) => {
                e.interactive = false;
            })
            basicText.text = resultado.mensagem;
            setTimeout(() => {
                containerGame.destroy();
                startGame();
            }, 1500);
        }

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
                jogador === "verde" ? (player1 = player1 + 1) : (player2 = player2 + 1)
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

            if (qnt.includes(undefined)) {
                basicText.text = `Vez do ${swapS === false ? 'verde' : 'vermelho'}`;
            }
        }
    }
}

// function startFunction() {
//     startGame();
// }

startGame();