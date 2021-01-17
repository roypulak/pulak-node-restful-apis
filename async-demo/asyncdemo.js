console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

//pattern to deal with aync code
//Callbacks
//Promises
//Async/await

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        return { id: id, githubUsername: 'roypulak' };
    }, 2000);
}