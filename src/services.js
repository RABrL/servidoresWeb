const data = require('./MOCK_DATA.json')
const fs = require('fs').promises
const path = require('path')

module.exports = {
  getUsers: () => data,

  getUser: (id) => {
    const user = data.find(user => user.id === +id)
    if (!user) return { message: `El usuario ${id} no existe` }
    return {
      message: `Usuario ${id}`,
      body: user
    }
  },

  createUser: async (dataUser) => {
    const newUser = {
      id: data[data.length - 1].id + 1,
      ...dataUser
    }
    await fs.writeFile(path.join(__dirname, 'MOCK_DATA.json'), JSON.stringify([...data, newUser]))
  },

  updateUser: async (id, { first_name, last_name, email }) => {
    const user = data.find(user => user.id === +id)
    user.first_name = first_name
    user.last_name = last_name
    user.email = email
    await fs.writeFile(path.join(__dirname, 'MOCK_DATA.json'), JSON.stringify(data))
  },

  deleteUser: async (id) => {
    const userToDelete = data.find(user => user.id === +id)
    if (!userToDelete) return { message: `El usuario ${id} no existe` }
    const newData = data.filter(user => user.id !== userToDelete.id)
    await fs.writeFile(path.join(__dirname, 'MOCK_DATA.json'), JSON.stringify(newData))
  }
}
