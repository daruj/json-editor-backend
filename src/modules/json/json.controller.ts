import { Request, Response } from 'express'
import * as JSONService from './json.service'
import { sendMessageToAllClients } from '@src/websocket'
import { config } from '@src/config'
import { CustomError } from '@src/errors'

/**
 * Asynchronously retrieves JSON data and sends it as a response.
 *
 * @function
 * @async
 * @param {Request} _ - An Express Request object (unused).
 * @param {Response} res - An Express Response object for sending the JSON data response.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 * @throws {Error} If there's an internal server error during data retrieval.
 */
export const getJSONData = async (_: Request, res: Response) => {
    res.send(await JSONService.getJSONData()).status(200)
}

/**
 * Asynchronously validates and updates JSON data, sending the updated data as a response.
 *
 * @function
 * @async
 * @param {Request} req - An Express Request object containing JSON data to be updated in the request body.
 * @param {Response} res - An Express Response object for sending the response.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 * @throws {Error} If the incoming JSON data is invalid.
 */
export const updateJSONData = async (req: Request, res: Response) => {
    let jsonData = {}

    try {
        jsonData = JSON.parse(req.body.json)

        if (!jsonData || typeof jsonData !== 'object') {
            throw new Error('The JSON is a required parameter or is not a valid object')
        }
    } catch (error) {
        let errorMessage = 'An unexpected error ocurred'

        if (error instanceof CustomError) {
            errorMessage = error.message
        }

        console.error(errorMessage, error)
        return res.send(errorMessage).status(400)
    }

    const result = await JSONService.updateJSONData(jsonData)

    if (!result) {
        return res.send('We were not able to update the json').status(500)
    }

    sendMessageToAllClients(config.wsEvents.JSON_UPDATED, JSON.stringify(jsonData))

    res.send(jsonData).status(200)
}
