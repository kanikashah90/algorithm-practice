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