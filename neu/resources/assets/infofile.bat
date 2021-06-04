@echo OFF

:: get current ip
Title Get IP and MAC Address
@for /f "delims=[] tokens=2" %%a in ('ping -4 -n 1 %ComputerName% ^| findstr [') do (
set "MY_IP=%%a"
)
:: get current mac
@for /f %%a in ('getmac /NH /FO Table') do (
@for /f %%b in ('echo %%a') do (
If /I NOT "%%b"=="N/A" (
Set "MY_MAC=%%b"
)
)
)

:: get current path
SET "APPpath=%~dp0"

:: get current getway
set "getway="
for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "Default"') do if not defined ip set getway=%%b

:: get operation system
SET "OS="
FOR /F "skip=1 tokens=*" %%a IN ('WMIC OS GET CAPTION') DO IF NOT DEFINED OS SET OS=%%a

:: get drive liast
set "drives=["
For /F "Skip=1 Delims=:" %%A In ('WMIC LogicalDisk Get Caption') Do call set "drives=%%drives%%"%%A","

:: make info file
echo {"path":"%APPpath%","ip":"%MY_IP%","mac":"%MY_MAC%","getway":"%getway%","os":"%OS%","localDisk":"%drives%"]}>info.json

START %APPpath%./s7_server.exe

EXIT
