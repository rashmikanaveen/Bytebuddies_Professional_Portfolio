$ErrorActionPreference = 'Stop'

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $root

git config core.hooksPath .githooks

Write-Host 'Local Git hooks enabled from .githooks/.'
Write-Host 'Pre-push will now run frontend CI checks.'
