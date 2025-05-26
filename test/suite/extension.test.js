const assert = require('assert');
const vscode = require('vscode');

suite('Local File Picker Extension Test Suite', () => {
  suiteSetup(() => {
    vscode.window.showInformationMessage('Starting test suite');
  });

  suiteTeardown(() => {
    vscode.window.showInformationMessage('Test suite completed');
  });

  test('Extension should be present', () => {
    assert.ok(
      vscode.extensions.getExtension('ssoriche.vscode-local-file-picker')
    );
  });

  test('Should register showFiles command', async () => {
    // First, get the extension
    const extension = vscode.extensions.getExtension('ssoriche.vscode-local-file-picker');
    assert.ok(extension, 'Extension should be found');

    // Activate the extension if it's not already active
    if (!extension.isActive) {
      await extension.activate();
    }

    // Now check for the command
    const commands = await vscode.commands.getCommands();
    assert.ok(
      commands.includes('local-file-picker.showFiles'),
      'Command local-file-picker.showFiles should be registered'
    );
  });
});
