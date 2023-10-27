import { promises as fs } from 'fs'
import { DynamicObject } from '@src/types/core'
import path from 'path'

const filePath = path.join(__dirname, '..', '..', '..', 'data', 'data.json')

export const getJSONData = async (): Promise<DynamicObject<unknown>> => {
    try {
        const rawData = await fs.readFile(filePath, 'utf8')
        return JSON.parse(rawData)
    } catch (err) {
        console.error('We were not able to retrieve the json data', err)
        return {}
    }
}

export const updateJSONData = async (jsonData: DynamicObject<unknown>): Promise<boolean> => {
    try {
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8')
        return true
    } catch (err) {
        console.error('We were not able to update the json', err)
        return false
    }
}
