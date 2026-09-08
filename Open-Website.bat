@echo off
title NAVORA AI - Launcher
echo ========================================================
echo   ✦ NAVORA AI - Tumkur District Outing Planner
echo ========================================================
echo.
echo Checking server status...

:: Check if server on port 5000 is running
netstat -ano | findstr :5000 >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [OK] Server is already running on http://localhost:5000
) else (
    echo [INFO] Starting Node.js backend server...
    start /b node server/index.js
    timeout /t 2 /nobreak >nul
)

echo.
echo Opening NAVORA AI in your default browser...
start http://localhost:5000

echo.
echo App is live at: http://localhost:5000
echo You can keep this window open or minimize it.
echo.
pause
