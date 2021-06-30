import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js"
import Pusher from "pusher"
import cors from "cors"


const app=express();
const port = process.env.Port || 9000;

const pusher = new Pusher ({
    appId :"1225407",
    key :"5eb3c9fd6b223c14d63c",
    secret: "2c91ccd4cefd1ba4a815",
    cluster : "ap2",
    useTls: true,
});

app.use(express.json());
app.use(cors());

const connection_url=
"mongodb+srv://admin:Ryh755PyEftWiAI6@cluster0.bxni7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" ;

mongoose.connect(connection_url,{
    useCreateIndex :true,
    useNewUrlParser :true ,  
    useUnifiedTopology :true,
});

const db = mongoose.connection;

db.once("open", () =>{
    console.log("DB connected");

    const msgCollection=db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) =>{
        console.log("A change occured", change);

        if(change.operationType === 'insert'){
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted' ,
            {
                name : messageDetails.user,
                message:messageDetails.message,
                timestamp: messageDetails.timestamp,
                received:messageDetails.received
            });
        } else {
            console.log('Error triggering Pusher')
        }
    });
});



app.get("/",(req,res)=> res.status(200).send("hello world"));

app.get('/messages/sync',(req,res) =>{
    Messages.find((err,data) =>{
        if (err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.post('/messages/new',(req,res) =>{
    const dbmessage=req.body ;

    Messages.create(dbmessage,(err,data) =>{
        if (err){
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})



app.listen(port,() => console.log(`Listening on localhost:${port}`));