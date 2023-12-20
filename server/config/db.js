import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		return `MONGODB CONNECTED ${connect.connection.host}`;
	} catch (error) {
		console.error(`ERROR: ${error.message}`);
		process.exit(1);
	}
};

export default connectDB;
