import { LinkedList } from "./linked-lists.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.buckets = Array(16);
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  // currently this doesn't find the keys.
  set(key, value) {
    const hashCode = this.hash(key);
    const index = hashCode % 16;
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[index]) {
      const list = new LinkedList();
      list.append(value);
      this.buckets[index] = list;
    } else {
      this.buckets[index].append(value);
    }
  }

  // currently this doesn't return the key of the node, it just returns the whole linked list.
  get(key) {
    for (const list in this.buckets) {
      if (list.key == key) {
        return list;
      }
    }
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
test.set("lion", "golden");
