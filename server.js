// require('dotenv').config();
// const path = require("path");
const express = require('express');
const app = express();
const PORT = 5000;
const cors = require('cors');
// const mongoose = require('mongoose');

app.use(cors());
// require('./models/model')
// require('./models/post')
// app.use(express.json())
app.use(require("./routes/auth"))
// app.use(require("./routes/createPost"))
// app.use(require("./routes/user"))

// mongoose.connect(mongoUrl, {useNewUrlParser: true});
// const connectDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGO_URI);
//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(error);
//         process.exit(1);
//     }
// }

// connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`server si running on ${PORT}`);
    })
// })