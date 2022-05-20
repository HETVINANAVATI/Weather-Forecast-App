const request = require('request');
const forecast=(lat,long,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=5c596fae2ef19e7e7c15acb601af9bd3&query="+lat+","+long+"&units=f";
    request({url:url,json:true},(error,{body})=>{
        
       if(error)
       {
           callback("Check Connection",undefined)
       }
       else if(body.error){
          callback("Unable to find location",undefined)
       }
       else
       {
        callback(undefined,
            'Current_Temperature:'+ body.current.temperature +',Current_Weather_description:'+body.current.weather_descriptions +',Current_chances_to_Rain:'+ body.current.precip)
       }
       
    }) 
}
module.exports=forecast;