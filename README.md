Prompt Optimizer Extension
This Visual Studio Code extension optimizes prompts to meet OpenAI's API limits. The extension removes extra whitespaces, trims the text, and reduces its length if it exceeds the maximum token limit. The optimized text is then copied to the clipboard and replaced in the active editor.

Usage
Install the extension in Visual Studio Code.
Open the editor containing the prompt you want to optimize.
Select the prompt text.
Press Ctrl+Shift+P to open the Command Palette and search for Optimize Text.
Press Enter to optimize the text. The result is copied to the clipboard and replaced in the editor.
Limitations
OpenAI's API limits the maximum token count of a prompt to 4096. If the prompt exceeds this limit, the extension will display a warning message and reduce its length accordingly. The token count is calculated by counting the number of characters and multiplying it by a fixed ratio.

Credits
This extension was created by samueldar.io
