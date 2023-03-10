var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function session(req, res){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    console.log(req.body);
    let db = client.db('database');
    let coll = db.collection('session');
    const obj = {
        name: req.body.name,
        email: req.body.email,
        testcode: req.body.testcode
    }
    let sesx = await coll.insertOne(obj);
    res.send({ID: sesx.insertedId});
}
exports.sess = session;