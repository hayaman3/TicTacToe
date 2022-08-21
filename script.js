// const game = {
//     xTurn: true,
//     xState: [],
//     oState: [],
//     winningStates: [
//         // Rows
//         ['0', '1', '2'],
//         ['3', '4', '5'],
//         ['6', '7', '8'],

//         // Columns
//         ['0', '3', '6'],
//         ['1', '4', '7'],
//         ['2', '5', '8'],

//         // Diagonal
//         ['0', '4', '8'],
//         ['2', '4', '6']
//     ]
// }

// document.addEventListener('click', event => {
//     console.log("clicked")
//     const target = event.target
//     const isField = target.classList.contains('field')
//     const isDisabled = target.classList.contains('disabled')

//     if (isField && !isDisabled) {
//         // The player clicked on a cell that is still empty
//         const cellValue = target.dataset.value

//         game.xTurn === true
//             ? game.xState.push(cellValue)
//             : game.oState.push(cellValue)

//         target.classList.add('disabled')
//         target.classList.add(game.xTurn ? 'x' : 'o')

//         game.xTurn = !game.xTurn
//     }
//     if (!document.querySelectorAll('.field:not(.disabled)').length) {
//         // document.querySelector('.game-over').classList.add('visible')
//         // document.querySelector('.game-over-text').textContent = 'Draw!'
//         alert("DRAW")
//     }
//     game.winningStates.forEach(winningState => {
//         const xWins = winningState.every(state => game.xState.includes(state))
//         const oWins = winningState.every(state => game.oState.includes(state))
       
//         if (xWins || oWins) {
//             document.querySelectorAll('.field').forEach(cell => cell.classList.add('disabled'))
//             // document.querySelector('.game-over').classList.add('visible')
//             // document.querySelector('.game-over-text').textContent = xWins
//             //     ? 'X wins!'
//             //     : 'O wins!'
            
//         }
//         if(xWins){
//             alert("xwins")
//         }
//         if(oWins){
//             alert("owins")
//         }
//     })
// })
const compare = (()=>{
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
    const updatedArr = () =>{
      const modal = document.querySelector('.modal')
      const result = document.querySelector(".result")
      winningStates.forEach(winningState => {
        const humanWin = winningState.every(state => human.state.includes(state))
        const computerWin = winningState.every(state => computer.state.includes(state))
        if(humanWin){
          console.log("human win: "+human.state)
        }
        if(computerWin){
          console.log("computer win"+computer.state)
        }
        if (!document.querySelectorAll('.field:not(.disabled)').length){        
          modal.style.display = "flex";
          result.textContent = "DRAW!"
        }
      })
    }
    return{
      updatedArr
    }
  })()
  
  // best practice event delegation?
  const board = document.getElementsByClassName("board")[0]
  board.addEventListener('click', event => {
    console.log("clicked")
    const target = event.target
    const field = target.classList.contains('field')
    const disabled = target.classList.contains('disabled')
    if (field && !disabled) {
      // The player clicked on a cell that is still empty
      const fieldValue = target.dataset.value
      human.state.push(fieldValue)
      target.classList.add('disabled')
      target.classList.add(human.mark ? 'x' : 'o')
  
      // computerMove();
    }
  
    compare.updatedArr();
  })
  
  function makeDefault(){
    human.mark = "x";
    human.state = [];
    computer.mark = "o";
    computer.state = [];
  }
  
  const human = {
    mark:"x",
    state:[]
  }
  const computer = {
    mark:"o",
    state:[]
  }