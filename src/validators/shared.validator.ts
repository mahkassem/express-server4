import fs from 'fs'

const fileExists = (path: string): boolean => {
    return fs.existsSync(path)
}

const strRequired = (str: string): boolean => {
    if (str == null || str === undefined || str === "")
        return true
    return false
}

export { fileExists, strRequired }