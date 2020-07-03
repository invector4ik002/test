const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
// app.use('/api/link', require('./routes/link.routes')); // подключаем мидлвр обработка API запросов с ФРОНТА с маршрутизатором link.routes(логикой отправок и запросов)
app.use('/api/post', require('./routes/post.routes'));

const PORT = config.get('port') || 4000;
/**
 * Функция подключения 
 * "mongoUri": "mongodb+srv://MikDev:123MikDev@cluster0-egprj.mongodb.net/app",
 */
async function start() {
   try {
      await mongoose.connect(config.get('mongoUri'),{
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
      })
      app.listen(PORT, () => {
         console.log(`Work: ...serwer ${PORT}`)
      })
   } catch (err) {
      process.exit(1)
   }
}
start();