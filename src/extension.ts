import * as vscode from 'vscode';

const TOKENS_PER_CHARACTER = 0.25;

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('promptoptimizer.optimizeText', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const text = document.getText();
      const { optimizedText, effectiveness, tokenCount } = await optimizeText(text);
      replaceText(editor, document, optimizedText);
      vscode.window.showInformationMessage(`Characters reduced: ${text.length - optimizedText.length}. Tokens: ${tokenCount}. Effectiveness: ${effectiveness.toFixed(2)}%. Result copied to clipboard.`);
    }
  });

  context.subscriptions.push(disposable);
}

function countTokens(text: string): number {
  return Math.ceil(text.length * TOKENS_PER_CHARACTER);
}

async function optimizeText(text: string): Promise<{ optimizedText: string; effectiveness: number; tokenCount:number }> {

  const MAX_TOKENS = 4096;
  let prompt = text;
  const optimizedText = prompt.replace(/\s+/g, ' ').trim();
  const tokenCount = countTokens(optimizedText);
  if (tokenCount > MAX_TOKENS) {
    vscode.window.showWarningMessage(`The prompt contains ${tokenCount} tokens, which exceeds the maximum limit of ${MAX_TOKENS} tokens.`);
    const promptLength = Math.floor(MAX_TOKENS / TOKENS_PER_CHARACTER);
    prompt = prompt.slice(0, promptLength).trim();
  }

  // Call OpenAI API with prompt here and return the optimized text and effectiveness
  // ...

   // replace this with the actual optimized text
  const effectiveness = (1 - (optimizedText.length / text.length)) * 100;
  return { optimizedText, effectiveness, tokenCount };
}

async function replaceText(editor: vscode.TextEditor, document: vscode.TextDocument, optimizedText: string) {
  const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
  await editor.edit(editBuilder => {
    editBuilder.replace(fullRange, optimizedText);
  });
  await vscode.env.clipboard.writeText(optimizedText);
}

export function deactivate() {}