const p = new Promise((resolve, reject) => {
    //kick off some asynchronous job here
    setTimeout(() => {
        //resolve(1); //pending ---> resolved, fulfilled
        reject(new Error('some error message, why promised could not fulfilled')) //pending ---> rejected
    }, 2000)
});

//if promise is fulfilled then it will enter then clause, if rejected it will enter in catch clause
p.then(result => console.log('Result: ', result))
    .catch(err => console.log('Error: ', err.message));