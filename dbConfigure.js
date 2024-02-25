const { default: mongoose } = require("mongoose");

async function connectDatabase()
{
    try{
        const response = await mongoose.connect(
            //"mongodb://localhost:27017/studentmentordb"
            "mongodb+srv://Monica25:jS4hxxsNMwMhyy4e@mentordb.deugo1z.mongodb.net/mentorstudentDB"
            );
        //console.log(response);
        if(response.connections.length > 0)
        {
            console.log("Database Connection Successful");
        }
        else{
            throw new Error("Connection Unsuccessful");
        }
    }
    catch(e)
    {
        console.log(e);
    }
}

module.exports = { 
    connectDatabase
};