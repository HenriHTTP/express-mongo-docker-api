const Express = require('express');
const app = Express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const routes = require('./routes/routes');

// middlewares default
app.use(Express.json());
app.use(cors());

//routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
