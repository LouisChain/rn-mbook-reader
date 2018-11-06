import Realm from "realm";
import Const from "@constants/table";

export default class Library extends Realm.Object {
  // get fullName() {
  //   return this.firstName + ' ' + this.lastName;
  // }
}

Library.schema = {
  name: Const.LIBRARY_TABLE,
  primaryKey: "_id",
  properties: {
    _id: "string",
    category: { type: "string", optional: true },
    title: { type: "string", optional: true },
    cover: { type: "string", optional: true }, // link to local path
    coverLink: { type: "string", optional: true }, // Link cover to webpage
    subtitle: { type: "string", optional: true },
    author: { type: "string", optional: true },
    description: { type: "string", optional: true },
    tag: { type: "string", optional: true },
    translator: { type: "string", optional: true },
    publisher: { type: "string", optional: true },
    ebook: { type: "string", optional: true }, // link to local path
    ebookLink: { type: "string", optional: true }, // link ebook to webpage
    format: { type: "string", optional: true },
    reader: { type: "string", optional: true },
    view: { type: "int", optional: true },
    likeCount: { type: "int", optional: true },
    mbook: { type: "string", optional: true }, // array of link chapter id
    mbookLink: { type: "string", optional: true }, // array of link chapter to webpage
    // Local properties
    lastIndex: { type: "int", optional: true },
    lastRead: { type: "int", optional: true },
    lastPlay: { type: "bool", optional: true }
  }
};
