@echo off
TITLE GridSense AI - Terminator
COLOR 0C

echo ======================================================================
echo                GRID SENSE AI - STOP SERVICES
echo ======================================================================
echo.
echo Stopping Node.js, Python, and Vite development processes...

taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM python.exe /T 2>nul

echo.
echo All GridSense AI services have been stopped.
timeout /t 2 >nul
