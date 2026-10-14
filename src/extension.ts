import * as vscode from 'vscode';

/**
 * Activation only, no feature yet: one line in the "Devcontainer Sandbox"
 * output channel saying which side the extension host runs on — the
 * container (`remoteName` = `dev-container`) or the local machine.
 */
export function activate(context: vscode.ExtensionContext): void {
  const channel = vscode.window.createOutputChannel('Devcontainer Sandbox');
  context.subscriptions.push(channel);
  const version = context.extension.packageJSON.version as string;
  channel.appendLine(`[info] v${version} activated (remoteName=${vscode.env.remoteName ?? 'local'})`);
}

export function deactivate(): void {}
