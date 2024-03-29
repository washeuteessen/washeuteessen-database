// Pipeline
// find alle duplicates by url
db.yourCollection.aggregate([
// count number of documents per url
    { "$group": {
        "_id": { "url": "$url" },
        "dups": { "$push": "$_id" },
        "count": { "$sum": 1 }
    }},
// only take url with more than one 
    { "$match": { "count": { "$gt": 1 } }}
// dump one of those
]).forEach(function(doc) {
    doc.dups.shift();
    db.yourCollection.remove({ "_id": {"$in": doc.dups }});
})