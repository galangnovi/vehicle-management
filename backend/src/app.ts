import express from 'express'
import cookieParser from 'cookie-parser'
import auth from "./routes/auth"
import userManagement from "./routes/userManagement"
import vehicle from "./routes/vehicle"
import xlsx from "./routes/xlsx-generator"
import corsMiddleware from './middlewares/cors'
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const app = express()
const port = 3000

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(corsMiddleware)

app.use("/auth", auth)
app.use("/user", userManagement)
app.use("/vehicle", vehicle)
app.use("/download-xlsx", xlsx)

const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})