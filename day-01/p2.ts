import { getCaloriesPerElf, getElfData } from "./p1.ts";

const elfData = await getElfData('./day-01/data.txt')
const elfCalories = getCaloriesPerElf(elfData).toSorted().toReversed()

console.log(elfCalories[0] + elfCalories[1] + elfCalories[2])