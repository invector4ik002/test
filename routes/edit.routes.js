// const { Router } = require('express'); // из библиотеки подключаем Router
// const Post = require('../models/Post'); // принемаем модель (объкт с полями настроек наших ссылок)
// const router = Router() // создаем (обьект) при помощи функции Router




// router.put('/:id', async (req, res) => { // гет запрос для получения всех ссылок и возвращают их
//    try { // получение данных пользователя с фронтенда получится по jwtToken потому что в нем закодирован userId это также пригодятся для 
//    // привязывания новой ссылки к пользователю
//    //   const id = new objectId(req.body._id);
//    //   const  userName = req.body.name;
//    //   const userContent  = req.body.content;

//      const post = await Post.findOneAndUpdate( {_id: id}, { $set: { name: userName, content: userContent }} ) // в переменной (обьект-модель) в которой находим ссылки владельца

//    //   await post.save();
//      res.json(post) // получаем на фронт обьект по модели
//    //   console.log(post)// ?
//    } catch (err) {
//       res.status(500).json({ message: '...Error server !!!' })
//    }
// });