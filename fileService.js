import * as uuid from 'uuid'; /* (плагин для генерации id) */
import * as path from 'path';

/* (класс для работы с загружаемыми файлами) */
class FileService {
    saveFile(file) { /* (аргументом будет приходить загружаемый файл) */
        try {
            const fileName = uuid.v4() + '.jpg'; /* (генерируем новое название, добавляем разрешение) */
            const filePath = path.resolve('static', fileName); /* (составляем путь перемещения(в папку static)) */
            file.mv(filePath); /* (mv переместит файл) */
            return fileName; /* (возвращаем путь к файлу - нужно добавить к обькету в БД) */
        } catch (e) {
            console.log(e);
        }
    }
}

export default new FileService(); /* (используем в PostService) */