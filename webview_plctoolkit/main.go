package main

import (
	"embed"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"runtime"
	"syscall"

	"github.com/zserge/lorca"
)

//go:embed www
var fs embed.FS

// Go types that are bound to the UI must be thread-safe, because each binding
// is executed in its own goroutine. In this simple case we may use atomic
// operations, but for more complex cases one should use proper synchronization.

func main() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}

	var d lorca.Bounds
	d.WindowState = "maximized"

	cmd := exec.Command("./bin/s7_Server.exe") //Windows example, its tested
	cmd.SysProcAttr = &syscall.SysProcAttr{CreationFlags: 0x08000000}
	cmd.Stdout = os.Stdout
	// cmd.Run()
	cmd.Start()

	ui, err := lorca.New("", "", 0, 0, args...)
	ui.SetBounds(d)

	if execErr, ok := err.(*exec.Error); ok {
		lorca.PromptDownload()
		log.Fatalf("\nChrome could not be started. Do you have Chrome installed? %s\n", execErr)
	} else if err != nil {
		log.Fatalf("\nOps. Something went wrong while starting the application: %s", err)
	}

	defer ui.Close()

	// A simple way to know when UI is ready (uses body.onload event in JS)
	ui.Bind("ready", func() {
		log.Println("UI is ready")
	})

	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		log.Fatal(err)
	}
	defer ln.Close()
	go http.Serve(ln, http.FileServer(http.FS(fs)))
	ui.Load(fmt.Sprintf("http://%s/www", ln.Addr()))

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	log.Println("exiting...")
}
