

function isCommand(prompt: string): boolean {
  return prompt[0] == '/';
}

export { isCommand };
