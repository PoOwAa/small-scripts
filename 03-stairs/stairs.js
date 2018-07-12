/**
 * You have stairs and you are curious how many ways can you reach the top.
 * The function requires 2 parameters: stairsSize and possibleSteps
 * stairsSize is a number where you can add the size of stairs
 * possibleSteps is an array of numbers where you can add how much 
 * stair can you step with one movement
 * 
 *  Example of recursive function: 
 *  stairsSize = 4 possibleSteps = [1, 2]
 * 
 *  1   2   3   4
 *  y               0 -> 1
 *  x   y           1 -> 2
 *      x   y       2 -> 3 
 *          x   y   3 -> 4 (found a way)
 *      x       y   2 -> 4 (found a way)
 *  x       y       1 -> 3
 *          x   y   3 -> 4 (found a way)
 *      y           0 -> 2
 *      x   y       2 -> 3
 *          x   y   3 -> 4 (found a way)
 *      x       y   2 -> 4 (found a way)
 * 
 * {0, 1, 2, 3, 4}
 * {0, 1, 2, 4}
 * {0, 1, 3, 4}
 * {0, 2, 3, 4}
 * {0, 2, 4}
 * 
 * from step 3 there is only one possible step (3->4)
 * from step 2 there are 2 possible steps (2->3->4) (2->4)
 * from step 1 there are 3 possbile steps (1->2->3) (1->2->4) (1->3->4)
 * 
 * If we cache this possibleSteps we can optimize the code
 */
const steps = [1, 2];
const stairsSize = 10;

/**
 * The numWays function
 *
 * @param {number} stairsSize       The size of stairs
 * @param {number[]} possibleSteps  Step sizes with one movement
 * @returns {number}
 */
function numWays(stairsSize, possibleSteps) {
  const sumWays = moveRecursive(stairsSize-1, 0, possibleSteps, 0);
  return sumWays;
}

/**
 * Recursive function for calculating how many steps.
 *
 * @param {number} stairSize
 * @param {number} actualPosition
 * @param {number[]} possibleSteps
 * @param {number} sumWays
 * @param {Map<number, number>} [cache=new Map()]  Don't wanna calculate every time the number of ways if we can save them.
 * @returns
 */
function moveRecursive(stairSize, actualPosition, possibleSteps, sumWays, cache = new Map()) {
    if (stairSize === 0 || stairSize === 1) {
        return 1;
    }
    sumWays = 0;
    for (const step of possibleSteps) {
        const newPos = actualPosition + step;
        if (cache.has(newPos)) {
            // console.log(`DEBUG: [cache]: ${newPos} [value]: ${cache.get(newPos)}`);
            sumWays += cache.get(newPos);
        } else {
            if (newPos < stairSize) {
                // console.log(`DEBUG: step [position]: ${position} [newPos]: ${newPos}`);
                sumWays += moveRecursive(stairSize, newPos, possibleSteps, sumWays, cache);
            }
            if (newPos === stairSize) {
                // console.log(`DEBUG: finish [position]: ${position} [newPos]: ${newPos}`);
                sumWays++;
            }
            cache.set(newPos, sumWays);
        }
    }
    return sumWays;
}

console.log(numWays(stairsSize, steps));