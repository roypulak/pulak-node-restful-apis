console.log('Before');
getUser(1, listRepositories);
console.log('After');

function listRepositories(user) {
    getRepositories(user.githubUsername, listCommits)
}

function listCommits(repos) {
    console.log(repos);
    getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
    console.log(commits);
}

function getUser(id) {
    return new Promise((resolve, reject) => {
        //kick off some asynchronous work
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, githubUsername: 'roypulak' });
        }, 2000);
    });
}

function getRepositories(username, callback) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling Github API ...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repoName, callback) {
    setTimeout(() => {
        console.log('Calling Github API for list of commits for a repository...');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}