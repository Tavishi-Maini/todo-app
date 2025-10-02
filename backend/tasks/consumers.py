import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TaskConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("tasks", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("tasks", self.channel_name)

    async def receive(self, text_data):
        pass  # we can handle incoming messages if needed

    async def task_update(self, event):
        await self.send(text_data=json.dumps(event["content"]))
