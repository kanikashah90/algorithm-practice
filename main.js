var Node = function(key, prev, next) {
    this.key = key;
    this.next = next || null;
    this.prev = prev || null;
};

function LinkedList(head) {
    this.head = head;
    this.tail = this.head;
}

LinkedList.prototype.addLink = function(node) {
    if (this.head) {
        if (node) {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
    } else {
        if (node) {
            this.head = node;
            this.tail = node;
        }
    }
};

LinkedList.prototype.deleteLink = function(key) {
    // If the key is head of the list
    if (this.head && this.head.key === key) {
        this.head = this.head.next;
    } else {
        var currentNode = this.head && this.head.next ? this.head.next : null;
        while (currentNode) {
            if (currentNode.key === key) {
                // If the key is the last element of the list
                if (this.tail === currentNode) {
                    currentNode.prev.next = null;
                    this.tail = currentNode.prev;
                } else {
                    // If the key is the middle element of the list
                    var prevNode = currentNode.prev;
                    var nextNode = currentNode.next;
                    prevNode.next = currentNode.next;
                    nextNode.prev = currentNode.prev;
                }
                return;
            }
            currentNode = currentNode.next;
        }
    }

};

LinkedList.prototype.moveLinkToTail = function(node) {
    if (node && this.tail !== node) {
        var prevNode = node.prev;
        var nextNode = node.next;
        if (prevNode) {
            prevNode.next = nextNode;
        }
        if (nextNode) {
            nextNode.prev = prevNode;
        }
        if (this.head === node) {
            this.head = nextNode;
        }
        node.next = null;
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
    }
};

LinkedList.prototype.deleteHead = function() {
  if (this.head) {
      this.head = this.head.next;
  }
};

LinkedList.prototype.printList = function() {
    var currentNode = this.head;
    var listStr = '';
    while(currentNode) {
        listStr += currentNode.key + ' ';
        currentNode = currentNode.next;
    }
    console.log(listStr);
};

function LRUCache(capacity) {
    this.capacity = capacity;
    this.cache = new LinkedList();
    this.cacheOccupancy = 0;
    this.keyMap = {};
}

LRUCache.prototype.get = function(key) {
    // If key exist in the cache, move that element to the tail of the
    // linked list
    if (this.keyMap[key]) {
        var node = this.keyMap[key];
        this.cache.moveLinkToTail(node);
        return;
    }

    // If key doesn't exist in the cache
    // Check if the cache has space
    // Insert that element in the cache
    if (this.cacheOccupancy < this.capacity) {
        this.addItem(key);
        return;
    } else {
        // Else, remove the least recently used element from the cache
        var leastRecentlyUsedItem = this.cache.head;
        if (leastRecentlyUsedItem) {
            this.keyMap[leastRecentlyUsedItem.key] = null;
        }
        this.cache.deleteHead();
        // insert the key in the cache
        this.addItem(key);
    }
};

LRUCache.prototype.addItem = function(key) {
    var cacheEntry = new Node(key);
    this.cache.addLink(cacheEntry);
    this.cacheOccupancy++;
    this.keyMap[key] = cacheEntry;
};

LRUCache.prototype.printCache = function() {
    this.cache.printList();
};

LRUCache.prototype.processSequence = function(sequence) {
    sequence = sequence.split("");
    var self = this;
    sequence.forEach(function(item) {
        if (item === '!') {
            self.printCache();
        } else {
            self.get(item);
            console.log('item received ' + item);
        }
    });
};

var LRUCacheIns = new LRUCache(5);
var cacheInput = 'A!B!C!D!E!A!F!B!';
LRUCacheIns.processSequence(cacheInput);
// Output expected
// ABC
// CDEAF
// DEAFB