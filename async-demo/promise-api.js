//const p = Promise.resolve({ id: 1 });
//p.then(result => console.log(result));
const p = Promise.reject(new Error('reason for rejection...'));
p.then(error => console.log(error));
