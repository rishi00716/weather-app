const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for express config
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup directory
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather app',
        name:'Case'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About CASE',
        name:'Case'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message:'WE ARE READY TO HELP!',
        title:'HELP',
        name:'Case'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'Provide an address',
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        }) 
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'Provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404 Help',
        name:'Case',
        errorMessage:'Help Article Not Found!'
    })
})

app.get('*',(erq,res) => {
    res.render('404',{
        title:'404',
        name:'Case',
        errorMessage:'Page Not Found!'
    })
})

app.listen(3000,() => {
    console.log('Server started ....')
})