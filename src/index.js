const player1 ={
    NOME: "Mario",
    VELOCIDADE: 5 , 
    MANOBRABILIDADE: 3,
    FORÇA: 4,
    PONTOS:0,

};

const player2 ={
    NOME: "Luigui",
    VELOCIDADE: 4 , 
    MANOBRABILIDADE: 4,
    FORÇA: 4,
    PONTOS:0,

};

async function rollDice(){
    return Math.floor(Math.random() * 6) + 1
}

async function getRamdomBlock(){
    let ramdom = Math.random()
    let result

    switch (true) {
        case ramdom < 0.33:
                result = "RETA"
            break;
        
            case ramdom < 0.66:
                result = "CURVA"
            break;
       
        default:
            result = "CONFRONTO"
            break;
    }

    return result
}

async function logRoll(characterName, block , diceResult , atribute) {
    console.log
    (`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`)
    
}

async function playRaceEngine(character1,character2 ) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)
        
        // sortear bloco
        let block = await getRamdomBlock()
        console.log(`Bloco: ${block}`)

        let diceresult1 =  await rollDice()
        let diceresult2 =  await rollDice()

        
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceresult1 + player1.VELOCIDADE
            totalTestSkill2 = diceresult2 + player1.VELOCIDADE
            
            await logRoll( character1.NOME, "Velocidade", diceresult1 , player1.VELOCIDADE)
            await logRoll( character2.NOME, "Velocidade", diceresult2 , player2.VELOCIDADE)
        }
        if(block === "CURVA"){
            totalTestSkill1 = diceresult1 + player1.MANOBRABILIDADE
            totalTestSkill2 = diceresult2 + player2.MANOBRABILIDADE

            await logRoll( character1.NOME, "Velocidade", diceresult1 , character1.MANOBRABILIDADE)
            await logRoll( character2.NOME, "Velocidade", diceresult2 , character2.MANOBRABILIDADE)
        }
        if(block === "CONFRONTO"){
             
            let powerResult1 = diceresult1 + character1.FORÇA
             
            let powerResult2 = diceresult2 + character2.FORÇA

            
            console.log(`${ character1.NOME} confontrou ${character2.NOME}! 🥊`)

            await logRoll( character1.NOME, "FORÇA", diceresult1 , character1.FORÇA)
            await logRoll( character2.NOME, "FORÇA", diceresult2 , character2.FORÇA)
            

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1.NOME} Venceu o Confronto, ${character2.NOME} Perdeu 1 Ponto!`);
                character2.PONTOS--;
            }
            
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2.NOME} Venceu o Confronto, ${character1.NOME} Perdeu 1 Ponto!`);
                character1.PONTOS--;
            }
            
            if (powerResult2 === powerResult1) {
                console.log("Confronto Empatado, Ninguém Perde Pontos!");
            }

        }
        

        

        if( totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto `)
            totalTestSkill1++
        }
        else if ( totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto `)
            totalTestSkill2++
        }

        console.log("_________________________________")
        console.log()
    }
}

async function declareWinner(character1, character2) {
    console.log("\n")
    console.log(`${character1.NOME} fez ${character1.PONTOS} ponto(s) `)
    console.log(`${character2.NOME} fez ${character2.PONTOS} ponto(s) `)

    if(character1.PONTOS > character2.PONTOS)
        console.log(`\n Parabéns ${character1} Ganhou a Corrida 🏆`)
    else if(character2.PONTOS > character1.PONTOS)
        console.log(`\n Parabéns ${character2} Ganhou a Corrida 🏆`)
    else
        console.log(` A Corrida Terminou empatada`)
    
}
(async function main(){
    console.log(`Corrida Iniciada Entre ${player1.NOME} e ${player2.NOME}!!!  🏁🚨 \n`)

    await playRaceEngine(player1, player2)
    await declareWinner(player1 , player2)
})()
