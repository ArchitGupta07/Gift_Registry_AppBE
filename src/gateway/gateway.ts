
// import { OnModuleInit } from '@nestjs/common';
// import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';



// @WebSocketGateway(4001,{ cors: { origin: '*',methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// credentials: true, } })
// export class MyGateway implements OnModuleInit{

//   @WebSocketServer() 
//   server: Server;

//   onModuleInit() {
//       this.server.on('connection',(socket)=>{
//         console.log(socket.id)
//         console.log("Web socket Connected")
//       })
//   }


//   handleConnection(socket: Socket) {
//     console.log(`Client connected: ${socket.id}`);
//     this.server.emit('onConnect', { message: `Welcome client: ${socket.id}` });
//   }

//   handleDisconnect(socket: Socket) {
//     console.log(`Client disconnected: ${socket.id}`);
//   }

//   @SubscribeMessage('message')
//   onNewMessage(@MessageBody() body :any, @ConnectedSocket() client: Socket): void {
//     console.log(body)
//     console.log("check web socket")

//     this.server.emit('onMessage',{
//         msg:'new message',
//         content:body.content,
//         sender: client.id,
//         user:body.user
//     })
//     // this.server.emit('message', payload);
//   }
// }


import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { Prisma } from '@prisma/client';
import { GatewayService } from './gateway.service';

@WebSocketGateway(4001, {
  cors: {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  },
})
export class MyGateway implements OnModuleInit {

  @WebSocketServer()
  server: Server;

  constructor(private readonly gatewayService: GatewayService) {}  // Inject CommentsService

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('WebSocket Connected');
    });
  }

  handleConnection(socket: Socket) {
    console.log(`Client connected: ${socket.id}`);
    this.server.emit('onConnect', { message: `Welcome client: ${socket.id}` });
  }

  handleDisconnect(socket: Socket) {
    console.log(`Client disconnected: ${socket.id}`);
  }

  // Handle new comment messages
  @SubscribeMessage('Comment')
  async onNewMessage(
    @MessageBody() comment, 
    @ConnectedSocket() client: Socket
  ){
    console.log(comment);

    
    const newComment = await this.gatewayService.create(comment);

    // const comments = await this.gatewayService.findAll(7);
    // console.log(comments)

  
    this.server.emit('onComment', {
        id: newComment.id,
    //   msg: 'New comment',
      commentText: newComment.commentText,
    //   sender: client.id,
      userId: comment.userId,
    //   commentId: newComment.id,
      eventId: comment.eventId,
      username:comment.username,
      parentId:comment.parentId ? comment.parentId : null
      
    });
  }

  // Fetch all comments for an event when requested
  @SubscribeMessage('getComments')
  async onGetComments(
    @MessageBody() eventId: number, 
    @ConnectedSocket() client: Socket
  ){
    const comments = await this.gatewayService.findAll(eventId);

    client.emit('comments', {
      eventId,
      comments,
    });
  }
}