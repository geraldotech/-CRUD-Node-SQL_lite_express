// arquivo router.js melhor escalabilidade, manutencao do code

// openDb
//import { openDb } from './configDB.js'
import { createTable, insertPessoa, updatePessoa, selectPessoas, selectPessoarouter, selectPessoa, deletePessoa, Home, dashboardAdmin, loginHandler } from './Controler/Pessoa.js'
import express, { Router } from 'express'
import basicAuth from 'express-basic-auth'

// Define your credentials
const users = {
  geraldo: '12@',
  felipe: 'fel123'
}

// Middleware for basic authentication
const authMiddleware = basicAuth({
  users: users,
  challenge: true,
  unauthorizedResponse: {
    // Resposta personalizada para solicitações não autorizadas
    status: 401,
    message: 'Acesso não autorizado',
  }, // Respond with 401 authentication challenge
})

const router = Router()

router.get('/', Home)
router.get('/status', (req, res) => {
  res.json({
    status: 200,
    message: 'API running',
  })
})
router.get('/admin', authMiddleware, dashboardAdmin)
router.get('/login', loginHandler)

/* Pessoas */
router.get('/pessoas', selectPessoas)
router.get('/pessoa', selectPessoa)
router.get('/pessoa/:id', selectPessoarouter)
router.post('/pessoa', authMiddleware, insertPessoa)
router.delete('/pessoa', authMiddleware, deletePessoa)

// previous way to study
router.put('/pessoa', authMiddleware, (req, res) => {
  if (req.body && !req.body.id) {
    return res.json({
      statusCode: 400,
      message: 'Precisa de um id',
    })
  }

  // validation nome exists
  const { nome } = req.body

  if (!nome) {
    return res.json({ statusCode: 204, message: 'name is required' })
  }

  updatePessoa(req.body)
  res.json({
    statusCode: 200,
    message: 'Update Successful',
  })
})

// custom logout basic auth
router.get('/logout', (req, res) => {
  // Respond with 401 status code to clear browser credentials
  res.status(401).send('Logged out <a href="/admin">Log admin</a>')
})

/* createTable()

app.get('/', (req, res) => {
  res.send('Hello')
})

app.get('/pessoas', async (req, res) => {
  let pessoas = await selectPessoas()
  res.json(pessoas)
})
app.get('/pessoa', async (req, res) => {
  let pessoa = await selectPessoa(req.body.id)
  res.json(pessoa)
})

app.post('/pessoa', (req, res) => {
  //console.log(req.body)
  insertPessoa(req.body)
  res.json({
    statusCode: 200,
  })
})

app.put('/pessoa', (req, res) => {
  if (req.body && !req.body.id) {
    return res.json({
      statusCode: '400',
      msg: 'Precisa de um id',
    })
  }

  updatePessoa(req.body)
  res.json({
    statusCode: 200,
  })
})


app.delete('/pessoa', async (req, res) => {
  let pessoa = await deletePessoa(req.body.id)
  res.json(pessoa)
}) */

export default router
