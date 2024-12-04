import * as fs from 'fs';

export class FileSystem {
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

export class DirectorySystem {
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