const { Router } = require('express'); // из библиотеки подключаем Router
const Post = require('../models/Post'); // принемаем модель (объкт с полями настроек наших ссылок)
const router = Router() // создаем (обьект) при помощи функции Router
// const auth = require('../middleware/auth.middleware');

router.post('/generate', async (req, res) => { // по этой ссылке будет происходить генерация ссылок "сокращенная"
   try {
      const { name, content } = req.body;

      const post = new Post ({
         name,
         content, 
         // owner
      })
      await post.save(); // сохранеяем ссылку на БД

      res.status(201).json({ post })// отображаем в консоли нетворк ссылку которую сохранили и вернули с БД 

   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});
/**
 * @param{auth} - в переменной auth заложана логика расшифровки токена в котором есть нужное поле userId 
 * теперь не авторизованные пользователи не могут создавать ссылки 
 */
router.get('/', async (req, res) => { // гет запрос для получения всех ссылок и возвращают их
   try { // получение данных пользователя с фронтенда получится по jwtToken потому что в нем закодирован userId это также пригодятся для 
   // привязывания новой ссылки к пользователю
     const posts = await Post.find(req.params._id) // в переменной (обьект-модель) в которой находим ссылки владельца
     
     res.json(posts) // получаем на фронт обьект по модели
   //   console.log(post)// ?
   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});
router.put('/:id', async (req, res) => { // гет запрос для получения всех ссылок и возвращают их
   try { // получение данных пользователя с фронтенда получится по jwtToken потому что в нем закодирован userId это также пригодятся для 
   // привязывания новой ссылки к пользователю
   //   const id = new objectId(req.body._id);
   //   const  userName = req.body.name;
   //   const userContent  = req.body.content;


     const post = await Post.findOneAndUpdate( {_id: id}, { $set: { name: userName, content: userContent }} ) // в переменной (обьект-модель) в которой находим ссылки владельца

   //   await post.save();
     res.json(post) // получаем на фронт обьект по модели
   //   console.log(post)// ?
   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});

// router.get('/:id', auth, async (req, res) => { // гет запрос для получения ссылок по id и возвращают их
//    try {
//      const post = await Post.findById(req.params.id) // в переменной (обьек-ссылка по id) в которой находим врадельца по .findById
//      res.json(post) // получаем на фронт (обьект-ссылку) из модели
//    } catch (err) {
//    res.status(500).json({ message: '...Error server !!!' })
//    }
// });

module.exports = router // экспортируем данный модуль