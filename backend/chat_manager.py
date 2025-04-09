from fastapi import WebSocket
from typing import Dict

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}

    async def connect(self, user_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        self.active_connections.pop(user_id, None)
      
    async def send_personal_message(self, message: str, to_user_id: int):
        websocket = self.active_connections.get(to_user_id)
        if websocket:
            await websocket.send_text(message)
      
    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_text(message)
