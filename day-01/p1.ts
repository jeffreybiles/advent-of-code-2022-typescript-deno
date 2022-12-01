export type Elf = number[]

const firstExample: Elf[] = [
  [
    1000,
    2000,
    3000,
  ],
  [
    4000,
  ],
  [
    5000,
    6000,
  ],
  [
    7000,
    8000,
    9000,
  ],
  [
    10000,
  ],
]

export const getCaloriesPerElf = (elves: Elf[]): Elf => {
  return elves.map((elf: number[]) => {
    return elf.reduce((partial, num) => partial + num, 0)
  })
}

const getMaxCalories = (elves: Elf[]): number => {
  return Math.max(...getCaloriesPerElf(elves))
}

export const getElfData = async (textFilePath: string): Promise<Elf[]> => {
  const data = await Deno.readTextFile(textFilePath)
  const elves = data.split('\n\n')
  return elves.map(elf => elf.split('\n').map(line => parseInt(line)))
}

const elfData = await getElfData('./day-01/data.txt')
// console.log(getMaxCalories(elfData))
