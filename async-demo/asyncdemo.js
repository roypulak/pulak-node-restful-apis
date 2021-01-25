console.log('Before');

//Promised based approach
/*const p = getUser(1)
.then(user => getRepositories(user.githubUsername))
.then(repos => getCommits(repos[0]))
.then(commits => console.log(commits))
.catch(err => console.log('Error:', err.message));*/

//Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.githubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error: ', err.message);
    }
}

displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        //kick off some asynchronous work
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, githubUsername: 'roypulak' });
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API for repositories...');
            resolve(['repo1', 'repo2', 'repo3']);
            //reject(new Error('Could not get the repos.'))
        }, 2000);
    });
}

function getCommits(repoName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API for list of commits for a repository...');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}