#!/usr/bin/env bash
# Create a new GitHub repo under your account and push this project (branch main).
#
# Option A — Personal Access Token (fine-grained or classic with "repo" scope):
#   export GH_TOKEN=ghp_xxxxxxxx
#   ./scripts/push-to-github.sh
#
# Option B — GitHub CLI (after: gh auth login):
#   ./scripts/push-to-github.sh
#
# Optional: GITHUB_REPO_NAME=my-repo (default: publishd-website)
# Optional: GITHUB_PUBLIC=1  (default: private repo)

set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REPO_NAME="${GITHUB_REPO_NAME:-publishd-website}"
PRIVATE_JSON="true"
if [[ "${GITHUB_PUBLIC:-}" == "1" ]]; then
  PRIVATE_JSON="false"
fi

if git remote get-url origin &>/dev/null; then
  echo "Remote 'origin' already exists: $(git remote get-url origin)"
  echo "To replace: git remote remove origin && $0"
  exit 1
fi

if command -v gh &>/dev/null && gh auth status &>/dev/null; then
  echo "Using GitHub CLI (gh)..."
  if [[ "${GITHUB_PUBLIC:-}" == "1" ]]; then
    gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
  else
    gh repo create "$REPO_NAME" --private --source=. --remote=origin --push
  fi
  echo "Done: $(gh repo view --json url -q .url)"
  exit 0
fi

if [[ -z "${GH_TOKEN:-}" ]]; then
  echo "No GitHub auth found."
  echo "  Install & login: https://cli.github.com  →  gh auth login"
  echo "  Or set GH_TOKEN (PAT with repo scope) and run this script again."
  exit 1
fi

echo "Creating repo via GitHub API..."
API_RESP="$(mktemp)"
HTTP_CODE="$(curl -sS -o "$API_RESP" -w "%{http_code}" \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  https://api.github.com/user/repos \
  -d "{\"name\":\"${REPO_NAME}\",\"private\":${PRIVATE_JSON},\"description\":\"Publishd — marketing site (Next.js)\"}")"

if [[ "$HTTP_CODE" != "201" && "$HTTP_CODE" != "422" ]]; then
  echo "GitHub API error HTTP $HTTP_CODE"
  cat "$API_RESP"
  rm -f "$API_RESP"
  exit 1
fi
rm -f "$API_RESP"

if [[ "$HTTP_CODE" == "422" ]]; then
  echo "Repo may already exist — continuing to set remote and push."
fi

LOGIN="$(curl -sS -H "Authorization: Bearer ${GH_TOKEN}" -H "Accept: application/vnd.github+json" https://api.github.com/user | python3 -c "import sys,json; print(json.load(sys.stdin)['login'])")"
if [[ -z "$LOGIN" ]]; then
  echo "Could not read GitHub login from token. Check GH_TOKEN scopes."
  exit 1
fi

git remote add origin "https://x-access-token:${GH_TOKEN}@github.com/${LOGIN}/${REPO_NAME}.git"
git push -u origin main
echo "Done: https://github.com/${LOGIN}/${REPO_NAME}"
