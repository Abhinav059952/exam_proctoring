var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

async function listimage(req, res){
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

    if (!client) {
        return;
    }
    let db = client.db('database');
    let coll1 = db.collection('session');
    let coll2 = db.collection('image')
    const obj = {
        testcode: req.body.testcode    
    }
    
    let sesx = await coll1.find(obj).toArray();
    if(sesx.length == 0) {
        res.send(404);
        return;
    }    
    sesx = sesx[0];
    console.log(sesx)
    const obj2 = {
        sessionid: sesx._id.toString()
    }
    
    let queryres = await coll2.find(obj2).toArray();
    const resp = [];
    for (var i = 0; i < queryres.length; i++){
        resp.push({
            src: queryres[i].name,
            time: queryres[i].time
        });
    }
    res.send({
        name: sesx.name,
        email: sesx.email,
        testcode: sesx.testcode,
        list: resp
    });
}
exports.img = listimage;