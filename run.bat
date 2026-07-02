@echo off
title JD Generator - Launcher
cd /d "%~dp0"

echo Starting JD Generator...
echo.

node start.js

echo.
echo Server stopped. Press any key to close this window.
pause >nul