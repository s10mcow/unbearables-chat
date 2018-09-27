import firebase from 'firebase';

class _DataProvider {
  constructor() {
    this.Add = 0;
    this.Remove = 1;
    this.Modify = 2;
    this.Move = 3;
    this.AddCallback = 'onAdd';
    this.RemoveCallback = 'onRemove';
    this.ModifyCallback = 'onModify';
    this.MoveCallback = 'onMove';
    this.CallbackMap = {};
    this.CallbackMap[this.Add] = this.AddCallback;
    this.CallbackMap[this.Remove] = this.RemoveCallback;
    this.CallbackMap[this.Modify] = this.ModifyCallback;
    this.CallbackMap[this.Move] = this.MoveCallback;
  }
}

const DataProvider = new _DataProvider();

const DataEventMap = {};
DataEventMap[DataProvider.Add] = 'child_added';
DataEventMap[DataProvider.Remove] = 'child_removed';
DataEventMap[DataProvider.Modify] = 'child_changed';
DataEventMap[DataProvider.Modify] = 'onAdd';
DataEventMap[DataProvider.Move] = 'child_moved';

export default class FirebaseDataProvider {
  constructor() {
    this.database = null;
    this.root = null;
  }

  initialize() {
    this.database = firebase.database();
    this.root = this.database.ref();
  }

  write(path, value) {
    const me = this;
    return new Promise(function(resolve, reject) {
      me.root
        .child(path)
        .set(value)
        .then(function() {
          resolve({
            path: path,
            value: value,
          });
        });
    });
  }
  post(path, value) {
    const me = this;
    return new Promise(function(resolve, reject) {
      const ref = me.root.child(path).push();
      ref
        .then(function() {
          return ref.set(value);
        })
        .then(function(value) {
          resolve({
            path: path,
            value: value,
          });
        })
        .catch(function(error) {
          reject({
            path: path,
            error: error,
          });
        });
    });
  }
  update(path, value) {
    const me = this;
    return new Promise(function(resolve, reject) {
      me.root
        .child(path)
        .update(value)
        .then(function() {
          resolve({
            path: path,
            value: value,
          });
        })
        .catch(function(error) {
          reject({
            path: path,
            error: error,
          });
        });
    });
  }
  read(path, limit) {
    const me = this;
    return new Promise(function(resolve, reject) {
      let ref = me.root.child(path);
      if (limit) ref = ref.limitToLast(limit);
      ref
        .once('value', function(snapshot) {
          resolve({
            path: path,
            value: snapshot.val(),
          });
          //resolve(path, val);
        })
        .catch(function(error) {
          reject({
            path: path,
            error: error,
          });
        });
    });
  }
  readRange(path, start, count, startPosition) {
    const me = this;
    return new Promise(function(resolve, reject) {
      let ref = me.root.child(path).orderByKey();
      if (startPosition === FirebaseDataProvider.StartAtFront) {
        ref = ref.endAt(start).limitToLast(count);
      } else if (startPosition === FirebaseDataProvider.StartAtBack) {
        ref = ref.startAt(start).limitToFirst(count);
      }
      ref.once('value', function(snapshot) {
        const rows = {};
        snapshot.forEach(function(childSnapshot) {
          rows[childSnapshot.key] = childSnapshot.val();
        });
        resolve({
          path: path,
          range: rows,
        });
      });
    });
  }
  subscribe(path, events, delegate, limit) {
    const me = this;
    let ref = me.root.child(path);
    if (limit) ref = ref.limitToLast(limit);
    for (const eIdx in events) {
      // Don't bother attaching the event if the receiver doesn't have the callback
      if (!delegate[DataProvider.CallbackMap[events[eIdx]]]) continue;
      ref.on(DataEventMap[events[eIdx]], function(data) {
        delegate[DataProvider.CallbackMap[events[eIdx]]].call(
          delegate,
          path,
          data.key,
          data.val()
        );
      });
    }
  }
  unsubscribe(path) {
    this.root.child(path).off();
  }
}
