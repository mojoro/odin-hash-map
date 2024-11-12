import { LinkedList } from "./linked-lists.js";
class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = Array(this.capacity);
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

  // This needs to grow the buckets based on the loadFactor when mapSize gets too large.
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
    for (const list of this.buckets) {
      if (list) {
        const keyIndex = list.find(key);
        if (keyIndex != "Not found") {
          return list.at(keyIndex);
        }
      }
    }
    return null;
  }

  // has(key) takes a key as an argument and returns true or false based on whether or not the key is in the hash map
  has(key) {
    return !!this.get(key);
  }

  // remove(key) takes a key as an argument. If the given key is in the hash map, it should remove the entry with that key and return true.
  // If the key isn’t in the hash map, it should return false
  remove(key) {
    for (const list of this.buckets) {
      if (list) {
        const keyIndex = list.find(key);
        if (keyIndex != "Not found") {
          list.removeAt(keyIndex);
          this.mapSize--;
          return true;
        }
      }
    }
    return false;
  }

  //length() returns the number of stored keys in the hash map.
  length() {
    return this.mapSize;
  }

  //clear() removes all entries in the hash map.
  clear() {
    this.buckets = Array(16);
    this.mapSize = 0;
  }

  //keys() returns an array containing all the keys inside the hash map.
  keys() {
    const keyArray = [];
    for (const list of this.buckets) {
      if (list) {
        keyArray.push(...list.keys());
      }
    }
  }

  //values() returns an array containing all the values.
  values() {
    const valueArray = [];
    for (const list of this.buckets) {
      if (list) {
        valueArray.push(...list.values());
      }
    }
  }

  //entries() returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    const entriesArray = [];
    for (const list of this.buckets) {
      if (list) {
        entriesArray.push(...list.entries());
      }
    }
  }
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
test.set("lion", "golden");

console.log(test.length());

test.set("apple", "green");

console.log(test.length());
