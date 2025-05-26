# Local File Picker for VS Code

A Visual Studio Code extension that provides a quick file picker scoped to the current file's directory. This makes it easy to navigate and open files that are in the same directory as your currently active file.

## Features

- Quick file picker that shows all files in the current file's directory
- Directory icons to distinguish folders from files
- Fuzzy search through file names
- Handles both files and directories
  - Files: Opens in editor
  - Directories: Reveals in explorer

## Usage

1. Open any file in VS Code
2. Use the command palette (`Cmd/Ctrl+Shift+P`) and search for "Show Files in Current Directory"
3. Or use the default keybinding:
   - For VIM users: `<space>f l` in normal mode
   - For others: Configure your own keybinding

## Installation

You can install this extension in several ways:

1. From VS Code:
   ```bash
   cursor --install-extension ssoriche.vscode-local-file-picker
   ```
2. From source:
   ```bash
   git clone https://github.com/ssoriche/vscode-local-file-picker.git
   cd vscode-local-file-picker
   npm install
   npm run package
   cursor --install-extension vscode-local-file-picker-0.1.0.vsix
   ```

## Configuration

The extension works out of the box with no configuration needed. However, you can add your own keybindings in `keybindings.json`:

```json
{
  "key": "cmd+k l",
  "command": "local-file-picker.showFiles",
  "when": "editorTextFocus"
}
```

## For VIM Users

If you're using the VSCodeVim extension, you can add this to your settings to use the spacebar as a leader key:

```json
"vim.normalModeKeyBindingsNonRecursive": [
  {
    "before": ["<leader>", "f", "l"],
    "commands": ["local-file-picker.showFiles"],
    "name": "Find File in Current Directory"
  }
]
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure to:

- Update the CHANGELOG.md
- Add tests for any new features
- Follow the existing code style
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need for quick navigation between related files
- Built with VS Code's extension API
