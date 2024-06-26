const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));



app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})
// 1769a9b7f1d8ac3b903aa321727d1cf5-us17
// ce91df9500
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.post("/",function(req,res){
    const firstName=req.body.first;
    const secondName= req.body.last;
    const email=req.body.email; 
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: secondName
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);

    const url="https://us17.api.mailchimp.com/3.0/lists/ce91df9500";
    const options={
        method:"POST",
        auth:"premjp:1769a9b7f1d8ac3b903aa321727d1cf5-us17"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        } else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})

app.listen(3000,function(){
    console.log("Server started on the port 3000");
})