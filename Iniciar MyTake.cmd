@echo off
cd /d "%~dp0"
start "MyTake" http://localhost:4173
node server.mjs
