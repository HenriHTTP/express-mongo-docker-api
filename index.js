const Express = require('express');
const app = Express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(Express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('a rina nao me ama');
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
