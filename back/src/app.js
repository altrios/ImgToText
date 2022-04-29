var express = require('express')
const app = express()
var fileupload = require('express-fileupload')
const tesseract = require('node-tesseract-ocr')

var Tesseract= require('tesseract.js')


const fs = require("fs");
app.use(fileupload())

app.get('/', (req, res, next) => {
  res.status(200).send('se subió')
})

app.post('/upload', function (req, res, next) {
  const file = req.files.foto
  file.mv('./uploads/' + file.name, function (err, result) {
    // console.log(reportUploaded);
    console.log('se subio el archivo')
    
    /*const img = fs.readFileSync('./uploads/Screenshot_2.png')


    tesseract
      .recognize(img, 'eng', {logger: e =>console.log(e)})
      .then(out=>console.log(out.data.text))
      .catch((error) => {
        console.log(error.message)
      })*/
      Tesseract.recognize(
        './uploads/' + file.name,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        res.status(200).send(text);
      })
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`)
})
