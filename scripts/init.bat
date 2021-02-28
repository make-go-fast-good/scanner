
@echo off

set SCRIPT="%TEMP%\%RANDOM%-%RANDOM%-%RANDOM%-%RANDOM%.vbs"

echo Set oWS = WScript.CreateObject("WScript.Shell") >> %SCRIPT%
echo sLinkFile = "%USERPROFILE%\Desktop\PLC_Toolkit.lnk" >> %SCRIPT%
echo Set oLink = oWS.CreateShortcut(sLinkFile) >> %SCRIPT%
echo oLink.TargetPath = "%~dp0\build\PLC_Toolkit.exe" >> %SCRIPT%
echo oLink.WorkingDirectory = "%~dp0\build" >> %SCRIPT%
echo oLink.Save >> %SCRIPT%

cscript /nologo %SCRIPT%
del %SCRIPT%

::shortcut.exe /a:c /f:"%USERPROFILE%\desktop\PLC_Toolkit.lnk" /t:"%~dp0\build\PLC_Toolkit.exe"
