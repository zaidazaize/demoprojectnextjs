import mongoose from "mongoose";
export async function connect() {
    try {
        console.log(">>> DB is connecting");
        console.log(">>> DB URL", process.env.MONGODB_URL);
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("MongoDB database connection established successfully");
        });
        connection.on("error", (err) => {
            console.log(
                "MongoDB connection error. Please make sure MongoDB is running. " +
                    err
            );
            process.exit();
        });
        console.log(">>> DB is connected");
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}
