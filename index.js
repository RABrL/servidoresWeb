const express = require('express')
const services = require('./src/services.js')

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', function (req, res) {
  res.json({
    message: 'Lista de usuarios',
    body: services.getUsers()
  })
})

app.get('/:id', function (req, res) {
  const { params: { id } } = req
  res.json(services.getUser(id))
})

app.post('/', (req, res) => {
  const newUser = req.body
  services.createUser(newUser)
  res.status(201).json({
    message: 'El usuario fue creado'
  })
})

app.put('/:id', (req, res) => {
  const { params: { id }, body } = req
  services.updateUser(id, body)
  res.json({
    message: `Usuario ${id} actualizado con exito`
  })
})

app.delete('/:id', (req, res) => {
  const { params: { id } } = req
  res.json(services.deleteUser(id))
})

app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`))
