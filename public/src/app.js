import { createApp, ref, reactive, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const app = createApp({
  setup() {
    const production = false

    const baseURL = production ? 'http://143.198.232.51:4000/pessoa' : 'http://localhost:4000/pessoa'
    const fetchUrl = production ? `http://143.198.232.51:4000/pessoas` : `http://localhost:4000/pessoas`

    const name = ref('')
    const age = ref('')
    const text = ref('')
    const postId = ref('')
    const userMessage = ref(true)


    const userMessageInput = ref(false)
    const selectedMethod = ref('post')

    const person = reactive({
      name: 'Geraldo',
      children: true,
    })

    const handleForm = () => {
      if (selectedMethod.value == 'post') return handlePost(baseURL)
      if (selectedMethod.value == 'delete') return handleDelete(baseURL)
      if (selectedMethod.value == 'put') return handlePut(baseURL)
    }

    function handlePut(url) {
      // datajson
      const json = JSON.stringify({
        id: +postId.value,
        nome: name.value,
        TEXT: text.value,
        idade: age.value,
      })
      //ajax
      const ajaxn = new XMLHttpRequest()
      ajaxn.open('PUT', url)
      ajaxn.setRequestHeader('Content-Type', 'application/json')
      ajaxn.send(json)

      ajaxn.onload = function (e) {
        // Check if the request was a success
        if (this.readyState === XMLHttpRequest.DONE) {
          // Get and convert the responseText into JSON
          console.log(`Successful request ✅`)

          cleanInputs()

          // === get all server response ===
          console.log(`server => `, JSON.parse(ajaxn.response).message)
          if (ajaxn.status === 200) {
            const resp = JSON.parse(ajaxn.response)
            alert(resp.message)
          }
        }
      }
    }

    function handleDelete(url) {
      const id = +postId.value

      //ajax
      const ajaxn = new XMLHttpRequest()
      ajaxn.open('DELETE', url)
      ajaxn.setRequestHeader('Content-Type', 'application/json')

      const ajaxdata = JSON.stringify({
        id: id,
      })

      ajaxn.send(ajaxdata)
      ajaxn.onload = () => {
        if (ajaxn.readyState === XMLHttpRequest.DONE) {
          // Get and convert the responseText into JSON
          console.log(`request has been completed, and the response from the server is available. ✅`)
          cleanInputs()
        }

        // === get all server response ===
        //alert(`server => `, JSON.parse(ajaxn.response).message)
        alert(JSON.parse(ajaxn.response).message)
        if (ajaxn.status === 200) {
          const resp = JSON.parse(ajaxn.response)
          console.log(resp.message)
        }
      }
    }

    function handlePost(url) {
      // datajson
      const json = JSON.stringify({
        nome: name.value,
        TEXT: text.value,
        idade: age.value,
      })

      // ajax
      const ajaxn = new XMLHttpRequest()
      ajaxn.open('POST', url)
      ajaxn.setRequestHeader('content-Type', 'application/json')
      ajaxn.send(json)

      // if susscess
      ajaxn.onload = function (e) {
        // Check if the request was a success
        if (this.readyState === XMLHttpRequest.DONE) {
          // Get and convert the responseText into JSON
          console.log(`Successful request ✅`)

          // reset form
          cleanInputs()

          // === get all server response ===

          console.log(`server => `, JSON.parse(ajaxn.response).message)

          if (ajaxn.status === 200) {
            const resp = JSON.parse(ajaxn.response)
            alert(resp.message)
          }
        }
      }
    }

    async function fetchAPI() {
      const req = await fetch(fetchUrl)
      const data = await req.json()
    }

    const cleanInputs = () => {
      return setTimeout(() => {
        name.value = ''
        age.value = ''
        postId.value = ''
        text.value = ''
        userMessage.value = true
      }, 2000)
    }
    const cleanInputsPUT = () => {
      name.value = ''
      age.value = ''
      text.value = ''
    }

    const onInputChange = async (e) => {
      const id = e.target.value
      fetch(`${baseURL}/${id}`)
        .then((r) => r.json())
        .then((data) => {
          console.log(`data`, data)
          if(data.statusCode === 404){
            userMessageInput.value = true
            userMessage.value = true
            cleanInputsPUT()
            return
          }     
          if (data.statusCode === 200) {        
            userMessage.value = false  
            userMessageInput.value = false
            name.value = data.singleData.nome
            text.value = data.singleData.TEXT
            age.value = data.singleData.idade
            userMessage.value = false     
          }
         
        })
    }

    onMounted(() => {
      // fetchAPI()
    })

    return {
      selectedMethod,
      name,
      age,
      text,
      handlePost,
      handleDelete,
      handleForm,
      postId,
      onInputChange,
      cleanInputsPUT,
      userMessage, userMessageInput
    }
  },
})

app.mount('#app')
