/**
 * simple function to simulate an async request
 *
 * @param {number} time response time in ms
 * @param {any} value   the return value
 * @returns {Promise<any>}
 */
async function delay(time, value) {
  return new Promise(resolve => {
    setTimeout(resolve.bind(null, value), time);
  });
}

// store requests
let promises = [];
for (let i = 0; i < 10; i++) {
    promises.push(delay(500*i, i));
}

// iterate over requests using promises[Symbol.iterator]
async function test1() {
    for (const obj of promises) {
        console.log(`test1: ${obj}`);
    }
    console.log('Test1 after for');
}

// iterate over requests using promises[Symbol.iterator] and waiting in every loop
async function test1WorkAround() {
    for (const obj of promises) {
        const newObj = await obj;
        console.log(`workAround ${newObj}`);
    }
    console.log('workAround after for');
}

// iterate over requests using promises[Symbol.asyncIterator]
async function test2() {
    for await (const obj of promises) {
        console.log(`test2 ${obj}`);
    }
    console.log('Test2 after for');
}

test1();
console.log('After test1');
test1WorkAround();
console.log('After test1WorkAround');
test2();
console.log('After test2');