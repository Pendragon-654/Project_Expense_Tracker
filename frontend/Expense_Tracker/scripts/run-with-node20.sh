#!/usr/bin/env bash
set -euo pipefail

# Resolve repository-local script path so npm can call this from any cwd.
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd -- "$SCRIPT_DIR/.." && pwd)"

# npm --prefix can set npm_config_prefix, which nvm rejects.
unset npm_config_prefix

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "Error: nvm is not installed or not found at $NVM_DIR/nvm.sh" >&2
  echo "Install nvm and Node 20.19.0, then retry." >&2
  exit 1
fi

# shellcheck disable=SC1090
. "$NVM_DIR/nvm.sh"

if ! nvm use 20.19.0 >/dev/null 2>&1; then
  echo "Node 20.19.0 is not installed in nvm. Installing now..." >&2
  nvm install 20.19.0 >/dev/null
  nvm use 20.19.0 >/dev/null
fi

exec node "$PROJECT_ROOT/node_modules/vite/bin/vite.js" "$@"
