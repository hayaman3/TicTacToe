
    let board = [0,1,2,3,4,5,6,7,8];
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
            target.classList.add(human.mark=="x" ? "x" : "o")
            console.log(target.dataset.value)
            board[target.dataset.value] = human.mark
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

    const goDefault = (()=>{
        displayController.restart()
        human.state = [];
        computer.state = [];
        board = [0,1,2,3,4,5,6,7,8];
    })

    field.addEventListener('click', event => {
        displayController.markBoard(event.target)
        compareState.isThereAWinner();
    })
    xMark.addEventListener("click",event => {
        goDefault();
        displayController.xMark(event.target)
        human.mark = "x";
        computer.mark = "o";
    })
    oMark.addEventListener("click",event => {
        goDefault();
        displayController.oMark(event.target)
        human.mark = "o";
        computer.mark = "x";
    })
    restart.addEventListener("click",event => {
       goDefault();
    })
})()


// minimax (board, computer.mark) // @56

function minimax(newBoard, player){

    let availSpots = emptyIndexies(newBoard);
    
    if (winning(newBoard, human.mark)){
        return {score:-10};
    }
    else if (winning(newBoard, computer.mark)){
        return {score:10};
    }
    else if (availSpots.length === 0){
        return {score:0};
    }

    let moves = [];

    for (let i = 0; i < availSpots.length; i++){
        //create an object for each and store the index of that spot that was stored as a number in the object's index key
        let move = {};
        move.index = newBoard[availSpots[i]];
    
        // set the empty spot to the current player
        newBoard[availSpots[i]] = player;
    
        //if collect the score resulted from calling minimax on the opponent of the current player
        if (player == computer.mark){
          let result = minimax(newBoard, human.mark);
          move.score = result.score;
        }
        else{
          let result = minimax(newBoard, computer.mark);
          move.score = result.score;
        }
         //reset the spot to empty
        newBoard[availSpots[i]] = move.index;

        // push the object to the array
        moves.push(move);
    }
    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove;
    if(player === computer.mark){
        let bestScore = -10000;
        for(let i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
            bestScore = moves[i].score;
            bestMove = i;
        }
        }
    }else{

    // else loop over the moves and choose the move with the lowest score
        let bestScore = 10000;
        for(let i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
            bestScore = moves[i].score;
            bestMove = i;
        }
        }
    }

    // return the chosen move (object) from the array to the higher depth
    return moves[bestMove];
}

function emptyIndexies(board){
    return  board.filter(s => s != "x" && s != "o");
}

// winning combinations using the board indexies for instace the first win could be 3 xes in a row
function winning(board, player){
    if (
           (board[0] == player && board[1] == player && board[2] == player) ||
           (board[3] == player && board[4] == player && board[5] == player) ||
           (board[6] == player && board[7] == player && board[8] == player) ||
           (board[0] == player && board[3] == player && board[6] == player) ||
           (board[1] == player && board[4] == player && board[7] == player) ||
           (board[2] == player && board[5] == player && board[8] == player) ||
           (board[0] == player && board[4] == player && board[8] == player) ||
           (board[2] == player && board[4] == player && board[6] == player)
           ) {
           return true;
       } else {
           return false;
       }
   }


