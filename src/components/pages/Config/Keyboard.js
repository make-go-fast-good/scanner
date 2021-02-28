export const KEYCODE_DOWN = 40;
export const KEYCODE_UP = 38;
export const KEYCODE_ENTER = 13;
export const KEYCODE_ESC = 27;
export const KEYCODE_SPACE = 32;
export const KEYCODE_TAB = 9;
export const KEYCODE_BACKSPACE = 8;

// alphabet
export const KEYCODE_LOWERCASE_B = 66;

// isPrintableKey returns if the key represented in the given event is printable.
export function isPrintableKey(e: KeyboardEvent) {
  return e.key.length === 1;
}
