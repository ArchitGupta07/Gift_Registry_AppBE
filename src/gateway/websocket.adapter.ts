import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplication } from '@nestjs/common';

export function setupWebSocket(app: INestApplication) {
  app.useWebSocketAdapter(new IoAdapter(app));
}
