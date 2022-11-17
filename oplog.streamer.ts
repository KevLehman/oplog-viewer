import MongoOplog from 'mongo-oplog';
import { program } from 'commander';
import colorize from 'json-colorizer';

program
  .option('--filter <filter>', 'namespace filter for oplog fetching', 'meteor.*')
  .option('--host <host>', 'OPLog url to connect to', 'mongodb://127.0.0.1:3001/local')
  .parse();

const args = program.opts();

const oplog = MongoOplog(args.host, { ns: args.filter });

oplog.tail();
 
oplog.on('op', data => {
  console.log('Received event OP from oplog');
  console.log(colorize(JSON.stringify(data, null, 2)));
});
 
oplog.on('insert', doc => {
  console.log('Received event INSERT from oplog');
  console.log(colorize(JSON.stringify(doc, null, 2)));
});
 
oplog.on('update', doc => {
  console.log('Received event UPDATE from oplog');
  console.log(colorize(JSON.stringify(doc, null, 2)));
});
 
oplog.on('delete', doc => {
  console.log('Received event DELETE from oplog');
  console.log(colorize(JSON.stringify(doc, null, 2)));
});
 
oplog.on('error', error => {
  console.log('Received event ERROR from oplog');
  console.log(error);
});
 
oplog.on('end', (e) => {
  console.log('Stream ended', e);
});
 
oplog.stop(() => {
  console.log('server stopped');
});