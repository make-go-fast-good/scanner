executeExe();
Neutralino.init({
  load: () => {
      executeExe()

    let response = window.Neutralino.os.execCommand({
      command: "echo window.NL_PATH",
    });
    console.log(`Your app path: ${response.output}`);
  },
});

function executeExe() {
  let command = "start " + window.NL_PATH + "/s7_server.exe";
  window.Neutralino.os.execCommand(command);
  console.log({ command });
}
