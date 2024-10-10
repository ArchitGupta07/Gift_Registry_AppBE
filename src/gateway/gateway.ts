
import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';



@WebSocketGateway(4001,{ cors: { origin: '*',methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
credentials: true, } })
export class MyGateway implements OnModuleInit{

  @WebSocketServer() 
  server: Server;

  onModuleInit() {
      this.server.on('connection',(socket)=>{
        console.log(socket.id)
        console.log("Web socket Connected")
      })
  }


  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
    this.server.emit('onConnect', { message: `Welcome client: ${socket.id}` });
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  @SubscribeMessage('message')
  onNewMessage(@MessageBody() body :any, @ConnectedSocket() client: Socket): void {
    console.log(body)
    console.log("check web socket")

    this.server.emit('onMessage',{
        msg:'new message',
        content:body,
        sender: client.id
    })
    // this.server.emit('message', payload);
  }
}