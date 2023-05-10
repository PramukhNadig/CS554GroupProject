//drop all database
import mongoCollections from "./config/mongoCollections";
import setServices from "./services/sets";
import userServices from "./services/users";

const seed = async () => {
    const sets = mongoCollections.sets;
    const users = mongoCollections.users;

    const setCollection = await sets();
    const userCollection = await users();

    await setCollection.drop();
    await userCollection.drop();

    const phill = await userServices.createUser("phill", "CS554Prof", "phill@stevens.edu");

    const johnny = await userServices.createUser("johnny", "CS554TA", "jwong@stevens.edu");

    const phillId = userCollection.findOne({ username: "phill" })._id;
    const johnnyId = userCollection.findOne({ username: "johnny" })._id;

    const set1 = await setServices.createSet("phill", "CS554", "CS554", "CS554", [{word:"What does a developer do at the end of a big project?", meaning:"He gits committed.", imageUrl:""},
        { word: "There are only 10 kinds of people in this world:", meaning:"those who know binary and those who don’t.", imageUrl:""},
        { word: "Why did the functions stop calling each other?", meaning: "Because they had constant arguments", imageUrl:""}]);

    const set2 = await setServices.createSet("johnny", "Who's that pokemon?", "CS546", "CS546", [{ word: "Who's this pokemon?", meaning: "Gengar", imageUrl: "http://localhost:4000/v1/images/c086a20e-4f55-4bdf-a5ef-d0178c75058c.jpg" },
        { word: "Who's this pokemon?", meaning: "Mewtwo", imageUrl: "http://localhost:4000/v1/images/42351ea4-51d4-41ca-a0fb-4fa4afae3c07.jpg" },
        { word: "Who's this pokemon?", meaning: "Jigglypuff", imageUrl: "http://localhost:4000/v1/images/ac553931-c1b3-40c8-8855-280d7d9f7221.jpg" }]);
    
    console.log("set1", set1);

}
    
    

seed();
