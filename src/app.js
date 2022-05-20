const express=require('express');
const path=require("path");
const geocode=require("./utils/geocode.js");
const forecast=require("./utils/forecast.js");
const hbs=require('hbs');

const app=express();
const port=process.env.PORT || 3000
app.set("view engine","hbs");
const view_path=path.join(__dirname,"../templates/views");
const publicdirpath=path.join(__dirname,"../public")
const partials_path=path.join(__dirname,"../templates/partials");
app.use(express.static(publicdirpath))
app.set("views",view_path);
hbs.registerPartials(partials_path);
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Hetvi'
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({error:"You must provide an address"});
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({error});
        }
        forecast(latitude,longitude,(error,datas)=>{
            if(error)
            {
                return res.send({error});
            }
            res.send({
            location,   
            forecast: datas,
            address: req.query.address})  
        })
    })
    
})
app.get("/about",(req,res)=>{
    res.render("about",{name:"Hetvi",title:"About Me"});
})
app.get("*",(req,res)=>{
    res.render("404",{name:"Hetvi",title:"About Me",errorMessage:"No such page available"});
})

app.listen(port,()=>{
   // console.log("http://localhost:3000")
   console.log(port)
})