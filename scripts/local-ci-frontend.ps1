$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$frontend = Join-Path $root 'frontend'

if (-not (Test-Path (Join-Path $frontend 'package.json'))) {
  throw 'Error: frontend/package.json not found.'
}

if (-not (Test-Path (Join-Path $frontend 'node_modules'))) {
  throw 'Error: frontend dependencies are missing. Run: cd frontend; npm install'
}

Write-Host 'Running frontend CI checks (lint + build)...'
Push-Location $frontend
try {
  npm run ci:check
}
finally {
  Pop-Location
}

Write-Host 'Frontend CI checks passed.'
