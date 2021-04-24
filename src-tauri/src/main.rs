#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;

fn main() {
  tauri::Builder::default()
    .on_page_load(|_webview, _| {
      std::thread::spawn(move || {
        cmd::spawn_command(
          "s7_Server-x86_64-pc-windows-msvc",
          vec!["run", "s7_Server-x86_64-pc-windows-msvc"],
        )
      });
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
