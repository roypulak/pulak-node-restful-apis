console.log('Before');
getUser(1);
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
            console.log('Calling Github API ...');
            resolve(['repo1', 'repo2', 'repo3']);
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