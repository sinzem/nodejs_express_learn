import Post from './Post.js';
import fileService from './fileService.js';

/* (выносим функционал связи с БД из PostController в отдельный класс - в реальных проектах эти методы понадобится переиспользовать, и будут они побольше) */
class PostService {
    async create(post, picture) {
        const fileName = fileService.saveFile(picture); /* (полученную картинку отправляем в класс fileService на сохранение, а вернувшееся новое название передаем в функцию для внесения в БД(ниже)) */
        const createdPost = await Post.create({...post, picture: fileName}); 
        return createdPost;  
    }

    async getAll() {
        const posts = await Post.find(); /* (find получит весь список) */
        return posts; 
    }

    async getOne(id) {
        if (!id) {
            throw new Error('ID not specified!');
        } 
        const post = await Post.findById(id); /* (findById вернет обьект из базы по заданному id) */
        return post; 
    }

    async update(post) {
        if (!post._id) { /* (проверяем на наличие id) */
            throw new Error('ID not specified!');
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true}); /* (findByIdAndUpdate обновит запись - передаем id, тело с новыми данными и опцию, которая вернет обновленную запись) */
        return updatedPost;
    }

    async delete(id) {
        if (!id) { /* (проверяем на наличие id) */
            throw new Error('ID not specified!');
        }
        const post = await Post.findByIdAndDelete(id); /* (удаляет по id) */
        return post;
    }
}

export default new PostService();