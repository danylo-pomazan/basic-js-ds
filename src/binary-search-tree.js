const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  root() {
    return this._root === null ? null : this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (this._root === null) {
      this._root = newNode;
    } else {
      this._insert(this._root, newNode);
    }
    // remove line with error and write your code here
  }

  _insert(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insert(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insert(node.right, newNode);
      }
    }
  }

  has(data) {
    // Fix: Added data parameter
    return this._find(this._root, data) !== null;
    // remove line with error and write your code here
  }

  find(data) {
    // Fix: Added data parameter
    return this._find(this._root, data);
    // remove line with error and write your code here
  }

  _find(node, data) {
    if (node === null) {
      return null;
    } else if (data === node.data) {
      return node;
    } else if (data < node.data) {
      return this._find(node.left, data);
    } else {
      return this._find(node.right, data);
    }
  }

  remove(data) {
    // Fix: Added data parameter
    this._root = this._remove(this._root, data);
    // remove line with error and write your code here
  }

  _remove(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      node.left = this._remove(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._remove(node.right, data);
      return node;
    } else {
      // node with the data found
      if (node.left === null && node.right === null) {
        // case 1: node with no children
        return null;
      } else if (node.left === null) {
        // case 2: node with only right child
        return node.right;
      } else if (node.right === null) {
        // case 2: node with only left child
        return node.left;
      } else {
        // case 3: node with two children
        const minValue = this._findMinValue(node.right);
        node.data = minValue;
        node.right = this._remove(node.right, minValue);
        return node;
      }
    }
  }

  _findMinValue(node) {
    if (node === null) {
      return null; // return null when node is null
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  min() {
    if (this._root === null) {
      return null; // return null when tree is empty
    }

    let node = this._root;
    while (node.left !== null) {
      node = node.left; // traverse to the leftmost node
    }
    return node.data; // return the value of the leftmost node
  }

  max() {
    if (this._root === null) {
      return null;
    }
    return this._findMaxValue(this._root);
    // remove line with error and write your code here
  }

  _findMaxValue(node) {
    while (node.right !== null) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
