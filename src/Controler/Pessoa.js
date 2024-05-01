import { openDb } from '../configDB.js'

export async function createTable() {
  openDb().then((db) => {
    db.exec('CREATE TABLE IF NOT EXISTS Pessoa (id INTEGER PRIMARY KEY, nome, TEXT, idade INTEGER)')
  })
}

export function Home(req, res) {
  res.send('Home Page')
}

export function dashboardAdmin(req, res) {
  //console.log(`req.body`, req.body)
  //res.render('index.html')
  res.sendFile('admin.html', { root: './public' })
}

export function loginHandler(req, res) {
  res.sendFile('login.html', { root: './public' })
}

// export async function insertPessoa(req, res) {
//   let pessoa = req.body

//   openDb()
//     .then((db) => {
//       db.run('INSERT INTO Pessoa (nome, idade, TEXT) VALUES (?, ?, ?)', [pessoa.nome, pessoa.idade, pessoa.TEXT])
//     })
//     .then(() => {
//       res.json({
//         statusCode: 200,
//         message: 'Create Successful',
//       })
//     })
// }

export async function insertPessoa(req, res) {
  let pessoa = req.body

  // validation nome exists
  const { nome } = req.body

  if (!nome) {
    return res.json({ statusCode: 204, message: 'name is required' })
  }

  try {
    const db = await openDb()

    await db.run('INSERT INTO Pessoa (nome, idade, TEXT) VALUES (?, ?, ?)', [pessoa.nome, pessoa.idade, pessoa.TEXT])

    res.json({
      statusCode: 200,
      message: 'Create Successful',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }
}

export async function updatePessoa(pessoa) {
  openDb().then((db) => {
    db.run('UPDATE Pessoa SET nome=?, idade=?, text=? WHERE id=?', [pessoa.nome, pessoa.idade, pessoa.TEXT, pessoa.id])
  })
}

export async function selectPessoas(req, res) {
  openDb().then((db) => {
    db.all('SELECT * FROM Pessoa').then((pessoas) => res.json(pessoas))
  })
}

export async function selectPessoa(req, res) {
  let id = req.body.id

  // query params => pessoa?itemid=123
  /*    const itemid = req.query.itemid
  console.log(itemid)  */

  //console.log(req)

  openDb().then((db) => {
    db.get('SELECT * FROM Pessoa WHERE id=?', [id]).then((pessoa) => res.json(pessoa))
  })
}

export async function selectPessoarouter(req, res) {
  const { id } = req.params

  try {
    const db = await openDb()
    const singleData = await db.get('SELECT * FROM Pessoa WHERE id=?', [id])

    if (!singleData) {
      res.status(404).json({
        statusCode: 404,
        message: 'Person not found',
      })
      return
    }

    res.json(singleData)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    })
  }
}

// maybe update to run is better ok!
export async function deletePessoa(req, res) {
  // the old direct way
  // const { id } = req.body
  // if (!id) {
  //   res.send({ statusCode: 404, message: 'Send a id' })
  //   return
  // }

  // openDb().then((db) => {
  //   db.get('DELETE FROM Pessoa WHERE id=?', [id]).then((res) => res)
  // })
  // res.json({
  //   statusCode: 200,
  //   message: 'Data was deleted',
  // })

  const { id } = req.body

  if (!id) {
    res.status(400).json({ statusCode: 400, message: 'Please provide an ID' })
    return
  }

  try {
    const db = await openDb()

    const result = await db.run('DELETE FROM Pessoa WHERE id=?', [id])

    if (result.changes === 0) {
      // No rows were affected, meaning the record with the provided ID does not exist
      res.status(404).json({ statusCode: 404, message: 'Record not found' })
      return
    }
    // Deletion was successful
    res.status(200).json({ statusCode: 200, message: 'Data was deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ statusCode: 500, message: 'Internal Server Error' })
  }
}
