const game = (()=>{
    const human = {
        mark:"x",
        state:[]
    }
    const computer = {
        mark:"o",
        state:[]
    }

const compareState = (()=>{
    winningStates = [
      // Rows
      ['0', '1', '2'],
      ['3', '4', '5'],
      ['6', '7', '8'],
      // Columns
      ['0', '3', '6'],
      ['1', '4', '7'],
      ['2', '5', '8'],
      // Diagonal
      ['0', '4', '8'],
      ['2', '4', '6']
    ];
    const isThereAWinner = () =>{
        winningStates.forEach(winningState => {
            const humanWin = winningState.every(state => human.state.includes(state))
            const computerWin = winningState.every(state => computer.state.includes(state))
            if(humanWin){
              displayController.humanWin();
            }
            if(computerWin){
              displayController.computerWin();
            }
            if(!document.querySelectorAll('.field:not(.disabled)').length){        
                displayController.draw();
            }
      })
    }
    return{
        isThereAWinner
    }
})()

const displayController = (()=>{
    // from inputController()
    const markBoard = (target) =>{
        const disabled = target.classList.contains('disabled')
        if(!disabled){
            human.state.push(target.dataset.value)
            target.classList.add('disabled')
            target.classList.add(human.mark ? 'x' : 'o')
            // computerMove(); // TODO
        }
    }
    const xMark = (target) =>{
        const active = target.classList.contains('active')
        if(!active){
            const oMark = document.getElementById("o-choice")
            oMark.classList.remove("active")
            target.classList.add("active")
            human.mark = "x"
        }
    }
    const oMark = (target) =>{
        const active = target.classList.contains('active')
        if(!active){
            const xMark = document.getElementById("x-choice")
            xMark.classList.remove("active")
            target.classList.add("active")
            human.mark = "o"
        }
    }
    const restart = () =>{
        document.querySelectorAll(".field").forEach(field => {
            field.classList.remove('disabled', 'x', 'o')
        })
    }
    // from compareState.isThereAWinner()
    const humanWin = () =>{
        console.log("human win: "+human.state)
    }
    const computerWin = () =>{
        console.log("computer win: "+computer.state)
    }
    const draw = () =>{
        const modal = document.querySelector('.modal')// go higher scope when needed
        const result = document.querySelector(".result")// go higher scope when needed
        modal.style.display = "flex";
        result.textContent = "DRAW!"
    }
    return {
        markBoard,
        xMark,
        oMark,
        restart,
        humanWin,
        computerWin,
        draw
    }
})()

const inputController = (()=>{
    const field = document.getElementsByClassName("board")[0]
    const xMark = document.getElementById("x-choice")
    const oMark = document.getElementById("o-choice")
    const restart = document.getElementById("restart")

    field.addEventListener('click', event => {
        displayController.markBoard(event.target)
        compareState.isThereAWinner();
    })
    xMark.addEventListener("click",event => {
        displayController.xMark(event.target)
    })
    oMark.addEventListener("click",event => {
        displayController.oMark(event.target)
    })
    restart.addEventListener("click",event => {
        displayController.restart()
        human.state = [];
        computer.state = [];
    })
})()

})()

