import { ObjectId } from "mongoose";
import mongoCollections from "../config/mongoCollections";
const sets = mongoCollections.sets;

/*
Properties of sets collection
1. _id: ObjectId
2. title: string
3. description: string
4. subject: string
5. cards: array of objects
*/

// I will add validation later

const getPostById = async (id: ObjectId) => {
    const setCollection = await sets();
    const set = await setCollection.findOne({_id: id});
    if (set === null) throw `Could not find set with id of ${id}`;
    return set;
};

const createSet = async (owner: String, title: String, description: String, subject: String, cards: any[]) => {
    const setCollection = await sets();

    let newSet = {
        owner: owner,
        title: title,
        description: description,
        subject: subject,
        cards: cards
    }

    const insertInfo = await setCollection.insertOne(newSet);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) throw 'Could not add set';
    let newId = insertInfo.insertedId;

    return await getPostById(newId);;
}

const deleteSet = async (id: ObjectId) => {
    const setCollection = await sets();
    const deletionInfo = await setCollection.deleteOne({_id: id});

    if (deletionInfo.deletedCount === 0) throw `Could not delete set with id of ${id}`;
    return {setId: id, deleted: true};
};


module.exports = {
    getPostById,
    createSet,
    deleteSet
}