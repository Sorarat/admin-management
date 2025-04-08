from fastapi import WebSocket
from typing import Dict

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        print(f"User {user_id} connected.")
        print(f"Active connections: {self.active_connections}")

    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id, None)
        print(f"User {user_id} disconnected.")
        print(f"Active connections after disconnect: {self.active_connections}")

    async def send_personal_message(self, message: str, to_user_id: int):
        websocket = self.active_connections.get(to_user_id)
        if websocket:
            print(f"Sending message to {to_user_id}: {message}")
            await websocket.send_text(message)
        else:
            print(f"User {to_user_id} is not connected. Message not sent.")

    async def broadcast(self, message: str):
        print(f"Broadcasting message: {message}")
        for connection in self.active_connections.values():
            await connection.send_text(message)
