interface ChatMessage {
    id: number;
    sender: "bot" | "user" | "proceedDeploy";
    content: string;
  }