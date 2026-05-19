@echo off
setlocal

set "PROJECT_DIR=%~dp0"
if "%PROJECT_DIR:~-1%"=="\" set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"
set "OUTPUT_DIR=%LOCALAPPDATA%\InfographicGeneratorDesktopV2BuildSizeLab\dist"

title Infographic Generator - Desktop Build

echo.
echo ============================================================
echo   Infographic Generator - Desktop Build
echo ============================================================
echo   Project : %PROJECT_DIR%
echo   Output  : %OUTPUT_DIR%
echo ============================================================
echo.

cd /d "%PROJECT_DIR%"
if errorlevel 1 (
    echo [ERROR] Could not navigate to project directory.
    pause
    exit /b 1
)

where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install it first.
    pause
    exit /b 1
)

echo [1/3] Building preview players...
echo.
call npm run desktop:v2:preview
if errorlevel 1 (
    echo.
    echo [ERROR] Preview players build failed.
    pause
    exit /b 1
)

echo.
echo [2/3] Building Remotion bundles...
echo.
call npm run desktop:v2:bundle
if errorlevel 1 (
    echo.
    echo [ERROR] Remotion bundle build failed.
    pause
    exit /b 1
)

echo.
echo [3/3] Building final app (NSIS installer + dir)...
echo.
call npx electron-builder --config ./desktop-v2/electron-builder.config.cjs --win
if errorlevel 1 (
    echo.
    echo [ERROR] electron-builder failed.
    pause
    exit /b 1
)

echo.
echo ============================================================
echo   Build complete!
echo   Output: %OUTPUT_DIR%
echo ============================================================
echo.

if exist "%OUTPUT_DIR%" explorer "%OUTPUT_DIR%"

pause
endlocal
