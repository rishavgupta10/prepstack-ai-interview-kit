export const formatReportConversation = (
  messages: {
    sender: string;
    content: string;
  }[],
) => {
  return messages
    .map((message) => `${message.sender.toUpperCase()}: ${message.content}`)
    .join("\n\n");
};
