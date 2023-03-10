const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
//const crypto = require('crypto');
const app = express()
const port = 5000;
const sess = require('./API/session')
const img = require('./API/image')
const lisimg = require('./API/listimage')

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    var namef = Date.now().toString() + '-' + req.body.idval;
    cb(null, `${namef}.png`);
  },
});
const upload = multer({ storage: multerStorage });
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(
    {origin: '*'}
));
app.post('/session', (req,res)=>{sess.sess(req,res)})
app.post('/image', upload.single('imgfile'), (req,res)=>{img.img(req,res)})
app.post('/list', (req,res)=>{lisimg.img(req,res)})
app.post('/', upload.single('imgfile'), (req, res)=>{
    res.send('Done');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})