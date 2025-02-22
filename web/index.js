const express = require('express')
const app = express()
const port = 3000

app.use(express.static('css'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index.html');
})

app.get('/:file', (req, res) => {
    res.sendFile(__dirname + '/www/' + req.params.file + '.html');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})