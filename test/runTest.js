const path = require('path');
const { runTests } = require('@vscode/test-electron');

async function main() {
  try {
    // The folder containing the Extension Manifest package.json
    const extensionDevelopmentPath = path.resolve(__dirname, '../');

    // The path to the extension test script, including the .js extension for proper resolution
    const extensionTestsPath = path.resolve(
      __dirname,
      './suite/index.js'  // Changed from './suite/extension.test' to './suite/index.js'
    );

    // Download VS Code, unzip it and run the integration test
    await runTests({
      extensionDevelopmentPath,
      extensionTestsPath,
    });
  } catch (err) {
    console.error('Failed to run tests:', err);
    process.exit(1);
  }
}

main();
