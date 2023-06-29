const express = require('express')
var bodyParser = require('body-parser');
let ejs = require('ejs');

const app = express()
const port = 3000
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


var items = ["Apple", "Mango"];
var workitems=["Pen","Pencil"]

//-----------------------------///////////
app.get('/', (req, res) => {


  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var today = new Date();


  var print = today.toLocaleDateString("en-US", options);
  res.render("list", { Kindofday: print, pitems: items });
})

app.post('/', (req, res) => {

  var item = req.body.itemName;

  if(req.body.list==="Work list"){

    workitems.push(item);
    res.redirect("/work")
  }
  else {
    items.push(item);
    //console.log(req.body);
    res.redirect('/');
  }
 
})
//---------------------------------/////////

app.get('/work', (req, res) => {
res.render("list", { Kindofday: "Work list", pitems: workitems });
})

app.post('/work', (req, res) => {

  var item = req.body.itemName;
  workitems.push(item);

  res.redirect('/work');
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})