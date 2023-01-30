import promisify from "../../helpers/promisify";
import path from "path";
import {NextApiRequest, NextApiResponse} from "next";
import getAverage from "../../helpers/getAverage";

type TAverageData = Array<{prev: number,cur: number, average: number}>

export default async function handler (req: NextApiRequest,res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const buffer = await promisify.readFileAsync(path.join(process.cwd(),"/json/average.json"))
            const numbers = JSON.parse(buffer)
            res.status(200).json(numbers)
        } catch (err) {
            res.status(500).json({err})
        }
    }
    if (req.method === "POST") {
        try {
            const buffer = await promisify.readFileAsync(path.join(process.cwd(),"/json/average.json"))
            const numbers: TAverageData = JSON.parse(buffer)
            const reqBody: {number:number} = JSON.parse(req.body)

            const prevNum = +numbers[numbers.length-1].cur
            const currentNum = +reqBody.number
            const averageNum = getAverage(prevNum,currentNum)

            const newNumbers = [...numbers,{prev: prevNum,cur: currentNum, average: averageNum}]
            await promisify.writeFileAsync(path.join(process.cwd(),"/json/average.json"),JSON.stringify(newNumbers))
            res.json({numbers, newNumbers})
        } catch (err) {
            res.status(500).json({err, qwe: 'qwe'})
        }
    }
}