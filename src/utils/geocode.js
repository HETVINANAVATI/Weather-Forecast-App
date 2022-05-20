const request = require('request');
const geocode=(address,callback)=>{
    const url1="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1IjoiaGV0dmkxOCIsImEiOiJjbDNjeHoybmMwMm1nM2tsNXJtYmo3YmV0In0.jKczdsE7FBnxxMYN0pq0lA&limit=1";
    request({url:url1,json:true},(error,{body})=>{
        if(error)
        {
           callback("Check Connection",undefined);
        }
        else if(body.features.length===0)
        {
            callback("Unable to find loacation",undefined);
        }
        else
        {
          callback(undefined,{latitude:body.features[0].center[1],longitude:body.features[0].center[0],location:body.features[0].place_name}
            );
        }
         
      })
}
module.exports=geocode;