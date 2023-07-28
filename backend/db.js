const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoURI = "mongodb://localhost:27017/food";
const mongoDB = async() => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async(e, res) => {
        if (e) {
            console.log("---", e);
        } else {
            console.log("connected successfully");
            const fetch_data = await mongoose.connection.db.collection("food_items");
            fetch_data.find({}).toArray(async function(e, data) {
                const food_category = await mongoose.connection.db.collection("food_category");
                food_category.find({}).toArray(function(e, catData) {
                    if (e) {
                        console.log("---", e);
                    } else {
                        global.food_items = data;
                        global.food_category = catData;

                    }

                })
            })
        }
    });
};
module.exports = mongoDB;