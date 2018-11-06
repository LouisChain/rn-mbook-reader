import Realm from "realm";
import * as Models from "./models";

const schema = [Models.Library];
const options = {
  schema: schema
  //   sync: {
  //     user: userA,
  //     url: realmUrl,
  //     error: err => console.log(err)
  //   },
  // path: 'anotherRealm.realm',
  // schemaVersion: 1
};
const realm = new Realm(options);

class Helper {
  getRealmInstance() {
    if (realm != null) {
      return realm;
    } else {
      throw new Error("dbhelper.js :: Active Instance Not Set!");
    }
  }
  singleQuery(model, filter) {
    let results = realm.objects(model);
    if (filter) {
      return results.filtered(filter);
    }
    return results;
  }

  singleInsert(model, value) {
    realm.write(() => {
      realm.create(model, value, true);// insert or update
      console.log("inserted value for " + model);
    }); 
  }

  multiInsert(model, values) {
    realm.write(() => {
      for (v in values) {
        realm.create(model, v);
      }
      console.log("inserted " + values.length + " items for " + model);
    });
  }

  singleUpdate(model, values) {
    let table = realm.objects(model);
    realm.write(() => {
      for (let p in values) {
        if(p != "_id") {    
            table.setValue(values[p], forKeyPath: p);
        }
      }
      console.log("updated value for " + model);
    });
  }

  delete() {}

  close() {}
}

export default new Helper();
