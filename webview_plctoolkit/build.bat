go mod tidy
rsrc -ico icons/icon.ico
go generate
go build -ldflags "-H windowsgui" -o plctoolkit.exe
:: go build -o plctoolkit.exe

start plctoolkit.exe

pause
