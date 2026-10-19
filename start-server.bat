@echo off
setlocal
cd /d "%~dp0"
echo Will Dibo Portfolio - local web server
echo Open http://127.0.0.1:8000/ in your browser.
echo Keep this window open. Press Ctrl+C to stop the server.
echo.
where py >nul 2>&1
if not errorlevel 1 (
    py -3 -m http.server 8000 --bind 127.0.0.1
) else (
    where python >nul 2>&1
    if not errorlevel 1 (
        python -m http.server 8000 --bind 127.0.0.1
    ) else (
        echo Python was not found. Use the VS Code Live Server steps in README.md.
    )
)
pause
