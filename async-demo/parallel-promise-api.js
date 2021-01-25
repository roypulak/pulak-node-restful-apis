const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Simulated Async operation 1...');
        resolve(1);
        //reject(new Error('reason why promise is not fulfilled.'))
    }, 2000);
});

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('Simulated Async operation 2...');
        resolve(2);
    }, 2000);
});

//If any of the promise is rejected then the final promise produced by Promise.all() is considered rejected
Promise.all([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message));

//If our use case is like we do not want to wait for all async to be completed. As soon as any one of these async operaton is completed then we are satisfied.
//As soon as any one of the promises is fulfilled, then promise from Promise.race() is considered fulfilled
Promise.race([p1, p2])
    .then(result => console.log(result))
    .catch(err => console.log('Error', err.message))