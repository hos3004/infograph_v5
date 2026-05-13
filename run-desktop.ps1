Write-Host "==============================" -ForegroundColor Cyan
Write-Host " Infograph Desktop v2" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""
Set-Location -LiteralPath $PSScriptRoot

Write-Host "Building preview players..." -ForegroundColor Yellow
npm run desktop:v2:preview
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Preview build had issues, continuing..." -ForegroundColor DarkYellow
}
Write-Host ""
Write-Host "Launching Electron app..." -ForegroundColor Green
npx electron ./desktop-v2/main.cjs
if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Electron exited with code $LASTEXITCODE" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
