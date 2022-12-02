import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

type Move = 'Rock' | 'Paper' | 'Scissors'
type Round = {
  move: Move,
  opponentMove: Move
}

const example = [
'A Y',
'B X',
'C Z',
]

const moveHash: {[key: string]: Move} = {
  'A': 'Rock',
  'B': 'Paper',
  'C': 'Scissors',
  'X': 'Rock',
  'Y': 'Paper',
  'Z': 'Scissors',
}
const selectionPointsHash: {[key in Move]: number} = {
  'Rock': 1,
  'Paper': 2,
  'Scissors': 3,
}
const winnerPoints = ({move, opponentMove}: Round): number => {
  if(move == opponentMove) return 3

  if(move == 'Rock' && opponentMove == 'Scissors') return 6
  if(move == 'Scissors' && opponentMove == 'Paper') return 6
  if(move == 'Paper' && opponentMove == 'Rock') return 6

  return 0
}
const stringToMove = (moveString: string): Move => {
  return moveHash[moveString]
}
const lineToRound = (roundString: string): Round => {
  const [opponentMoveString, moveString] = roundString.split(' ')
  return {
    move: stringToMove(moveString),
    opponentMove: stringToMove(opponentMoveString)
  }
}
const pointsForRound = (round: Round): number => {
  const selectionPoints = selectionPointsHash[round.move]
  const winPoints = winnerPoints(round)
  console.log(selectionPoints, winPoints)

  return selectionPoints + winPoints
}

const totalPoints = (lines: string[]): number => {
  let points = 0
  lines.forEach(line => points += pointsForRound(lineToRound(line)))
  return points;
}
console.log(totalPoints(example))

const file = await Deno.readTextFile('./day-02/data.txt')
const lines = file.split('\n')
console.log(totalPoints(lines))
// const totalPointFromFile = async (filename: string): number => {
//   const file = await Deno.open('./day-02/data.txt')
//   const points = 0
//   for await (const line of readline(file)) {
//     points += pointsForRound(lineToRound(line))
//   }
// }
// for (line in await readline(example))