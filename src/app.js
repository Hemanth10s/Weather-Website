const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define paths for Express Config
const pd=path.join(__dirname,'../public')
const vd=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views',vd)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

//Set up static directory to serve
app.use(express.static(pd))

//routes
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Hemanth.S'
    })
})

app.get('/about',(req,res)=>{
  res.render('about',{
      title:'About',
      name:'Hemanth.S'
    })  
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Hemanth.S',
        message:'The page that runs the place.'
      })  
  })
  
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Address must be provided'})
    }else{
        geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }
                return res.send({location:location,Forecast:forecastData,address:req.query.address})
            })
        })
        
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('my404',{
        title:'404',
        name:'Hemanth.S',
        message:'Help article not found.'
      })
})

app.get('*',(req,res)=>{
    res.render('My404',{
        title:'404',
        name:'Hemanth.S',
        message:'Page not found.'
      })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})