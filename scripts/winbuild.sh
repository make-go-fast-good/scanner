#! /bin/bash

outputDir=/mnt/c/Users/Phillip.Crandall/Projects/_Telegrams/releases/$(date -d "0 days ago" +'%F')
buildDir=/mnt/c/Users/Phillip.Crandall/Projects/Telegrams
docDir=/mnt/c/Users/Phillip.Crandall/Projects/_Telegrams

echo "==> Running npm run-script build"
cd $buildDir
npm run-script build
mkdir -p $outputDir/{s7_server,config,build,Documentation}
cp $buildDir/{build,config} $buildDir/
cp $docDir/Documentation/*.pdf $buildDir/Documentation/
pkg $buildDir/serve/server.js -o  $outputDir/s7_server/s7_Server.exe --target node10-win-x64

echo "==> Packaging front-end server"
pkg $buildDir/plc_toolkit.js -o  $outputDir/build/PLC_Toolkit.exe --target node10-win-x64
