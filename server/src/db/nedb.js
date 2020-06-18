const {tree, items} = require('./defaultData');

const Datastore = require('nedb')

const path = require('path');
const ncp = require('ncp').ncp;
ncp.limit = 16;


const db = {}
const dbPath = "home/reshi/tenjin/db"
const backupsFolder = "/home/reshi/tenjin/backup"
db.items = new Datastore({ filename: "/home/reshi/tenjin/db/items.db", autoload: true });
db.tree = new Datastore({ filename: "/home/reshi/tenjin/db/tree.db", autoload: true });
db.items.loadDatabase();
db.tree.loadDatabase();

const populateDb = () => {
  db.tree.insert(tree, (err) => {
  });

  db.items.insert(items, (err, newItems) => {
  })
}
if (process.env.PROD_ENV === "pop") {
  populateDb()
}

export const getItems = async () => await new Promise(resolve =>
  db.items.find({}, function(err, docs) {
    resolve(docs)
  })
)

export const getItem = async (id) => await new Promise(resolve =>
  db.items.find({id: id}, function(err, docs) {
    if (!err)
      resolve(docs[0])
  })
)

export const updateItem = async (id, item) => await new Promise(resolve =>
  db.items.update({id: id}, item)
)

export const insertItem = async (item) => await new Promise(resolve =>
  db.items.insert(item, function(err, newDoc) {
  })
)

export const getTree = async () => await new Promise(resolve =>
  db.tree.find({}, function(err, docs) {
    if (!err) {
      resolve(docs[0])
    } else {
      console.err(err);
    }
  })
)

export const updateTree = async (newTree) => await new Promise(resolve =>
  db.tree.update({}, newTree)
)

export const putTreeItem = async (id, item) => await new Promise(resolve =>
  db.tree.find({}, function(err, docs) {
    const tree = docs;
    tree.items.id = item
    db.tree.update({}, tree)
  })
)

const addZero = (number) => {
  return `0${number}`.slice(-2);
}

const getDate = (dt = new Date()) => {
  return `${dt.getFullYear()}-${addZero(dt.getMonth() + 1)}-${addZero(dt.getDate())}-${addZero(dt.getHours())}-${addZero(dt.getMinutes())}-${addZero(dt.getSeconds())}`
  // return dt.toISOString();
}

export const backup = async () => await new Promise(resolve => {
  ncp(dbPath, path.join(backupsFolder, getDate()), function (err) {
    if (err) {
      return console.error(err);
    }
    console.log('backed up!');
     });
});