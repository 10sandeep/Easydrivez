import ConnectDb from "@/middleware/connectMongoDb";
import Admin from "@/models/Admin";
import cryptojs from "crypto-js";

const adminLogin = async (email: string, password: string) => {
    try {
        await ConnectDb();
        const admin = await Admin.findOne({ email: email });
        if (!admin) return { status: false, message: "Admin not found" };
        const hashedPassword = cryptojs.AES.encrypt(password, process.env.CRYPTO_SECRET || "default_secret").toString();
        if (admin.password !== hashedPassword) return { status: false, message: "Invalid credentials" };
        return { status: true, message: "Login successful" };
    }
    catch (error) {
        return { status: false, message: "Internal Server Error" + error };
    }
}
//create a new admin function here if needed

const createAdmin = async (username: string, email: string, password: string, img?: string, phone?: string) => {
    try {
        await ConnectDb();
        const existingAdmin = await Admin.findOne({ email: email });
        if (existingAdmin) return { status: false, message: "Admin with this email already exists" };
        const hashedPassword = cryptojs.AES.encrypt(password, process.env.CRYPTO_SECRET || "default_secret").toString();
        const newAdmin = new Admin({ username, email, password: hashedPassword, img, phone });
        await newAdmin.save();
        return { status: true, message: "Admin created successfully" };
    } catch (error) {
        return { status: false, message: "Internal Server Error" + error };
    }
}

export { adminLogin, createAdmin };