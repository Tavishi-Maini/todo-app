export const socket = new WebSocket("ws://127.0.0.1:8000/ws/tasks/");

export const subscribeTasks = (onMessage) => {
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
};
