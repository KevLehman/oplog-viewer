import mongo from 'mongodb';

const watchCollections = [
    'migrations'
]

const docker = 'mongodb://0.0.0.0:27017/rocketchat?replicaSet=rs0&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const local = 'mongodb://localhost:3001/meteor'
async function run() {
    const uri = process.env.DOCKER ? docker : local;
    const client = await mongo.MongoClient.connect(uri);

    console.log('Connected to MongoDB');
    const db = client.db('meteor');
    db.watch([{
        $match: {
            'operationType': { $in: ['insert', 'update', 'delete'] },
            'ns.coll': { $in: watchCollections },
        },
    },]).on('change', data => console.log(JSON.stringify(data, null, 2)));
}

run().catch(console.log);
