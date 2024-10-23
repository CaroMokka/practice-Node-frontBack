const express = require("express")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")
const clc = require("cli-color");
const { response } = require("express");
const { validate, clean, format, getCheckDigit } = require('rut.js')

const port = 3000
const app = express()

const dataFile = `${__dirname}/data/personas.txt`

app.use("/public/", express.static(`${__dirname}/assets`))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})

app.get("/registrar-persona", (req, res) => {
    let rut = req.query.rut
    const nombre = req.query.nombre
    const apellido = req.query.apellido

    try {
        if(rut == "") { return res.status(409).json({ "message": "Ingresar rut" }) }
        if(!validate(rut)) {
            return res.status(409).json({ "message": "Rut inválido" })
        }
        rut = format(rut)

        
     

        //Línea para forzar error
        //throw "Error de registro"

        const persona = {
            id: uuidv4(),
            rut,
            nombre,
            apellido
        }
        console.log(persona)
    
        const contentTxt = fs.readFileSync(dataFile, "utf-8")
        const contentJS = JSON.parse(contentTxt)
    
        const busqueda = contentJS.find( item => item.rut === rut )
        if(busqueda) return res.status(409).json({ "message": "RUT registrado previamente"})

        if(nombre == "") { return res.status(409).json({ "message": "Ingresar nombre" }) }
        if(apellido == "") { return res.status(409).json({ "message": "Ingresar apellido" }) }
    
        contentJS.push(persona)
    
        fs.writeFileSync(`${dataFile}`, JSON.stringify(contentJS), "utf-8")
    

        res.json({ message: "Registro éxitoso", data: persona })
    } catch(err){
        response.status(500).json({"message": "Ocurrió un error, intente más tarde."})
    }
    

   
  
    
})

app.get("/listar-registro", (request, response) => {

    const contentTxt = fs.readFileSync(dataFile, "utf-8")
    const contentJS = JSON.parse(contentTxt)
    response.json({ message: "Lista de registro actual", data: contentJS })
})

app.listen( port, () => console.log(`Servidor escuchando en el puerto ${port}`))
