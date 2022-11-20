import { Request, Response } from "express"
import { UploadedFile } from "express-fileupload"
import { getFileByNameService, saveFileService, updateFileByNameService } from "../services/files.service"
import log from "../utils/logger"

const getFileByNameHandler = (req: Request, res: Response): any => {
    try {
        const { name } = req.params
        const file = getFileByNameService(name)
        return res.send(file)
    } catch (error) {
        // log error to file
        log(error as string)
        return res.status(500).send("Internal Server Error")
    }
}

const updateFileByNameHandler = (req: Request, res: Response): any => {
    try {
        const { name } = req.params
        const { content } = req.body
        updateFileByNameService(name, content)
        return res.send('File updated successfully')
    } catch (error) {
        // log error to file
        log(error as string)
        return res.status(500).send("Internal Server Error")
    }
}

const uploadFileHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { file } = req.files as { file: UploadedFile }
        const filePath = await saveFileService(file)
        res.send(filePath)
    } catch (error: any) {
        // log error to file
        log(error as string)
        res.status(500).send(error.message)
    }
}

export { getFileByNameHandler, updateFileByNameHandler, uploadFileHandler }