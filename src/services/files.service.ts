import { UploadedFile } from 'express-fileupload'
import fs from 'fs'
import path from 'path'

const getFileByNameService = (name: string): Buffer => {
    const basePath = path.join(__dirname, '..', '..', 'storage')
    return fs.readFileSync(path.join(basePath, name))
}

const updateFileByNameService = (name: string, content: string): void => {
    const basePath = path.join(__dirname, '..', '..', 'storage')
    fs.writeFileSync(path.join(basePath, name), content)
}

const saveFileService = async (file: UploadedFile): Promise<string> => {
    const timestamp = Date.now();
    const filePath = `storage/${timestamp}_${file.name}`;
    const fullPath = path.join(__dirname, '..', '..', filePath)
    await file.mv(fullPath)
    return filePath
}

export { getFileByNameService, updateFileByNameService, saveFileService }