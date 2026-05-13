@echo off
cd /d "%~dp0"
echo ==============================
echo  Infograph Desktop v2
echo ==============================
echo.
echo Building preview players...
call npm run desktop:v2:preview
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Preview build had issues, continuing...
)
echo.
echo Launching Electron app...
npx electron ./desktop-v2/main.cjs
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Electron exited with code %errorlevel%
    pause
)
