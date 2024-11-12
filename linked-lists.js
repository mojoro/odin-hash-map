/**
 * Represents a node in the linked list.
 */
class Node {
  /**
   * Creates a new node.
   * @param {string|null} key - The key of the node.
   * @param {*} value - The value of the node.
   * @param {Node|null} nextNode - The next node in the list.
   */
  constructor(key = null, value = null, nextNode = null) {
    this.key = key;
    this.value = value;
    this.nextNode = nextNode;
  }

  /**
   * Sets the key of the node.
   * @param {string} key - The key to set.
   */
  setKey(key) {
    this.key = key;
  }

  /**
   * Sets the value of the node.
   * @param {*} value - The value to set.
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Sets the next node.
   * @param {Node} nextNode - The next node to set.
   */
  setNext(nextNode) {
    this.nextNode = nextNode;
  }
}

/**
 * Represents a linked list.
 */
class LinkedList {
  /**
   * Creates a new linked list.
   */
  constructor() {
    this.headNode = new Node();
  }

  /**
   * Appends a new node to the end of the list.
   * @param {string} key - The key of the new node.
   * @param {*} value - The value of the new node.
   */
  append(key, value) {
    if (!this.headNode.value) {
      this.headNode.setKey(key);
      this.headNode.setValue(value);
    } else {
      const lastNode = this.nextUntilNull(this.headNode);
      lastNode.setNext(new Node(key, value));
    }
  }

  /**
   * Recursively finds the last node of the list.
   * @param {Node} node - The current node.
   * @returns {Node} The last node.
   */
  nextUntilNull(node) {
    if (!node.nextNode || !node.nextNode.value) {
      return node;
    } else {
      return this.nextUntilNull(node.nextNode);
    }
  }

  /**
   * Prepends a new node to the beginning of the list.
   * @param {string} key - The key of the new node.
   * @param {*} value - The value of the new node.
   */
  prepend(key, value) {
    const newHead = new Node(key, value);
    newHead.setNext(this.headNode);
    this.headNode = newHead;
  }

  /**
   * Calculates the size of the list.
   * @param {Node} [node=this.headNode] - The current node.
   * @param {number} [count=0] - The current count.
   * @returns {number} The size of the list.
   */
  size(node = this.headNode, count = 0) {
    if (!node.nextNode || !node.nextNode.value) {
      return ++count;
    } else {
      return this.size(node.nextNode, ++count);
    }
  }

  /**
   * Gets the value of the head node.
   * @returns {*} The value of the head node.
   */
  head() {
    return this.headNode.value;
  }

  /**
   * Gets the value of the tail node.
   * @returns {*} The value of the tail node.
   */
  tail() {
    return this.nextUntilNull(this.headNode).value;
  }

  /**
   * Gets the value at a specific index.
   * @param {number} index - The index to retrieve.
   * @param {Node} [node=this.headNode] - The current node.
   * @returns {*} The value at the specified index.
   */
  at(index, node = this.headNode) {
    if (index == 0) {
      return node.value;
    } else if (node.nextNode) {
      return this.at(index - 1, node.nextNode);
    } else if (!node.nextNode || !node.nextNode.value) {
      return "Index out of range";
    }
  }

  /**
   * Removes the last node from the list.
   * @param {Node} [node=this.headNode] - The current node.
   * @param {Node} [prevNode=""] - The previous node.
   */
  pop(node = this.headNode, prevNode = "") {
    if (!node.nextNode || !node.nextNode.value) {
      prevNode.setNext(null);
    } else {
      return this.pop(node.nextNode, node);
    }
  }

  /**
   * Checks if the list contains a specific value.
   * @param {*} value - The value to check.
   * @param {Node} [node=this.headNode] - The current node.
   * @returns {boolean} True if the value is found, false otherwise.
   */
  contains(value, node = this.headNode) {
    if (node.value == value) {
      return true;
    } else if (node.nextNode) {
      return this.contains(value, node.nextNode);
    }
    return false;
  }

  /**
   * Finds the index of a node with a specific key.
   * @param {string} key - The key to find.
   * @param {Node} [node=this.headNode] - The current node.
   * @param {number} [index=0] - The current index.
   * @returns {number|string} The index of the node, or "Not found" if not found.
   */
  find(key, node = this.headNode, index = 0) {
    if (node.key === key) {
      return index;
    } else if (node.nextNode) {
      return this.find(key, node.nextNode, index + 1);
    }
    return "Not found";
  }

  /**
   * Converts the list to a string representation.
   * @param {Node} [node=this.headNode] - The current node.
   * @param {string} [string=""] - The current string.
   * @returns {string} The string representation of the list.
   */
  toString(node = this.headNode, string = "") {
    if (!node.nextNode || !node.nextNode.value) {
      string += `( ${node.key}: ${node.value} ) -> null`;
      return string;
    } else if (node) {
      string += `( ${node.key}: ${node.value} ) -> `;
      return this.toString(node.nextNode, string);
    }
  }

  /**
   * Inserts a new node at a specific index.
   * @param {string} key - The key of the new node.
   * @param {*} value - The value of the new node.
   * @param {number} index - The index to insert at.
   * @param {Node} [node=this.headNode] - The current node.
   */
  insertAt(key, value, index, node = this.headNode) {
    if (index == 0) {
      this.prepend(key, value);
    } else if (index == 1 && node.nextNode) {
      const newNode = new Node(key, value);
      newNode.setNext(node.nextNode);
      node.setNext(newNode);
    } else if (node.nextNode) {
      return this.insertAt(key, value, index - 1, node.nextNode);
    } else if (!node.nextNode || !node.nextNode.value) {
      this.append(key, value);
    }
  }

  /**
   * Removes a node at a specific index.
   * @param {number} index - The index to remove.
   * @param {Node} [node=this.headNode] - The current node.
   * @param {Node} [prevNode=""] - The previous node.
   */
  removeAt(index, node = this.headNode, prevNode = "") {
    if (index == 0) {
      prevNode.setNext(node.nextNode);
    } else if (node.nextNode) {
      return this.removeAt(index - 1, node.nextNode, node);
    } else if (!node.nextNode || !node.nextNode.value) {
      this.pop();
    }
  }
}

export { LinkedList };
