// jshint esversion: 6

const express=require("express");
const request=require("request");
const https=require("https");
const { url } = require("inspector");
const { post } = require("request");


const app=express();



// for statics files
app.use(express.static("public"));

// // body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.get("/",(req,res)=>{

res.sendFile(__dirname+"/singup.html");

});




app.post("/",(req,res)=>{

var firstName=req.body.fName;
var lastName=req.body.lName;
var email=req.body.email;

const data={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }

        }
    ]
}

const jsonData=JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/1fb8aa1a21";

const options = {
  method: "POST",
  auth: "sohailj08:896389c4adfc1a4e7430538c40241ce1-us6"
};

const request=https.request(url,options,function(response){

    if(response.statusCode===2000){
        res.sendFile(__dirname+"/sucess.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

    response.on("data",function(data){
        console.log(JSON.parse(data));
    })

})

request.write(jsonData);
request.end();

});

// post request for failure

app.post("/failure",(req,res)=>{

    res.redirect("/");
});


app.listen(process.env.PORT||3000,()=>{
    console.log("Server is running");
});






// 896389c4adfc1a4e7430538c40241ce1-us6

// list id
// 1fb8aa1a21.