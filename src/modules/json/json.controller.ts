import { Request, Response } from 'express'
import * as JSONService from './json.service'

export const getJSONData = async (_: Request, res: Response) => {
    res.send(await JSONService.getJSONData()).status(200)
}

export const updateJSONData = async (req: Request, res: Response) => {
    let jsonData = req.body.json

    try {
        if (!jsonData || typeof jsonData !== 'object') {
            throw new Error('The JSON is a required parameter')
        }

        // with this I validate that the json is valid
        jsonData = JSON.parse(JSON.stringify(jsonData))
    } catch (error) {
        const errorMessage = 'The JSON is not valid'
        console.error(errorMessage, error)
        return res.send(errorMessage).status(400)
    }

    const result = await JSONService.updateJSONData(jsonData)

    if (!result) {
        return res.send('We were not able to update the json').status(500)
    }

    res.send(jsonData).status(200)
}
