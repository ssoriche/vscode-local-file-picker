const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

/**
 * Activates the extension.
 * @param {vscode.ExtensionContext} context - The extension context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'local-file-picker.showFiles',
    async () => {
      // Get the current file's directory
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        vscode.window.showErrorMessage('No active file');
        return;
      }

      const currentFile = activeEditor.document.uri;
      const currentDir = path.dirname(currentFile.fsPath);

      try {
        // Read all files in the directory
        const files = await fs.promises.readdir(currentDir);

        // Create QuickPick items for each file
        const items = await Promise.all(
          files.map(async (file) => {
            const filePath = path.join(currentDir, file);
            const stat = await fs.promises.stat(filePath);
            return {
              label: file,
              description: path.relative(currentDir, filePath),
              detail: stat.isDirectory() ? '$(folder)' : '$(file)',
              fsPath: filePath,
            };
          })
        );

        // Show QuickPick with files
        const selected = await vscode.window.showQuickPick(items, {
          placeHolder: `Files in ${path.basename(currentDir)}`,
          matchOnDescription: true,
          matchOnDetail: true,
        });

        // Open the selected file
        if (selected) {
          const stat = fs.statSync(selected.fsPath);
          if (stat.isDirectory()) {
            // If it's a directory, show its contents
            const uri = vscode.Uri.file(selected.fsPath);
            await vscode.commands.executeCommand('revealInExplorer', uri);
          } else {
            // If it's a file, open it
            const doc = await vscode.workspace.openTextDocument(
              selected.fsPath
            );
            await vscode.window.showTextDocument(doc);
          }
        }
      } catch (err) {
        vscode.window.showErrorMessage(
          `Error reading directory: ${err.message}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

/**
 * Deactivates the extension.
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
