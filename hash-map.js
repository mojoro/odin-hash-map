import { LinkedList } from "./linked-lists.js";
class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.buckets = Array(16);
    this.mapSize = 0;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const index = hashCode % 16;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      const list = new LinkedList();
      list.append(key, value);
      this.buckets[index] = list;
      this.mapSize++;
    } else {
      const list = this.buckets[index];
      const keyIndex = list.find(key);
      if (keyIndex != "Not found") list.insertAt(key, value, keyIndex);
      else {
        list.append(key, value);
        this.mapSize++;
      }
    }
  }

  //  takes one argument as a key and returns the value that is assigned to this key. If a key is not found, return null
  get(key) {
    for (const list in this.buckets) {
      const keyIndex = list.find(key);
      if (keyIndex != "Not found") {
        return list.at(keyIndex);
      }
    }
    return null;
  }

  has(key) {}
  remove(key) {}
  length() {}
  clear() {}
  keys() {}
  values() {}
  entries() {}
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("kite", "pink");
test.set("lion", "golden");
