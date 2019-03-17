export class QuerySet {
  constructor(queries, nodeTree, TreeModel) {
    this.TreeModel = TreeModel;
    Object.defineProperties(this, {
      tree: {
        get() {
          return nodeTree;
        }
      },
      substring: {
        get() {
          return nodeTree.substring;
        }
      },
      queries: {
        value: queries,
        configurable: true,
        enumerable: true
      },
      starts: {
        value: new Map(),
        enumerable: true
      },
      ends: {
        value: new Map(),
        enumerable: true
      },
      lengths: {
        value: new Map(),
        enumerable: true
      },
      positions: {
        value: new Map(),
        enumerable: true
      },
      results: {
        value: new Array(queries.length).fill(null),
        enumerable: true
      }
    });
  }

  get sortedLengths() {
    return sort(this.lengths);
  }

  get sortedStarts() {
    return sort(this.starts);
  }

  get sortedEnds() {
    return sort(this.ends);
  }

  getLengthVal(key) {
    return this.lengths.get(key);
  }

  addNode(query) {
    add.call(this, query);
  }

  removeQuery(query) {
    let index = -1;
    this.positions.delete(query.position);

    const startsArr = this.starts.get(query.start);
    if (startsArr) {
      index = startsArr.indexOf(query.position);
      if (index !== -1) startsArr.splice(index, 1);
      if (!startsArr.length) this.starts.delete(query.start);
    }

    const endsArr = this.ends.get(query.end);
    if (endsArr) {
      index = endsArr.indexOf(query.position);
      if (index !== -1) endsArr.splice(index, 1);
      if (!endsArr.length) this.ends.delete(query.end);
    }

    const lengthsArr = this.lengths.get(query.length);
    if (lengthsArr) {
      index = lengthsArr.indexOf(query.position);
      if (index !== -1) lengthsArr.splice(index, 1);
      if (!lengthsArr.length) this.lengths.delete(query.length);
    }
  }

  mapQueries(patterns) {
    let i = this.queries.length;
    const string = this.substring;
    const test = [];
    const arr = [];
    while (i--) {
      const query = QuerySet.q(this.queries[i], i);
      query.sub = string.substring(query.start, query.end + 1);
      arr.unshift(query);

      let setEnds = [i];
      if (this.starts.has(query.start)) {
        let value = this.starts.get(query.start);
        value.push(setEnds[0]);
        setEnds = value;
      }
      this.starts.set(query.start, setEnds);

      let setStarts = [i];
      if (this.ends.has(query.end)) {
        let value = this.ends.get(query.end);
        value.push(setStarts[0]);
        setStarts = value;
      }
      this.ends.set(query.end, setStarts);

      let lenValue = [i];
      if (this.lengths.has(query.length)) {
        let value = this.lengths.get(query.length);
        value.push(lenValue[0]);
        lenValue = value;
      }
      this.lengths.set(query.length, lenValue);
      this.positions.set(query.position, query);

      for (let pattern of patterns) {
        if (pattern.i <= query.start && query.end < (pattern.i + pattern.length)) {
          query.withinPattern = pattern.cluster;
          test.push(query.position);
          break;
        }
      }
    }

    console.debug('TEST the patterns', test.length, test);
    Object.defineProperty(this, 'queries', {
      value: arr,
      enumerable: true
    });
  }

  mapChildren() {
    const {length} = this.queries;
    let i = length;
    while (i--) queryLoop.call(this, i);
  }

  addChildNode(position) {
    if (!this.results[position]) this.addNode(this.queries[position]);
  }

  mapPatterns(patterns) {
    for (let pattern of patterns) {
      const end = pattern.i + pattern.length;
      // console.warn('test', end, pattern);
      handlePatternsInQueries.call(this, pattern.i, end, (pattern.cluster.length === 1));
    }
  }

  mapBySize(count) {
    mapQueriesBySize.call(this, count);
  }

  static q(...data) {
    return new Query(...data);
  }
}

class Query {
  constructor(query, i) {
    this.length = query[1] - query[0] + 1;
    this.start = query[0];
    this.end = query[1];
    this.position = i;

    // positions
    this.children = null;
    this.tree = null;
    this.withinPattern = false;
    this.sub = '';
  }
}

function queryLoop(i) {
  const starts = this.sortedStarts;
  const query = this.queries[i];
  if (query.length <= 4) return;

  const arr = [];
  for (let j = 0; j < starts.length; j++) {
    if (starts[j] < query.start) continue;
    const startPositions = this.starts.get(starts[j]);
    for (let q of startPositions) if (this.queries[q].end <= query.end) arr[arr.length] = q;
  }

  arr.sort((a, b) => this.queries[a].length - this.queries[b].length);
  query.children = new Set(arr);
}

function sort(set) {
  return ([...set.keys()]).sort((a, b) => a - b);
}

function mapQueriesBySize(count) {
  const keys = this.sortedLengths;
  let i = 0;
  while (count > keys[i]) {
    const positionArray = this.lengths.get(keys[i]);
    for (let j = 0; j < positionArray.length; j++) {
      const position = positionArray[j];
      const query = this.queries[position];
      this.addNode(query);
    }
    i += 1;
  }
  // console.debug('mapQueriesBySize', this.tree.size);
}


function handlePatternsInQueries(start, end, isSingle) {
  // find queries within pattern
  const endsKeys = filter(this.sortedEnds, (key => key < end));
  const endPositions = [];
  for (let keyIndex = 0; keyIndex < endsKeys.length; keyIndex++) {
    const endIndex = endsKeys[keyIndex];
    const positions = this.ends.get(endIndex);

    let k = positions.length;
    while (k--) endPositions[endPositions.length] = positions[k];
  }

  const queries = [];
  for (var posIndex = 0; posIndex < endPositions.length; posIndex++) {
    const query = this.positions.get(endPositions[posIndex]);
    if (!query) continue;
    if (query.start < start) continue;
    if (isSingle) {
      this.addNode(query);
    } else
    // console.debug('is Not Single', query);
    // sort by start
    // identify short lengths
    {
      queries[queries.length] = query;
    }
  }

  // TODO: sort and map from small to large
  queries.sort((a, b) => a.length - b.length);
  console.debug('handlePatternsInQueries', start, end, queries);
  if (queries.length > 3000) {
    while (queries.length > 0) {
      const end = (queries.length >> 5) || queries.length;
      let subQ = queries.splice(0, end);
      for (let qIndex = 0; qIndex < subQ.length; qIndex++) {
        const query = subQ[qIndex];
        this.addNode(query);
      }
    }
  } else {
    for (let qIndex = 0; qIndex < queries.length; qIndex++) {
      const query = queries[qIndex];
      this.addNode(query);
    }
  }
}

function add(query) {
  const ss = query.sub;
  const {TreeModel} = this;

  if (this.results[query.position]) return;

  if (query.children && query.children.size) {
    query.children.forEach((position) => {
      this.addChildNode(this.queries[position]);
    });
    query.children = null;
  }

  let node = null;
  if (!query.tree) {
    query.tree = new TreeModel(ss, this.tree.parentCollection);
    node = query.tree.execute();
  } else {
    node = this.tree.get(ss);
  }

  node.q[node.q.length] = (this.queries[query.position]);
  this.results[query.position] = query.tree.size;
  this.removeQuery(query);
}

function filter(obj, condition, owner) {
  owner = owner || this;
  // indentify type
  if (Array.isArray(obj)) {
    const arr = [];
    let i = obj.length;
    while (i--) if (condition.call(owner, obj[i], i, obj)) arr[arr.length] = obj[i];

    return arr;
  }
  if (typeof obj === 'string') {
    const s = '';
    for (let i = 0; i < obj.length; i++) if (condition.call(owner, obj[i], i, obj)) s += obj[i];

    return s;
  }
  const keys = Object.keys(obj),
    filtered = {};
  let i = keys.length;
  while (i--) {
    const key = keys[i];
    if (condition.call(owner, obj[key], key, obj)) filtered[key] = obj[key];
  }
  return filtered;
}
