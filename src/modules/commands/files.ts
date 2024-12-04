import * as fs from 'fs';

class File {
    async create(directory: string, fileName: string) {
        try {
            fs.appendFileSync(`${directory}/${fileName}`, '');
        } catch (err) {
            console.error('Error writing file ', err);
        }
    }

    async remove(directory: string, fileName: string) {
        try {
            fs.unlinkSync(`${directory}/${fileName}`);
        } catch (err) {
            console.error('Error unlinking file ', err);
        }
    }
}

class Directory {
    async create(path: string) {
        try {
            fs.mkdirSync(path);
        } catch (err) {
            console.error('Error writing directory ', err);
        }
    }

    async remove(path: string) {
        try {
            fs.rmdirSync(path);
        } catch (err) {
            console.error('Error unlinking directory ', err);
        }
        
    }
}