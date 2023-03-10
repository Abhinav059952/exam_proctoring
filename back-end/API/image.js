var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function image(req, res){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('database');
    let coll = db.collection('image');
    const obj = {
        time: req.file.filename.split('-')[0],
        name: req.file.filename,
        sessionid: req.body.idval    
    }
    let sesx = await coll.insertOne(obj);
    res.send(200);
}
exports.img = image;