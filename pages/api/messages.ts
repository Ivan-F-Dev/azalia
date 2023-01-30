import promisify from "../../helpers/promisify";
import path from "path";
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler (req: NextApiRequest,res: NextApiResponse) {
    if (req.method === "POST") {
        try {
            const buffer = await promisify.readFileAsync(path.join(process.cwd(),"/json/messages.json"))
            const messages = JSON.parse(buffer)
            const reqBody: {text:string,author:string} = JSON.parse(req.body)

            const newMessages = [...messages,{text:reqBody.text,author:reqBody.author}]
            await promisify.writeFileAsync(path.join(process.cwd(),"/json/messages.json"),JSON.stringify(newMessages))

            res.json({messages,newMessages})
        } catch (err) {
            res.status(500).json({err})
        }
    }
}