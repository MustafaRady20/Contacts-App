const mongoose = require("mongoose")

const dbConection = async () => {
    try {
        // console.log(process.env.DB_URL)
        const conncet = await mongoose.connect(process.env.DB_URL)
        console.log(`Database Host ${conncet.connection.host}, Database Name: ${conncet.connection.name}`)

    } catch (err) {
        console.error(err)
    }
}


module.exports = dbConection