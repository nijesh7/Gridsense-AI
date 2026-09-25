@echo off
TITLE GridSense AI - Launcher
COLOR 0A

echo ======================================================================
echo                GRID SENSE AI - STARTUP LAUNCHER
echo                 "Predict. Optimize. Balance."
echo ======================================================================
echo.

set ROOT_DIR=%~dp0

echo [1/3] Starting Python FastAPI ML Microservice (Port 8000)...
start "GridSense - Python ML Service (Port 8000)" cmd /k "cd /d %ROOT_DIR%ml-service && python main.py"

echo [2/3] Starting Node.js Express Backend API (Port 5000)...
start "GridSense - Node Backend API (Port 5000)" cmd /k "cd /d %ROOT_DIR%server && node index.js"

echo [3/3] Starting React.js + Vite Frontend (Port 3000)...
start "GridSense - React Client (Port 3000)" cmd /k "cd /d %ROOT_DIR%client && npm run dev -- --port 3000"

echo.
echo Waiting 4 seconds for services to initialize...
timeout /t 4 /nobreak >nul

echo Opening GridSense AI Dashboard in default browser...
start http://localhost:3000

echo.
echo ======================================================================
echo   ALL SERVICES STARTED SUCCESSFULLY!
echo   - React Dashboard:  http://localhost:3000
echo   - Node.js API:      http://localhost:5000/api/dashboard
echo   - FastAPI Docs:     http://localhost:8000/docs
echo ======================================================================
echo Press any key to close this launcher window (services keep running).
pause >nul
