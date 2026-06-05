function parseGithubEvent(event, payload) {
  const repo = payload.repository?.full_name;

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
  let msg = `📦 *Push Event*\nRepo: ${repo}\n\n`;

  payload.commits.slice(0, 3).forEach(c => {
    msg += `• ${c.message}\n`;
  });

  return msg;
}

function formatPR(repo, payload) {
  const pr = payload.pull_request;

  return `🔀 *Pull Request*\nRepo: ${repo}\nTitle: ${pr.title}\nState: ${pr.state}`;
}

function formatRelease(repo, payload) {
  const r = payload.release;

  return `🚀 *Release*\nRepo: ${repo}\nTag: ${r.tag_name}`;
}

module.exports = parseGithubEvent;
