#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use std::process::{Command, Stdio};
// use tauri::Handle;

// mod cmd;

// use std::process::Command;
fn main() {
  std::thread::spawn(move || {
    Command::new("s7_Server-x86_64-pc-windows-msvc")
      .stdout(Stdio::piped())
      .spawn()
      .expect("failed to execute process");
  });

  tauri::Builder::default()
    // .invoke_handler(tauri::generate_handler![spawn_s7_server])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

// Takes the name of the binary and returns the full path to its location
// fn get_bin_command(name: &str) -> String {
//   tauri::api::command::relative_command(
//     tauri::api::command::binary_command(name.to_string()).unwrap(),
//   )
//   .unwrap()
// }

// Spawns s7 server and loads url in webview
// fn spawn_s7_server<T: 'static>(handle: &Handle<T>) {
//   std::thread::spawn(move || {
//     Command::new("s7_Server-x86_64-pc-windows-msvc")
//       .stdout(Stdio::piped())
//       .spawn()
//       .expect("failed to execute process");
//   });
// }
