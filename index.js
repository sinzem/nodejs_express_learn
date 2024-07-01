import 'dotenv/config'; /* (подключение .env) */;
import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';

const PASSWORD = process.env.MONGO_PASSWORD;
const PORT = 5000;
const DB_URL = `mongodb+srv://sinzem:${PASSWORD}@cluster0.linefxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();  /* (создаем придожение) */
app.use(express.json()); /* (подключаем метод для работы с json, эндпоинты без него не работают) */
app.use(express.static('static')); /* (подключаем метод для работы со статическими файлами, передаем путь к папке с файлами - localhost:5000/name.jpg - выводит сохраненное изображение) */
app.use(fileUpload({})); /* (подключаем миддлвер для загрузки файлов) */
app.use('/api', router); /* (подключаем роутер, путь теперь будет через api(localhost:5000/api/posts)) */

async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)); 
    } catch (e) {
        console.log(e);
    }
}

startApp();

