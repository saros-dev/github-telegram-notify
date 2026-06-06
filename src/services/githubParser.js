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
  const branch = payload.ref?.replace("refs/heads/", "") || "unknown";
  const commits = payload.commits || [];
  const author = payload.pusher?.name || "unknown";
  const repoUrl = payload.repository?.html_url || "";

  // 🗑 Branch delete
  if (payload.deleted) {
    return (
      `🗑 *Branch Deleted*\n\n` +
      `📦 Repo: ${repo}\n` +
      `🌿 Branch: ${branch}\n` +
      `👤 By: ${author}`
    );
  }

  // 🚀 Force push
  const isForce = payload.forced ? "⚠️ (Force Push)\n\n" : "\n\n";

  let msg =
    `🚀 *New Push* ${isForce}` +
    `📦 Repo: ${repo}\n` +
    `🌿 Branch: ${branch}\n` +
    `👤 Author: ${author}\n` +
    `📝 Commits: ${commits.length}\n\n`;

  commits.slice(0, 5).forEach((c) => {
    msg += `• ${c.message || "no message"}\n`;
  });

  if (repoUrl) {
    msg += `\n🔗 ${repoUrl}`;
  }

  return msg;
}

function formatPR(repo, payload) {
  const pr = payload.pull_request || {};
  const action = payload.action;

  const title = pr.title || "No title";
  const user = pr.user?.login || "unknown";
  const url = pr.html_url || "";

  let status = "🔀 PR Event";

  if (action === "opened") status = "🆕 PR Opened";
  else if (action === "closed" && pr.merged) status = "🎉 PR Merged";
  else if (action === "closed") status = "❌ PR Closed";

  return (
    `${status}\n\n` +
    `📦 Repo: ${repo}\n` +
    `📌 Title: ${title}\n` +
    `👤 Author: ${user}\n` +
    `📊 Action: ${action}\n` +
    `🔗 ${url}`
  );
}

function formatRelease(repo, payload) {
  const r = payload.release || {};

  return (
    `🚀 *New Release*\n\n` +
    `📦 Repo: ${repo}\n` +
    `🏷 Tag: ${r.tag_name || "unknown"}\n` +
    `📄 Name: ${r.name || "No name"}\n` +
    `🔗 ${r.html_url || ""}`
  );
}

module.exports = parseGithubEvent;
