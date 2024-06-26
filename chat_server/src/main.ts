import express, { Request, Response } from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv'
import cors  from 'cors';
import http   from 'http';
import { Server }  from "socket.io"
import { ConnectionOptions } from "tls";
import Notification from './models/Notification'
import Reply from './models/Reply'
  
dotenv.config();
mongoose.set('strictQuery', true);
const app = express();

app.use(express.json());
 
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors(options));

const server = http.createServer(app);
const io = new Server(server ,{
  cors: {
    origin: "http://localhost:3000"
  }
});

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat-message', async (notification) => {
     try{ 
      handleIncomingNotification(notification);
    }
     catch(err){
      console.log(err);
     }
    });
  });

   
  app.post("/api/message", async (req: Request, res: Response): Promise<Response> => {
      //messages.push({ ...req.body });
    return res.status(201).json('Ok');
  });

  app.delete("/api/messages", async (req: Request, res: Response): Promise<Response> => {
    try{
        // await mongoose.connection.db.dropCollection('notifications');
        // await mongoose.connection.db.dropCollection('replies');

        await Notification.deleteMany({});
        await Reply.deleteMany({});

        return res.status(201).json('Ok');
  }catch(err){
    console.log(err);
    return res.status(201).json('Error');
  }

});

  app.get("/api/messages", async (req: Request, res: Response): Promise<Response> => {
    const messages:any = await Notification.find().select('rawMessage');
 
   try{ const response = messages.map((msg)=>{
    console.log(msg);
        const raw =   JSON.parse(msg.rawMessage);
        raw.id = msg.id;
        return raw;
     });
     return res.status(201).json(response);
    }catch(err){
      return res.status(500).json("Exception on get Notifications");
    }
    
  });

  app.get("/api/messages/:id", async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    //  let empMessages = messages.filter((message)=>{
    //     return message.emp === id;
    // });
    return res.status(201).json();
  });
  

const start = async (): Promise<void> => {
  try {
    const conn_string  =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
    await mongoose.connect(conn_string);
    server.listen(3200, () => {
      console.log('listening on *:3200');
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
 


const handleIncomingNotification  = async (notification)=>{

  console.log(notification);
     
      const {message , ...metadata} = notification;

      const payload : any = {
        timeStamp : notification.time,
        user : notification.user.name
      };
      if(notification.reference){
        payload.answer  = notification.message;
        payload.question  = notification.reference.message
        payload.questionId  = notification.reference.id
        const reply = new Reply(payload);
        const doc = await reply.save();
       
        payload.rawMessage = JSON.stringify(notification);
        const newNotification = new Notification(payload);
        const responseDoc = await newNotification.save();
        notification.id =  responseDoc.id;
        io.emit('notification', notification);
      }
      else {
        payload.question  = notification.message;
        payload.rawMessage = JSON.stringify(notification);
        const newNotification = new Notification(payload);
        const doc = await newNotification.save();
        notification.id =  doc.id;
        //const data:any = await Reply.find({'question': { $regex:  notification.message}, "$options": "i"})
        const data:any = await Reply.find( 
          { $text: { $search: notification.message } }).limit(10);
               console.log(data);

        if(data.length  == 0)
        { 
              io.emit('notification', notification);
        }
        else {
          console.log(data[0].answer);
          const botReply  = {
            time : new Date(),
            user : {name : '' },
            message : data[0].answer,
            reference : notification,
          }
         
          const  {user, ...dbBotReply} = botReply;
          dbBotReply['user'] = botReply.user.name;
          dbBotReply['rawMessage'] = JSON.stringify(botReply);
          const newNotification = new Notification(dbBotReply);
          const doc = await newNotification.save();
          botReply['id'] =  doc.id;
          io.emit('notification', botReply);
          
        }
      }
}


// const connetToMongoDB =  async () => {

//   const conn_string  =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`;

//   const options :ConnectionOptions = {
      
//   };
  
//   mongoose.Promise = global.Promise;
//   await mongoose.connect(conn_string, options);

// }
void start();


