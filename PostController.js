// import Post from './Post.js';
import PostService from './PostService.js';

class PostController {
    async create(req,res) {
        try {
            // const {author, title, content, picture} = req.body; /* (получаем данные из запроса) */
            // const post = await Post.create({author, title, content, picture}); /* (create создаст запись в БД) */
            /* (выносим функционал в PostService.js) */
            // ------------
            // console.log(req.files); /* (отправляем запрос через postman как форму, добавляем изображение - получить можем как req.files) */
            const post = await PostService.create(req.body, req.files.picture);
            res/* .status(200) */.json(post) /* (возвращаем - статус и сообщение) */
        } catch (e) {
            res.status(500).json(e); /* (обязательно подключаем ошибки, иначе серевер будет виснуть при ошибке) */
        }
    }

    async getAll(req, res) {
        try {
            // const posts = await Post.find(); /* (find получит весь список) */
            /* (выносим функционал в PostService.js) */
            // ------------
            const posts = await PostService.getAll();
            return res.json(posts);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getOne(req, res) {
        try {
            // const {id} = req.params; /* (из запроса получаем id) */
            // if (!id) {
            //     res.status(400).json({message: 'ID not specified!'})
            // } /* (рекоммендуется проверять id на валидность) */
            // const post = await Post.findById(id); /* (findById вернет обьект из базы по заданному id) */
             /* (выносим функционал в PostService.js) */
            // ------------
            const post = await PostService.getOne(req.params.id);
            return res.json(post); 
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async update(req, res) {
        try {
            // const post = req.body; /* (получаем тело для обновленного поста(в запросе должно приходить уже готовое обновление)) */
            // if (!post._id) { /* (проверяем на наличие id) */
            //     res.status(400).json({message: 'ID not specified!'})
            // }
            // const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true}); /* (findByIdAndUpdate обновит эзапись - передаем id, тело с новыми данными и опцию, которая вернет обновленную запись) */
             /* (выносим функционал в PostService.js) */
            // ------------
            const updatedPost = await PostService.update(req.body);
            return res.json(updatedPost);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async delete(req, res) {
        try {
            // const {id} = req.params;
            // if (!id) { /* (проверяем на наличие id) */
            //     res.status(400).json({message: 'ID not specified!'})
            // }
            // const post = await Post.findByIdAndDelete(id); /* (удаляет по id) */
             /* (выносим функционал в PostService.js) */
            // ------------
            const post = await PostService.delete(req.params.id);
            return res.json(post);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

export default new PostController();