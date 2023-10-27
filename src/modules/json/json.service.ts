import { promises as fs } from 'fs'
import { DynamicObject } from '@src/types/core'
import path from 'path'

const filePath = path.join(__dirname, '..', '..', '..', 'data', 'data.json')

/**
 * Asynchronously retrieves JSON data from a file and returns it as a JavaScript object.
 *
 * @function
 * @async
 * @returns {Promise<DynamicObject<unknown>>} A Promise that resolves to the JSON data object.
 * @throws {Error} If there's an error while reading the JSON file.
 */
export const getJSONData = async (): Promise<DynamicObject<unknown>> => {
    try {
        const rawData = await fs.readFile(filePath, 'utf8')
        return JSON.parse(rawData)
    } catch (err) {
        console.error('We were not able to retrieve the json data', err)
        return {}
    }
}

/**
 * Asynchronously updates a JSON file with new data.
 *
 * @function
 * @async
 * @param {DynamicObject<unknown>} jsonData - The JSON data object to be written to the file.
 * @returns {Promise<boolean>} A Promise that resolves to true if the update is successful, or false otherwise.
 * @throws {Error} If there's an error while writing the JSON data to the file.
 */
export const updateJSONData = async (jsonData: DynamicObject<unknown>): Promise<boolean> => {
    try {
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8')
        return true
    } catch (err) {
        console.error('We were not able to update the json', err)
        return false
    }
}
