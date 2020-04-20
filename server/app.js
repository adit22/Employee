const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require('./employee')



/*
  ------------------------------------------Configuring App---------------------------------------------------------------------
*/

const app = express();

app.use(cors());
app.options('*', cors());

//Allow Request Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());



/*
  ------------------------------------------Routes And DB---------------------------------------------------------------------
*/


const employee=mongoose.model("emplo")

//DB Config
const db = "mongodb+srv://adit:UFqGI5XR7wiYIQ5J@cluster0-icyyk.mongodb.net/test?retryWrites=true&w=majority";
//Connect to MongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

    
app.get('/',(req,res)=>{
    employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    //res.send("welcome to nodejs")

})


app.post('/send',(req,res)=>{
    
    const emp=new employee({

        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        position:req.body.position,
        picture:req.body.picture
    })
    
    emp.save()
    .then(data=>{

        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    //console.log(req.body)
    
})

app.post('/delete',(req,res)=>{

    employee.findByIdAndRemove(req.body.id)
    .then(data=>{

        console.log(data)
        console.log("deleted")
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/update',(req,res)=>{

    employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        position:req.body.position,
        picture:req.body.picture
    }).then(data=>{

        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
    
})


//Selecting and running app on port
const port = process.env.PORT || 19000; // process.env.port is Heroku's port if you choose to deploy the app there

// Runnig the server on port
const server = app.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);