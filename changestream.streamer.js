var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongo from 'mongodb';
const watchCollections = [
    'migrations'
];
const docker = 'mongodb://0.0.0.0:27017/rocketchat?replicaSet=rs0&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const local = 'mongodb://localhost:3001/meteor';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = process.env.DOCKER ? docker : local;
        const client = yield mongo.MongoClient.connect(uri);
        console.log('Connected to MongoDB');
        const db = client.db('meteor');
        db.watch([{
                $match: {
                    'operationType': { $in: ['insert', 'update', 'delete'] },
                    'ns.coll': { $in: watchCollections },
                },
            },]).on('change', data => console.log(JSON.stringify(data, null, 2)));
    });
}
run().catch(console.log);
