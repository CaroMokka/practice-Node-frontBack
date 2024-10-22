const express = require("express")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const clc = require("cli-color")

const port = 3000
const app = express()

const dataFile = `${__dirname}/data/personas.txt`

app.use("/public/", express.static(`${__dirname}/assets`))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.get("/registrar-persona", (req, res) => {
    const rut = req.query.rut
    const nombre = req.query.nombre
    const apellido = req.query.apellido

    const persona = {
        id: uuidv4(),
        rut,
        nombre,
        apellido
    }

    const contentTxt = fs.readFileSync(dataFile, "utf-8")
    const contentJS = JSON.parse(contentTxt)

    const busqueda = contentJS.find( item => item.rut === rut )
    if(busqueda) return console.log(clc.yellow("Esta persona ya se encuentra registrada."))

    contentJS.push(persona)
    fs.writeFileSync(`${dataFile}`, JSON.stringify(contentJS), "utf-8")
    console.log(contentJS)
    res.json({ message: "Registro éxitoso", data: persona })
})

app.get("/listar-registro", (request, response) => {

    const contentTxt = fs.readFileSync(dataFile, "utf-8")
    const contentJS = JSON.parse(contentTxt)
    response.json({ message: "Lista de registro actual", data: contentJS })
})

app.listen( port, () => console.log(`Servidor escuchando en el puerto ${port}`))
