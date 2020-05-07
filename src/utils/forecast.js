const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/2baabcfa2722c27effe0d074a4a6e5f6/'+latitude+','+longitude+'?units=si'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather services.',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }else{
            const forecastMessage=body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out.There is a '+body.currently.precipProbability+'% chance of rain.The maximum temperature today is '+body.daily.data[0].temperatureHigh+'degrees with a minimum temperatur of'+body.daily.data[0].temperatureLow+'degrees.'
            callback(undefined,forecastMessage)
        }
     
    })
}
module.exports=forecast