import { readline } from "https://deno.land/x/readline@v1.1.0/mod.ts";

export type Move = 'Rock' | 'Paper' | 'Scissors'
export type Round = {
  move: Move,
  opponentMove: Move
}

export const example = [
'A Y',
'B X',
'C Z',
]

export const moveHash: {[key: string]: Move} = {
  'A': 'Rock',
  'B': 'Paper',
  'C': 'Scissors',
  'X': 'Rock',
  'Y': 'Paper',
  'Z': 'Scissors',
}
export const selectionPointsHash: {[key in Move]: number} = {
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

export const totalPoints = (lines: string[], lineToRound: (line: string) => Round): number => {
  let points = 0
  lines.forEach(line => points += pointsForRound(lineToRound(line)))
  return points;
}
export const filenameToLines = (filename: string): string[] => {
  const file = Deno.readTextFileSync(filename)
  return file.split('\n')
}

// const lines = filenameToLines('./day-02/data.txt')
// console.log(totalPoints(lines, lineToRound))
