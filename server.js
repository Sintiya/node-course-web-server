const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
app.set('view engine','hbs')
hbs.registerPartials(__dirname + '/views/partials')
app.use(express.static(__dirname + '/public'));
// app.get('/',(req,res)=>{
//   //res.send('<h1>hello express!</h1>');
//   res.send({
//     name:'sinti',
//     likes : ['travelling','chess']
//   })
// });

app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url} `
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err)=>{
    if(err){
      console.log('Unable to capture log')
    }
  });
  next();
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/',(req,res)=>{res.render('home.hbs',{
  pageTitle:'Home Page',
  currentYear:new Date().getFullYear(),
  welcomeMessage:'Welcome to HBS'
})
});
app.get('/about',(req,res)=>{
  //res.send('about');
  res.render('about.hbs',{
    pageTitle:'About Page',

  })
});

app.get('/project',(req,res)=>{
  //res.send('about');
  res.render('project.hbs',{
    pageTitle:'Project Page',

  })
})



app.get('/bad',(req,res)=>{
  res.send({
    errorMessage : 'Unable to fulfill the request'
  });
})
app.listen(port,()=>{
  console.log(`server is running on the port ${port}`)
});
