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
    return this._find(this._root, data) !== null;
  }

  find(data) {
    return this._find(this._root, data);
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
    this._root = this._remove(this._root, data);
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
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        const minValue = this._findMinValue(node.right);
        node.data = minValue;
        node.right = this._remove(node.right, minValue);
        return node;
      }
    }
  }

  _findMinValue(node) {
    if (node === null) {
      return null;
    }
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  min() {
    if (this._root === null) {
      return null;
    }

    let node = this._root;
    while (node.left !== null) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (this._root === null) {
      return null;
    }
    return this._findMaxValue(this._root);
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
