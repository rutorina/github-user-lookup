const userAvatar = document.querySelector(".card-avatar");
const userName = document.getElementById("user-name");
const userBio = document.getElementById("user-bio");
const userFollowers = document.getElementById("user-followers-count");
const userFollowing = document.getElementById("user-following-count");
const userRepos = document.getElementById("user-repos-count");
const reposList = document.getElementById("card-repos-list");
const githubLink = document.getElementById("github-link");

async function main() {
    const data = await fetch("https://api.github.com/users/rutorina");

    const userData = await data.json();
    console.log(userData);
    updateUserInfo(userData);
}

function updateUserInfo(userData) {
    userAvatar.src = userData.avatar_url;
    userName.textContent = userData.login;
    userBio.textContent = userData.bio;
    userFollowers.textContent = userData.followers;
    userFollowing.textContent = userData.following;
    userRepos.textContent = userData.public_repos;
    githubLink.href = userData.html_url;
    updateUserRepos(userData.repos_url);
}

async function updateUserRepos(reposUrl) {
    const data = await fetch(reposUrl);
    const reposData = await data.json();
    console.log(reposData);
    reposList.innerHTML = "";
    reposData.forEach(repo => {
        const repoItem = document.createElement("li");
        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.target = "_blank";
        repoLink.textContent = repo.name;
        repoItem.appendChild(repoLink);
        reposList.appendChild(repoItem);
    });
}

main();