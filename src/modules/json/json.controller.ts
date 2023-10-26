import { Request, Response } from 'express'

export const getJSONData = async (req: Request, res: Response) => {
    res.send({})
}

export const updateJSONData = async (req: Request, res: Response) => {
    res.send(true)
}
