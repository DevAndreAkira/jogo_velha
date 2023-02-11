PIXI.settings.RESOLUTION = 1;

const app = new PIXI.Application({
    backgroundAlpha: '0',
});
document.body.appendChild(app.view);

app.renderer.resize(window.innerWidth, window.innerHeight);

//* BACKGROUND

const texture = PIXI.Texture.from('./img/_1p2.jpeg');

const tilingSprite = new PIXI.TilingSprite(
    texture,
    app.screen.width,
    app.screen.height,
);
app.stage.addChild(tilingSprite);

let count = 0;

app.ticker.add(() => {
    count += 0.005;
    tilingSprite.tilePosition.x += 1;
    tilingSprite.tilePosition.y += 1;
});

//* BACKGROUND

// ? SOUND EFFECT
// const sound = PIXI.sound.Sound.from('./sound/funky.mp3');
// sound.volume = 0.05;
// sound.loop = true;
// sound.play();

// const decision = PIXI.sound.Sound.from('./sound/Decision1.ogg');
// decision.volume = 0.1;

// const party = PIXI.sound.Sound.from('./sound/party.mp3');
// party.volume = 0.1;

let objChars = [
    '👵',
    '👴🏽',
    '👵🏾',
    '🧓🏻',
    '🧑'
]

let ganhou;
let modalidade;

const startText1 = new PIXI.Text(`1P`, {
    fontSize: 40,
    fill: ['#c6daff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});
startText1.x = (app.screen.width / 2);
startText1.y = (app.screen.height / 2 - 25);
startText1.anchor.set(0.5);
startText1.interactive = true;
startText1.cursor = 'pointer';
startText1.on('pointerdown', startFunction);
app.stage.addChild(startText1);

const startText2 = new PIXI.Text(`2P`, {
    fontSize: 40,
    fill: ['#c6daff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});
startText2.x = (app.screen.width / 2);
startText2.y = (app.screen.height / 2 + 25);
startText2.anchor.set(0.5);
startText2.interactive = true;
startText2.cursor = 'pointer';
startText2.on('pointerdown', startFunction2);
app.stage.addChild(startText2);

const startText3 = new PIXI.Text(`Jogo da velha 👵🏽`, {
    align: 'center',
    fontSize: (window.innerWidth > 767 ? 54 : 36),
    fill: ['#c6daff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 440,
    lineJoin: 'round',
});
startText3.x = (app.screen.width / 2);
startText3.y = (app.screen.height / 2 - 175);
startText3.anchor.set(0.5);
app.stage.addChild(startText3);

// * TORNEIO OCULTADO POR ENQUANTO
// const startText4 = new PIXI.Text(`Torneio`, {
//     fontSize: 40,
//     fill: ['#c6daff', '#00ff99'], // gradient
//     stroke: '#4a1850',
//     strokeThickness: 5,
//     wordWrap: true,
//     wordWrapWidth: 440,
//     lineJoin: 'round',
// });
// startText4.x = (app.screen.width / 2);
// startText4.y = (app.screen.height / 2 + 75);
// startText4.anchor.set(0.5);
// startText4.interactive = true;
// startText4.cursor = 'pointer';
// startText4.on('pointerdown', startFunction3);
// app.stage.addChild(startText4);

// const iconSound = new PIXI.Text(`🔊`, {
//     align: 'center',
//     fontSize: 30
// });
// iconSound.x = (app.screen.width / 2);
// iconSound.y = (app.screen.height / 2 - 275);
// iconSound.anchor.set(0.5);
// iconSound.interactive = true;
// iconSound.cursor = 'pointer';
// iconSound.on('pointerdown', soundConfig);
// app.stage.addChild(iconSound);

const sprt1 = PIXI.Sprite.from("./img/x.png");
const sprt2 = PIXI.Sprite.from("./img/bola.png");

// const cursor = PIXI.sound.Sound.from('./sound/Cursor1.ogg');
// cursor.volume = 0.05;

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
        graphics1.beginFill(0xffffff);
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
        if (modalidade === true) {
            graphics1.on('pointerdown', () => {
                marcar(graphics1);
                // console.log(graphics.name);
                setTimeout(() => {
                    if (ganhou) {
                        swapS = true;
                    }
                    else {
                        marcar(marcacaoAleatorio());
                    }
                }, 100)
            });
        }
        else {
            graphics1.on('pointerdown', () => {
                marcar(graphics1);
            });
        }
    }

    function marcacaoAleatorio() {
        let numRandom = Math.floor(Math.random() * arrayGraphics.length);
        if (qnt[numRandom] === undefined) {
            return arrayGraphics[numRandom];
        }
        else {
            console.log("Encontrando campo " + undefined);
            if (!qnt.includes(undefined)) {
                return '';
            }
            else {
                return marcacaoAleatorio();
            }
        }
    }

    for (i = 0; i < tampao.length; i++) {
        const graphics2 = new PIXI.Graphics();
        graphics2.beginFill(0xffffff);
        graphics2.lineStyle(5, 0xffffff, 1);
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

    const basicText1 = new PIXI.Text(`${player1}`, {
        fontSize: 30,
        fill: ['#c6daff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });
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
    );
    squad2.endFill();
    containerGame.addChild(squad2);

    const basicText2 = new PIXI.Text(`${player2}`, {
        fontSize: 30,
        fill: ['#c6daff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });
    basicText2.x = (app.screen.width / 2) + 75;
    basicText2.y = (app.screen.height / 2 + 200);
    basicText2.anchor.set(0.5);
    containerGame.addChild(basicText2);

    const basicText = new PIXI.Text(`Vez do ${swapS === true ? 'verde' : 'vermelho'}`, {
        fontSize: 24,
        fill: ['#c6daff', '#00ff99'], // gradient
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
        lineJoin: 'round',
    });
    basicText.x = (app.screen.width / 2);
    basicText.y = (app.screen.height / 2 - 200);
    basicText.anchor.set(0.5, 0.5);
    containerGame.addChild(basicText);

    function marcar(graphics) {
        // cursor.play();
        graphics.tint = swapS ? '0x00ff00' : '0xff0000';
        graphics.interactive = false;
        qnt[graphics.name] = swapS ? 'verde' : 'vermelho';

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
            ganhou = combinacao.every(elemento => {
                // Includes - Verifica se o elemento contém no Array - boolean
                return jogadas.includes(elemento);
            })

            if (ganhou) {
                // party.play();
                console.log("Ganhou!");
                jogador === "verde" ? (player1 = player1 + 1) : (player2 = player2 + 1);
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


    const graphicsBars = new PIXI.Graphics();
    graphicsBars.beginFill(0x00ff99);
    graphicsBars.lineStyle(5, 0x00ff99, 1);
    graphicsBars.drawRect(
        ((app.screen.width / 2) - (250)),
        ((50)),
        (size * 5),
        20
    );
    graphicsBars.endFill();
    containerGame.addChild(graphicsBars);

    const iconBack = new PIXI.Text(`🔙`, {
        align: 'center',
        fontSize: 30
    });
    iconBack.x = (window.innerWidth > 767 ? (app.screen.width / 2 + 225) : (app.screen.width / 2 + 120));
    iconBack.y = (app.screen.height / 2 - 210);
    iconBack.anchor.set(0.5);
    iconBack.interactive = true;
    iconBack.cursor = 'pointer';
    iconBack.on('pointerdown', () => {
        // cursor.play();
        containerGame.destroy({ children: true, texture: true, baseTexture: true });
        player1 = 0;
        player2 = 0;
        startText1.interactive = true;
        startText2.interactive = true;
    });
    containerGame.addChild(iconBack);
}

function startFunction() {
    modalidade = true;
    swapS = true;
    startText1.interactive = false;
    startText2.interactive = false;
    // decision.play();
    startGame();
}

function startFunction2() {
    modalidade = false;
    swapS = true;
    startText1.interactive = false;
    startText2.interactive = false;
    // decision.play();
    startGame();
}

function startFunction3() {
    alert("Aqui");
    // modalidade = false;
    // swapS = true;
    // decision.play();
    // startGame();
}

// function soundConfig() {
//     cursor.play();
//     if (sound.isPlaying) {
//         sound.stop();
//         iconSound.text = "🔈";
//     }
//     else {
//         sound.play();
//         iconSound.text = "🔊";
//     }
// }
