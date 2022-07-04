const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose
  .connect("mongodb://127.0.0.1/Blog_data",)
  .then(() => {
    console.log(`Connected to MongoDB`);
  }) 
  .catch((err) => {
    console.log(`Oh No ERROR!`);
    console.log(err);
  });

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().limit(5).sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})


app.use('/articles', articleRouter)
app.use(express.static(__dirname + '/public'));

app.listen(8080, () => {
  console.log("Server Listening at PORT 8080");
});
