/**
 * string-tree js file created by Tamara G. Mack on 21-May-19 for
 * tamaramack.github.io
 */
import {
  isDistinct,
  isNumber,
  distinctString,
  getSetOf,
  removeDuplicates,
  clone,
  compare,
  sum,
  substringCount
} from '@/js/utilities/utilities';
import {
  StringObject
} from '@/js/models/objects/string-object';
import {
  Collection,
  MapCollection,
  SetCollection
} from '@/js/model/collection';

export default class Tree extends SetCollection {
  constructor(s, set = new SetCollection(), stop = 0, main) {
    super(set);
    this.firstBranch(s, stop);
    this.add(s.toString());

    s.addSubs(this);
    Object.defineProperties(this, {
      s: {
        get() {
          return s;
        },
        enumerable: true
      },
      main: {
        get() {
          return main || s;
        },
        enumerable: true
      },
      stop: {
        value: stop
      }
    });
  }

  add(value) {
    if (typeof value !== 'string') return;
    super.add(value);

    if (this.main instanceof StringObject) {
      this.main.subs.add(value);
      this.main.getSubByCount(value);
    }
  }

  firstBranch(sub, stop) {
    if (!(sub && sub.length)) return;
    let first = sub.slice(0, -1);
    let second = sub.slice(1);

    if (first
      && first.length
      && !this.has(first)
      && first.length > stop) {
      this.add(first);
      this.firstBranch(first, stop);
    }

    if (second
      && second.length
      && !this.has(second)
      && second.length > stop) {
      this.add(second);
      this.secondBranch(second, stop);
    }
  }

  secondBranch(sub, stop) {
    if (!(sub && sub.length)) return;
    let second = sub.slice(1);

    if (second
      && second.length
      && !this.has(second)
      && second.length > stop) {
      this.add(second);
      this.secondBranch(second, stop);
    }
  }

  mapValuesByLength(map = new MapCollection()) {
    const arr = fillArray(this.s.length + 1, () => new SetCollection());
    for (let [key, value] of map.entries) {
      arr[+key] = value;
    }

    for (let value of this.values) {
      if (typeof value !== 'string') {
        this.remove(value);
        continue;
      }
      (arr[value.length]).add(value);
    }

    map = new MapCollection(Object.entries(arr));
    map.remove('0');

    if (this.map) {
      this.map = map;
    } else {
      Object.defineProperty(this, 'map', {
        value: map,
        enumerable: true,
        writable: true
      });
    }
    return this.map;
  }

  addValuesFromMap(map) {
    if (!this.map) {
      this.mapValuesByLength(map);
    }
    for (let values of map.values) {
      if (values instanceof Collection) {
        this.addMany(values.toArray());
      } else if (Array.isArray(values)) {
        this.addMany(values);
      } else {
        this.add(values);
      }
    }
    return this.clone();
  }

  mapSubstringCount(map) {
    if (map || !this.map) {
      this.mapValuesByLength(map);
    }

    let sub = this.s;
    if (!(sub instanceof StringObject)) {
      sub = new StringObject(sub);
    }
    map = Object.fromEntries(this.map.toArray());
    sub.addSubs(this.clone());

    const chars = sub.chars;
    for (let count in map) {
      const set = map[count];
      const arr = [];
      for (let value of set.values) {
        arr[arr.length] = chars.get(value);
      }
      map[count] = arr;
    }

    for (let count in map) {
      const arr = map[count];
      const set = new Set(arr);
      const obj = {
        arr,
        set
      };
      map[count] = obj;
    }

    map = new MapCollection(Object.entries(map));

    if (this.count) {
      this.count = map;
    } else {
      Object.defineProperty(this, 'count', {
        value: map,
        enumerable: true,
        writable: true
      });
    }
    return this.count;
  }
}
