// const gameboard =  (() => {
//     let boardArray = []
//     for (i = 0; i < 9; i++) {
//         let button = document.getElementsByClassName("field")[i]
//         boardArray.push(button);        
//     };
//     console.log(boardArray)
//     return {boardArray}
// })();

const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningStates: [
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
    ]
}

document.addEventListener('click', event => {
    const target = event.target
    const isField = target.classList.contains('field')
    const isDisabled = target.classList.contains('disabled')

    if (isField && !isDisabled) {
        // The player clicked on a field that is still empty
        const cellValue = target.dataset.value

        game.xTurn === true
            ? game.xState.push(cellValue)
            : game.oState.push(cellValue)

        target.classList.add('disabled')
        target.classList.add(game.xTurn ? 'x' : 'o')

        game.xTurn = !game.xTurn
    }
    if (!document.querySelectorAll('.field:not(.disabled)').length) {

        alert("DRAW")
    }
    game.winningStates.forEach(winningState => {
        const xWins = winningState.every(state => game.xState.includes(state))
        const oWins = winningState.every(state => game.oState.includes(state))
       

        if(xWins){
            alert("xwins")
        }
        if(oWins){
            alert("owins")
        }
    })
})
