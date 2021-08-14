import Localbase from "localbase";

let db = new Localbase("myWarehouse");

export default {
  append: function (store, val) {
    //(nameStore, {key: 'value', key: 'value'})
    db.collection(store).add(val);
  },
  update: function (store, id, val) {
    //(nameStore, {id: idData}, {keyToUpdate: 'new value update'})
    db.collection(store).doc(id).update(val);
  },
  reWrite: function (store, id, val) {
    //(nameStore, {id: idData}, {key: 'new value'})
    //replace old data with the new one
    db.collection(store).doc(id).set(val);
  },
  getData: function (deData) {
    //deData = {'store': nameOfStoreData, 'orderBy': keyData, 'desc': Boolean, 'limit': number}
    //limit order desc
    if (deData.limit && deData.orderBy && deData.desc) {
      return db
        .collection(deData.store)
        .orderBy(deData.orderBy, "desc")
        .limit(deData.limit)
        .get();
    }
    //limit order
    if (deData.limit && deData.orderBy) {
      return db
        .collection(deData.store)
        .orderBy(deData.orderBy)
        .limit(deData.limit)
        .get();
    }
    //limit
    if (deData.limit) {
      return db.collection(deData.store).limit(deData.limit).get();
    }
    //order desc
    if (deData.orderBy && deData.desc) {
      return db.collection(deData.store).orderBy(deData.orderBy, "desc").get();
    }
    //order
    if (deData.orderBy) {
      return db.collection(deData.store).orderBy(deData.orderBy).get();
    }
    //   all data
    return db.collection(deData.store).get();
  },
  findData: function (store, keyword) {
    return db.collection(store).doc(keyword).get();
  },
  delete: function (store) {
    db.collection(store).delete();
  },
};
