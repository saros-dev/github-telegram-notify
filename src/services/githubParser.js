function parseGithubEvent(event, payload = {}) {
  const repo = payload.repository?.full_name || "unknown repo";

  switch (event) {
    case "push":
      return formatPush(repo, payload);

    case "pull_request":
      return formatPR(repo, payload);

    case "release":
      return formatRelease(repo, payload);

    default:
      return null;
  }
}

function formatPush(repo, payload) {
  const commits = payload.commits || [];
  const branch = payload.ref?.replace("refs/heads/", "") || "unknown";
  const author = payload.pusher?.name || "unknown";
  const repoUrl = payload.repository?.html_url || "";

  let msg =
    `🚀 *New Push*\n\n` +
    `📦 *Repository:* ${repo}\n` +
    `🌿 *Branch:* ${branch}\n` +
    `👤 *Author:* ${author}\n` +
    `📝 *Commits:* ${commits.length}\n\n`;

  commits.slice(0, 5).forEach((commit) => {
    msg += `• ${commit.message}\n`;
  });

  if (repoUrl) {
    msg += `\n🔗 ${repoUrl}`;
  }

  return msg;
}

function formatPR(repo, payload) {
  const pr = payload.pull_request || {};

  return (
    `🔀 *Pull Request*\n\n` +
    `📦 *Repository:* ${repo}\n` +
    `📌 *Title:* ${pr.title || "No title"}\n` +
    `📊 *State:* ${pr.state || "unknown"}\n` +
    `👤 *Author:* ${pr.user?.login || "unknown"}\n` +
    `🔗 ${pr.html_url || ""}`
  );
}

function formatRelease(repo, payload) {
  const release = payload.release || {};

  return (
    `🚀 *New Release*\n\n` +
    `📦 *Repository:* ${repo}\n` +
    `🏷 *Tag:* ${release.tag_name || "unknown"}\n` +
    `📄 *Name:* ${release.name || "No name"}\n` +
    `🔗 ${release.html_url || ""}`
  );
}

module.exports = parseGithubEvent;
