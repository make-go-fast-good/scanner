#! /bin/bash
# this script is used with WSL, requires node npm and pkg installed on windows

appDir=$(pwd)
docDir=$appDir/assets/Documentation
outputDir=$appDir/releases/$(date -d "0 days ago" +'%F')

cd $appDir
echo "==> Release directory is ${outputDir}"
echo "==> Running npm run-script build"
npm run-script build
mkdir -p $outputDir/{s7_server,config,build,Documentation}
cp -r $appDir/{build,config} $outputDir
cp -r $docDir/*.pdf $outputDir/Documentation/
cp  $docDir/README.txt $outputDir/
cp  $appDir/scripts/init.bat $outputDir/

cd $appDir/serve/
cmd.exe /C pkg server.js -o s7_Server.exe --target node10-win-x64
mv s7_server.exe $outputDir/s7_server/

echo "==> Packaging front-end server"
cd $appDir
rsrc -ico assets/favicon.ico
cmd.exe /C pkg frontendserver.js -o  PLC_Toolkit.exe --target node10-win-x64
mv PLC_Toolkit.exe $outputDir/build/
cd $outputDir/build/
cmd.exe /C start PLC_Toolkit.exe
