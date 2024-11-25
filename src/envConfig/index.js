import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.join(process.cwd(),'.env')})

export default{
    databaseUrl:process.env.MONGODB_URL,
    web_link:process.env.WEB_LINK
}