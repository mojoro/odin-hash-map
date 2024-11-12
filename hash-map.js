import { LinkedList } from "./linked-lists.js";

/**
 * Represents a hash map.
 */
class HashMap {
  /**
   * Creates a new hash map.
   * @param {number} [capacity=16] - The initial capacity of the hash map.
   * @param {number} [loadFactor=0.75] - The load factor of the hash map.
   */
  constructor(capacity = 16, loadFactor = 0.75) {
    this.startingCapacity = capacity;
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    this.buckets = Array(this.capacity);
    this.mapSize = 0;
  }

  /**
   * Generates a hash code for a given key.
   * @param {string} key - The key to hash.
   * @returns {number} The hash code.
   */
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    return hashCode;
  }

  /**
   * Sets a key-value pair in the hash map.
   * @param {string} key - The key.
   * @param {*} value - The value.
   */
  set(key, value) {
    const hashCode = this.hash(key);
    const index = hashCode % this.buckets.length;

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
      if (keyIndex != "Not found") {
        list.removeAt(keyIndex);
        list.insertAt(key, value, keyIndex);
      } else {
        list.append(key, value);
        this.mapSize++;
      }
    }

    if (this.mapSize > this.capacity * this.loadFactor) {
      const extraSpace = Array(this.capacity);
      this.buckets.push(...extraSpace);
      this.capacity *= 2;
    }
  }

  /**
   * Gets the value associated with a key.
   * @param {string} key - The key.
   * @returns {*} The value associated with the key, or null if the key is not found.
   */
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

  /**
   * Checks if a key exists in the hash map.
   * @param {string} key - The key.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key) {
    return !!this.get(key);
  }

  /**
   * Removes a key-value pair from the hash map.
   * @param {string} key - The key.
   * @returns {boolean} True if the key was removed, false if the key was not found.
   */
  remove(key) {
    for (const list of this.buckets) {
      if (list) {
        const keyIndex = list.find(key);
        if (keyIndex != "Not found" && list.size > 1) {
          list.removeAt(keyIndex);
          this.mapSize--;
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Returns the number of stored keys in the hash map.
   * @returns {number} The number of stored keys.
   */
  length() {
    return this.mapSize;
  }

  /**
   * Removes all entries in the hash map.
   */
  clear() {
    this.capacity = this.startingCapacity;
    this.buckets = Array(this.capacity);
    this.mapSize = 0;
  }

  /**
   * Returns an array containing all the keys in the hash map.
   * @returns {Array<string>} An array of keys.
   */
  keys() {
    const keysArray = [];
    for (const list of this.buckets) {
      if (list) {
        keysArray.push(...list.keys());
      }
    }
    return keysArray;
  }

  /**
   * Returns an array containing all the values in the hash map.
   * @returns {Array<*>} An array of values.
   */
  values() {
    const valuesArray = [];
    for (const list of this.buckets) {
      if (list) {
        valuesArray.push(...list.values());
      }
    }
    return valuesArray;
  }

  /**
   * Returns an array containing all the key-value pairs in the hash map.
   * @returns {Array<Array<*>>} An array of key-value pairs.
   */
  entries() {
    const entriesArray = [];
    for (const list of this.buckets) {
      if (list) {
        entriesArray.push(...list.entries());
      }
    }
    return entriesArray;
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
console.log(test.keys());
console.log(test.values());
console.log(test.length());
console.log(test.buckets.length);
test.set("apple", "green");
console.log(test.buckets.length);
console.log(test.length());
console.log(test.get("kite"));
console.log(test.get("leo"));
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.has("apple"));
console.log(test.remove("apple"));
console.log(test.has("apple"));

test.set("sweater", "black");
test.set("watermelon", "green");

console.log(test.buckets.length);

test.clear();
console.log(test.buckets.length);
console.log(test.remove("apple"));
console.log(test.entries());
