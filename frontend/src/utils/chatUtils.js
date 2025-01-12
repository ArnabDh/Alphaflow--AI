export const processChatCommand = (message) => {
  const commands = {
    'show tasks': /show|list|display tasks/i,
    'create task': /create|add|new task/i,
    'update task': /update|modify|change task/i,
    'delete task': /delete|remove task/i,
    'task status': /status|progress|overview/i,
    'help': /help|assist|support/i
  };

  for (const [command, regex] of Object.entries(commands)) {
    if (regex.test(message)) {
      return command;
    }
  }

  return null;
};

export const formatChatResponse = (response) => {
  if (Array.isArray(response)) {
    return response.map((item, index) => `${index + 1}. ${item}`).join('\n');
  }
  return response;
};

export const generateHelpMessage = () => {
  return `I can help you with the following:
1. Show tasks - View your current tasks
2. Create task - Add a new task
3. Update task - Modify existing tasks
4. Delete task - Remove tasks
5. Task status - Get progress overview
6. Help - Show this message

Just type your request naturally!`;
}; 