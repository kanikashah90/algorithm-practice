var LRUCacheIns = new LRUCache(5);
var cacheInput = 'A!B!C!D!E!A!F!B!';
LRUCacheIns.processSequence(cacheInput);
// Output expected
// ABC
// CDEAF
// DEAFB