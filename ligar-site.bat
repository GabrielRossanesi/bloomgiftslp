@echo off
setlocal

cd /d "%~dp0"

echo.
echo ==========================================
echo  Bloom Gifts Franchise Portal
echo  Iniciando site em http://localhost:3000
echo ==========================================
echo.

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo Nao foi possivel encontrar o npm.cmd.
  echo Verifique se o Node.js esta instalado.
  echo.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Instalando dependencias do projeto...
  call npm.cmd install
  if errorlevel 1 (
    echo.
    echo Falha ao instalar as dependencias.
    pause
    exit /b 1
  )
  echo.
)

start "" powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 4; Start-Process 'http://localhost:3000'"

echo Servidor rodando. Mantenha esta janela aberta enquanto estiver usando o site.
echo Para desligar, pressione CTRL + C e confirme com S.
echo.

call npm.cmd run dev -- --port 3000

pause
