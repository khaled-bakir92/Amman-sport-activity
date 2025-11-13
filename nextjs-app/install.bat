@echo off
echo ============================================
echo Sports Activities Amman - Installation
echo ============================================
echo.

REM Prüfe ob Node.js installiert ist
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js ist nicht installiert!
    echo Bitte installiere Node.js von: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js gefunden
node --version

REM Cleanup
echo.
echo Cleanup alte Installationen...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
if exist yarn.lock del yarn.lock

REM Installation
echo.
echo Installiere Dependencies...
call npm install

if %errorlevel% equ 0 (
    echo.
    echo ============================================
    echo Installation erfolgreich!
    echo ============================================
    echo.
    echo Starte den Development Server mit:
    echo   npm run dev
    echo.
    echo Die Website wird verfuegbar sein unter:
    echo   http://localhost:3000
    echo.
) else (
    echo.
    echo [ERROR] Installation fehlgeschlagen
    echo.
    echo Versuche:
    echo   npm cache clean --force
    echo   npm install
    echo.
)

pause
