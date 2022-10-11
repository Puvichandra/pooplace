import { MongoClient,ObjectId } from "mongodb";

export async function connectDatabse(dbname) {
   
    const client = await MongoClient.connect('mongodb+srv://'+ process.env.DB_USER_NAME +':'+ process.env.DB_PASSWORD+'@cluster0.onchbsj.mongodb.net/'+dbname+'?retryWrites=true&w=majority');
    return client;
}

export async function insertData(client,collection,document ) {
    const db=client.db();
    const result= await db.collection(collection).insertOne(document);
    return result;
}

export async function getAllDocuments(client, collection) {
    
     const db=client.db();
     const documents = await db.collection(collection)
     .find()
     .toArray();
     return documents;

}

export function addVoteNow(id){
    fetch('api/votenow/'+id)
    .then(res=>res.json())
    .then((data)=>{console.log('ok')})
}

export async function updateData(client,collection,id ) {
    const db=client.db();
    const result= await db.collection(collection).updateOne({_id:new ObjectId(id)},
    {$set:{description:"Chandra"}});
    return result;
}