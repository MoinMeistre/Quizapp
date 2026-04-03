@echo off
REM Quizapp Development Server Startup Script for Windows

setlocal enabledelayedexpansion

REM Configuration
set "PROJECT_DIR=%cd%"
set "WEB_DIR=%PROJECT_DIR%\src\web"
set "PORT=%1"
set "HOST=%2"

if "%PORT%"=="" set "PORT=8000"
if "%HOST%"=="" set "HOST=localhost"

REM Check if PHP is installed
php -v >nul 2>&1
if errorlevel 1 (
    color 0C
    echo.
    echo ERROR: PHP is not installed or not in PATH
    echo Please install PHP 7.2 or higher
    echo.
    pause
    exit /b 1
)

REM Get PHP version
for /f "tokens=*" %%i in ('php -r "echo phpversion();"') do set PHP_VERSION=%%i

color 0A
echo.
echo PHP version: %PHP_VERSION%
echo.

REM Create data directory if it doesn't exist
if not exist "%PROJECT_DIR%\data" mkdir "%PROJECT_DIR%\data"

REM Start the PHP development server
echo.
echo Starting Quizapp development server...
echo Server running at: http://%HOST%:%PORT%
echo Press Ctrl+C to stop the server
echo.

cd /d "%WEB_DIR%"
php -S %HOST%:%PORT%

pause
