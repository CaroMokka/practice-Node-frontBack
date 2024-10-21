const express = require("express")

const app = express()

const port = 3000

app.use("/public/", express.static(`${__dirname}/assets`))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.listen( port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})