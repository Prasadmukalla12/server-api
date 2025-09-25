const mongoClient = require("mongodb").MongoClient
const express = require("express")
const cors = require("cors")
const mongodb = "mongodb://localhost:27017"

const app = express()
app.use(cors())

var database;

// For post,put,delete
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Api routes

//Get all users
app.get("/users",(req,res)=>{
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("users").find({}).toArray().then(document=>{
            res.send(document)
        })
    })
})

//Get user
app.get("/users/:user_id",(req,res)=>{
    mongoClient.connect(mongodb).then((obj)=>{
        database = obj.db("business")
        database.collection("users").findOne({user_id:req.params.user_id}).then(document=>{
            res.send(document)
        })
    })
})

//Add new user
app.post("/add-user",(req,res)=>{
    var user = {
        user_id:req.body.user_id,
        user_name:req.body.user_name,
        password:req.body.password,
        email:req.body.email
    }
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("users").insertOne(user).then(()=>{
           console.log("user-added")
           res.send("user added success")
        })
    })
})

//update user
app.put("/update-user/:id",(req,res)=>{
    var user = {
        user_id : req.body.user_id,
        user_name:req.body.user_name,
        password:req.body.password,
        email:req.body.email
    }
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("users").updateOne({user_id:req.params.id},{$set:user}).then(()=>{
            console.log("user updated")
            res.send("user updated success")
        })
    })
})

//user delete
app.delete("/delete-user/:id",(req,res)=>{
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("users").deleteOne({user_id:req.params.id}).then(()=>{
            console.log("user deleted")
            res.send("user deleted success")
        })
    })

})

//Get all appointments
app.get("/appointments",(req,res)=>{
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("appointments").find({}).toArray().then(document=>{
            res.send(document)
        })
    })
})

//Get appointment based on id
app.get("/appointment/:id",(req,res)=>{
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("appointments").findOne({appointment_id:parseInt(req.params.id)}).then(document=>{
            res.send(document)
        })
    })
})

//Get appointment based on user-id
app.get("/appointments/:user_id",(req,res)=>{
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("appointments").find({user_id:req.params.user_id}).toArray().then(document=>{
            res.send(document)
        })
    })
})

//Add new appointment 
app.post("/add-appointment",(req,res)=>{
    var appointment = {
         appointment_id:parseInt(req.body.appointment_id),
         title:req.body.title,
         description:req.body.description,
         date : new Date(req.body.date),
         user_id:req.body.user_id
    }
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("appointments").insertOne(appointment).then(()=>{
            console.log("appointment added")
            res.send("appointment added success")
        })
    })
})

//update appointment
app.put("/update-appointment/:id",(req,res)=>{
          var appointment = {
         appointment_id:parseInt(req.body.appointment_id),
         title:req.body.title,
         description:req.body.description,
         date : new Date(req.body.date),
         user_id:req.body.user_id
    }
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("appointments").updateOne({appointment_id:parseInt(req.params.id)},{$set:appointment}).then(()=>{
            console.log("appointment updated")
            res.send("appointment update success")
        })
    })
})

//Delete appointment
app.delete("/delete-appointment/:id",(req,res)=>{
    mongoClient.connect(mongodb).then(obj=>{
        database = obj.db("business")
        database.collection("appointments").deleteOne({appointment_id:parseInt(req.params.id)}).then(()=>{
            console.log("appointment deleted")
            res.send("appointment deleted success")
        })
    })
})

//For unknown path
app.use((req,res)=>{
    res.status(404).write("404 - Not found")
    res.end()
})

app.listen(4000)
console.log("server : http://127.0.0.1:4000")