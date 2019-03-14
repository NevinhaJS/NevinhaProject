export const createHook = (MongooseModel, hookData) => {
    MongooseModel.collection.insert(hookData, (err) => err ? console.log(err) : true);
}