const { Router } = require('express'); // из библиотеки подключаем Router
const Post = require('../models/Post'); // принемаем модель (объкт с полями настроек наших ссылок)
const router = Router() // создаем (обьект) при помощи функции Router

router.post('/generate', async (req, res) => { // по этой ссылке будет происходить генерация ссылок "сокращенная"
   try {
      const { name, content } = req.body;

      const post = new Post ({
         name,
         content, 
      })
      await post.save(); // сохранеяем ссылку на БД

      res.status(201).json(post)// отображаем в консоли нетворк ссылку которую сохранили и вернули с БД 
     
   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});

router.get('/', async (req, res) => { 
   try { 
     const posts = await Post.find(req.params.id) 
     res.json(posts) 
   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});


router.put('/:id', async (req, res) => { 
   try {
      
      // console.log('REQ id:', requestId);
      // console.log('REQ NAME', NAME);
      // console.log('REQ CONTENT', CONTENT);

     const post = await Post.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true})
     res.status(200).json(post);
   //   console.log('RES id:', post._id);
   //   console.log('RES name:', post.name);
   //   console.log('RES content:', post.content);
   } catch (err) {
   res.status(500).json({ message: '...Error server !!!' })
   }
});
router.delete('/:id', async (req, res) => { 
   try {
      const requestId = req.params.id;
      const NAME = req.body.name;
      const CONTENT = req.body.content;
      console.log('REQ id:', requestId);
      console.log('REQ NAME', NAME);
      console.log('REQ CONTENT', CONTENT);

     const post = await Post.findOneAndDelete({_id: req.params.id})
     res.status(200).json(post);
     console.log('RES id:', post._id);
     console.log('RES name:', post.name);
     console.log('RES content:', post.content);
   } catch (err) {
   res.status(500).json({ message: '...Error server !!!' })
   }
});

module.exports = router 