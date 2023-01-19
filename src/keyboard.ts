export const hasCommandModifier = (event: KeyboardEvent): boolean => {
  return event.metaKey || event.ctrlKey;
};

const isMac = typeof navigator === 'undefined' ? true : navigator.platform.toUpperCase().indexOf('MAC') >= 0;

export const formatKeyboardShortcut = (shortcut: string): string => {
  return shortcut.replace('cmd', isMac ? '⌘' : 'ctrl');
};
