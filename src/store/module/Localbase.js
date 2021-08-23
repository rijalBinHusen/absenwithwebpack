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
    // keyword = {key: value}
    return db.collection(store).doc(keyword).get();
  },
  deleteCollection: function (store) {
    db.collection(store).delete();
  },
  deleteDb: function () {
    db.delete();
  },
  emptyStore: function (store) {
    db.collection(store).set([]);
  },
  deleteDocument: function (store, keyword) {
    //keyword = {key: value}
    db.collection(store).doc(keyword).delete();
  },
  generateId: function (id, waktu) {
    //DIV
    let masterId = id.slice(0, 3);
    //0003 as 3 on will be +1
    let increment = Number(id.slice(3)) + 1 + "";

    if (waktu) {
      //ABS21080001
      increment = Number(id.slice(-4)) + 1 + "";
      let fullYear = new Date().getFullYear() + "";
      let monthNow = new Date().getMonth() + 1;
      let year = id.slice(3, 5); //21
      let month = id.slice(5, 7); //08
      //if the month same
      if (monthNow === Number(month)) {
        masterId += year + month;
      }
      //if the month not same
      else {
        // if the month 9 change to 09
        monthNow = monthNow < 9 ? "0" + monthNow : monthNow;
        masterId += fullYear.slice(2) + monthNow;
        increment = "0";
      }
    }
    //0000
    let length = "0000".slice(increment.length);

    //DIV0001
    return masterId + length + increment;
  },
};
