import DbHelper from "./helper";
import Const from "@constants/table";

class LibraryDb {
  createOrUpdate(lib, updates) {
    try {
      let values = {
        _id: lib._id,
        category: lib.category,
        title: lib.title,
        cover: lib.cover, // link to local path
        coverLink: lib.coverLink, // Link cover to webpage
        subtitle: lib.subtitle,
        author: lib.author,
        description: lib.description,
        tag: lib.tag,
        translator: lib.translator,
        publisher: lib.publisher,
        ebook: lib.ebook, // link to local path
        ebookLink: lib.ebookLink, // link ebook to webpage
        format: lib.format,
        reader: lib.reader,
        view: lib.view,
        likeCount: lib.likeCount,
        mbook: JSON.stringify(lib.mbook), // array of link chapter id
        mbookLink: JSON.stringify(lib.mbookLink), // array of link chapter to webpage
        lastIndex: updates.lastIndex,
        lastRead: updates.lastRead,
        lastPlay: updates.isPlaying
      };
      DbHelper.singleInsert(Const.LIBRARY_TABLE, values);
    } catch (err) {
      console.log(err);
    }
  }

  update(id, props) {
    try {
      let values = {
        _id: id,
        lastIndex: props.lastIndex,
        lastPlay: props.lastPlay,
        lastRead: props.lastRead 
      };
      DbHelper.singleInsert(Const.LIBRARY_TABLE, values);
    } catch (err) {
      console.log(err);
    }
  }

  query(id) {
    try {
      let rs = DbHelper.singleQuery(Const.LIBRARY_TABLE, '_id="' + id + '"');
      if(rs) {
        return rs[0];
      }
      return undefined;
    } catch (err) {}
  }
}

export default new LibraryDb();
