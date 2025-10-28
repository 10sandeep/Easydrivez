import ConnectDb from "@/middleware/connectMongoDb";
import Admin from "@/models/Admin";
import cryptojs from "crypto-js";

// ✅ LOGIN FUNCTION
const adminLogin = async (email: string, password: string) => {
    try {
        await ConnectDb();

        const admin = await Admin.findOne({ email });
        if (!admin) return { status: false, message: "Admin not found" };

        // Decrypt the stored password
        const bytes = cryptojs.AES.decrypt(
            admin.password,
            process.env.CRYPTO_SECRET || "default_secret"
        );
        const originalPassword = bytes.toString(cryptojs.enc.Utf8);

        if (originalPassword !== password) {
            return { status: false, message: "Invalid credentials" };
        }

        return { status: true, message: "Login successful", admin };
    } catch (error) {
        console.error("Admin login error:", error);
        return { status: false, message: "Internal Server Error: " + error };
    }
};

// ✅ CREATE ADMIN FUNCTION
const createAdmin = async (
    username: string,
    email: string,
    password: string,
    img?: string,
    phone?: string
) => {
    try {
        await ConnectDb();

        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin)
            return { status: false, message: "Admin with this email already exists" };

        // Encrypt password before saving
        const hashedPassword = cryptojs.AES.encrypt(
            password,
            process.env.CRYPTO_SECRET || "default_secret"
        ).toString();

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
            img,
            phone,
        });

        await newAdmin.save();
        return { status: true, message: "Admin created successfully" };
    } catch (error) {
        console.error("Create admin error:", error);
        return { status: false, message: "Internal Server Error: " + error };
    }
};

export { adminLogin, createAdmin };
