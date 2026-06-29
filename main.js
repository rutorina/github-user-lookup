const searchInput = document.getElementById("username-input");
const searchButton = document.getElementById("search-button");
const searchForm = document.querySelector(".search-bar");

const errorCard = document.getElementById("error-message-container");
const loadingCard = document.getElementById("loading-message-container");
const userCard = document.getElementById("user-card-container");
// user data update 
const userAvatar = document.querySelector(".card-avatar");
const userName = document.getElementById("user-name");
const userBio = document.getElementById("user-bio");
const userFollowers = document.getElementById("user-followers-count");
const userFollowing = document.getElementById("user-following-count");
const userRepos = document.getElementById("user-repos-count");
const reposList = document.getElementById("card-repos-list");
const githubLink = document.getElementById("github-link");
const errorNumber = document.getElementById("error-message-text");
const errorMessage = document.getElementById("error-message-description");


function updateUserInfo(userData) {
    userAvatar.src = userData.avatar_url;
    userName.textContent = userData.login;
    if (userData.bio === null) {
        userBio.textContent = "No bio available";
    }
    else {
        userBio.textContent = userData.bio;
    }
    userFollowers.textContent = userData.followers;
    userFollowing.textContent = userData.following;
    userRepos.textContent = userData.public_repos;
    githubLink.href = userData.html_url;
    updateUserRepos(userData.repos_url);
}

async function updateUserRepos(reposUrl) {
    const data = await fetch(reposUrl);
    const reposData = await data.json();
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


// main();

async function handleSearch(event) {
    event.preventDefault();
    try {
        const username = searchInput.value.trim();
        if (username) {
            toggleHiddenCards("loading");
            const data = await fetch(`https://api.github.com/users/${username}`);
            const userData = await data.json();
            if (userData.message) {
                errorNumber.textContent = "User not found";
                errorMessage.textContent = `"${username}" doesn't exist on GitHub.`;
                toggleHiddenCards("error");
                throw new Error(userData.message);
            }
            else {
                await updateUserInfo(userData);
                toggleHiddenCards("user");

            }
        }
    } catch (error) {
        toggleHiddenCards("error");
    }
}

searchForm.addEventListener("submit", handleSearch);

function toggleHiddenCards(card) {
    switch (card) {
        case "error":
            errorCard.classList.remove("hidden");
            loadingCard.classList.add("hidden");
            userCard.classList.add("hidden");
            break;
        case "loading":
            errorCard.classList.add("hidden");
            loadingCard.classList.remove("hidden");
            userCard.classList.add("hidden");
            break;
        case "user":
            errorCard.classList.add("hidden");
            loadingCard.classList.add("hidden");
            userCard.classList.remove("hidden");
            break;
        default:
            errorCard.classList.add("hidden");
            loadingCard.classList.add("hidden");
            userCard.classList.add("hidden");
    }
}