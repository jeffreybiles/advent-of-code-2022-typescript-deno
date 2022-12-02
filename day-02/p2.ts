import { totalPoints, filenameToLines, selectionPointsHash, type Move, type Round, moveHash } from "./p1.ts"

type Result = 'Win' | 'Lose'| 'Draw'
type ResultKeys = 'X' | 'Y' | 'Z'
const desiredResultHash: {[key in ResultKeys ]: Result} = {
  'X': 'Lose',
  'Y': 'Draw',
  'Z': 'Win',
}
const moveToPlay = (opponentMove: Move, desiredResult: Result): Move => {
  if(desiredResult == 'Draw') return opponentMove

  if(desiredResult == 'Win') {
    if(opponentMove == 'Paper') return 'Scissors'
    if(opponentMove == 'Rock') return 'Paper'
    if(opponentMove == 'Scissors') return 'Rock'
  }
  if(desiredResult == 'Lose') {
    if(opponentMove == 'Paper') return 'Rock'
    if(opponentMove == 'Rock') return 'Scissors'
    if(opponentMove == 'Scissors') return 'Paper'
  }

  throw Error('your desired result or opponent move was not allowed')
}

const lineToRound = (roundString: string): Round => {
  const [opponentMoveString, desiredResultString] = roundString.split(' ')
  const opponentMove = moveHash[opponentMoveString]
  const desiredResult = desiredResultHash[desiredResultString as ResultKeys]
  const move = moveToPlay(opponentMove, desiredResult)

  return {
    move,
    opponentMove,
  }
}


const lines = filenameToLines('./day-02/data.txt')
console.log(totalPoints(lines, lineToRound))
