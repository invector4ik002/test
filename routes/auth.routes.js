const { Router } = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const router = Router();
// /api/auth/register  /api/auth прописано в app.js
router.post('/register', // регистрация "POST" 
   [ 
      check('email', 'Некорректный email').isEmail(),
      check('password', 'Минимальная длинна пароля 6 символов').isLength({ min: 6 })
   ],
   
   async (req, res) => { // асинхронная запрос(req) ответ(res) 
      try {
      const errors = validationResult(req); //  validationResult(req) результат на наличие ошибок при реквесте (собрали с боди)
      console.log(errors)
      if(!errors.isEmpty()) { // !errors.isEmpty() метод говорит если метод  isEmpty() не пустой тогда ОШИБКИ
         return res.status(400).json({  // выводим на ФРОНТ(res)
            errors: errors.array(),
            message: 'Некорректные данные при регистрации'
         })
      }

     const { email, password } = req.body;

     const condidate = await User.findOne({ email });

      if(condidate) { // после поиска в BD если наш из боди email совпадает с email в BD тогда return ошибка 
         return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(password, 12); // шифруем пароль на 12 раундов
      const user = new User({ email, password: hashedPassword }); // создаем поль.по классу-модели User созраняем email и зашиф.пароль(password: hashedPassword)
      await user.save(); // метод сохранения после все ложится в BD
      res.status(201).json({ message: 'Пользовыатель создан' });

   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' });
   }
});

// /api/auth/login  /api/auth 
router.post( // отправка на BD 
   '/login', 
   [
      check('email', 'Введите корректный email').normalizeEmail().isEmail(),
      check('password', 'Введите пароль').exists()
   ],
   async (req, res) => {
      
   try {
       const errors = validationResult(req); // validationResult(req) результат на наличие ошибок при реквесте (собрали с боди)
         if(!errors.isEmpty()) { // !errors.isEmpty() метод говорит если метод  isEmpty() не пустой тогда ОШИБКИ
            return res.status(400).json({ 
            errors: errors.array(),
            message: 'Некорректные данные при входе в систему'
         })
      }
      
      const {email, password} = req.body;// поля из боди это с браузера req - запрос и формы для отправки с ФРОНТА

      const user = await User.findOne({ email });// проверка на уже существующего пользователя
     
      if(!user) { // если нет пользователя (значит не зарегался)
        return res.status(400).json({ message: 'Пользователь не найден'}) 
      }
   
      const isMatch = await bcrypt.compare(password, user.password); // метод bcrypt.compare сравнивает поле "password" user.password пароль пользователя

      if(!isMatch) { 
         return res.status(400).json({ message: 'Неверный пароль' })
      }
      
      const token = jwt.sign(
         { 
            userId: user.id 
         },
         config.get('jwtSecret'),
         { 
            expiresIn: '1h' 
         }
      );
      
      res.json({ token, userId: user.id });
      
   } catch (err) {
      res.status(500).json({ message: '...Error server !!!' })
   }
});

module.exports = router;