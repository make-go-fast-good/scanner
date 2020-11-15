@echo off

:: BatchGotAdmin
:-------------------------------------
REM  --> Check for permissions
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"

REM --> If error flag set, we do not have admin.
if '%errorlevel%' NEQ '0' (
    echo Requesting administrative privileges...
    goto UACPrompt
) else ( goto gotAdmin )

:UACPrompt
    echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
    set params = %*:"=""
    echo UAC.ShellExecute "cmd.exe", "/c %~s0 %params%", "", "runas", 1 >> "%temp%\getadmin.vbs"

    "%temp%\getadmin.vbs"
    del "%temp%\getadmin.vbs"
    exit /B

:gotAdmin
    pushd "%CD%"
    CD /D "%~dp0"
:--------------------------------------

call echo Building your things for you.

call echo.

call cd C:\Users\Phillip.Crandall\Projects\Telegrams

call npm run-script build

call mkdir C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\

call mkdir C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\s7_server\

call mkdir C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\config\

call mkdir C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\build\

call mkdir C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\Documentation\

call xcopy C:\Users\Phillip.Crandall\Projects\Telegrams\build C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\build\ /E

call xcopy C:\Users\Phillip.Crandall\Projects\Telegrams\config C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\config\ /E

call xcopy C:\Users\Phillip.Crandall\Projects\_Telegrams\Documentation\*.pdf C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\Documentation\ /E

call xcopy C:\Users\Phillip.Crandall\Projects\_Telegrams\Executables\_Telegrams.exe C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\build\ /E

call pkg C:\Users\Phillip.Crandall\Projects\Telegrams\serve\server.js -o  C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\s7_server\s7_Server.exe --target node10-win-x64

call xcopy C:\Users\Phillip.Crandall\Projects\Telegrams\assets\navhist.exe C:\Users\Phillip.Crandall\Projects\_Telegrams\releases\%date:~-4,4%%date:~-10,2%%date:~7,2%\s7_server\ /E

call ./buildfrontendddddd.bat
