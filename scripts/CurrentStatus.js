const commitsDiv = document.querySelector(".js-commits");

async function getGitCommits() {
  let data = await fetch(
    "https://api.github.com/repos/ManuelPuchner/PlanTrek/commits"
  );
  let commits = await data.json();
  return commits;
}

async function getFilteredCommits() {
  let commits = await getGitCommits();
  let filteredCommits = commits.map((commit) => {
    return {
      sha: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author.date,
    };
  });

  return filteredCommits;
}

function getCommitHtml(commit) {
  let dateFormatter = new Intl.DateTimeFormat("de-DE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return `
    <a href="https://github.com/ManuelPuchner/PlanTrek/commit/${
      commit.sha
    }" class="commit">
      <div class="commit-sha"><span class="text-gradient">#</span>${commit.sha.substring(
        0,
        7
      )}</div>
      <div class="commit-message">${commit.message}</div>
      <div class="commit-date">${dateFormatter.format(
        new Date(commit.date)
      )}</div>
    </a>
  `;
}

async function renderCommits() {
  let commits = await getFilteredCommits();
  commits.forEach((commit) => {
    let commitDiv = document.createElement("div");
    commitDiv.classList.add("gradient-border");
    commitDiv.innerHTML = getCommitHtml(commit);
    commitsDiv.appendChild(commitDiv);
  });
}

renderCommits();
