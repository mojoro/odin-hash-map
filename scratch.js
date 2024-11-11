
class HashMap {
  constructor() {
      this.hashMap = [[], [], [], [], [], [], [], [], [], [], [], []];
      this.loadFactor = 0.75;
      this.capacity = 12;
      this.length = 0;
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
      const hash = this.hash(key);
      const bucketIndex = hash % this.hashMap.length;
      const entry = { [key]: value }
      const listLocation = this.hashMap[bucketIndex][0];

      if (!listLocation) {
          const linkedListOfValues = new LinkedList();
          linkedListOfValues.append(entry);
          listLocation = linkedListOfValues;
          this.length++; // track growth of map
      }
      else {
          const linkedListOfValues = listLocation;
          const keyIndex = linkedListOfValues.find(key);
          // reassign value
          if (keyIndex) {
              linkedListOfValues.at(keyIndex).data[key] = value;
              return;
          }
          this.length++; // track growth of map
          linkedListOfValues.append(entry);
      }
      if (this.length > this.capacity * this.loadFactor) {
          this.resizeMap();
      }
  }