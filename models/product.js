import mongoose  from "mongoose";
//Mongoose เป็น Node.js library หนึ่ง ที่เป็น Object Data Mapping(ODM)
//ทำหน้าที่ในการแปลง MongoDB object mapping เป็น JavaScript objects 
const Schema = mongoose.Schema
// เข้าถึง คลาส Schema ใน mongoose เก็บไว้ใน const Schema
const productSchema = new Schema({
    // สร้าง obj productSchema ที่มีค่า 
    // name: String, category : String, price: Number, tags:[String] อยู่ด้านใน
    name: String,
    category : String,
    price: Number,
    tags:[String],
    imageURL: String,
});
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
// เอา ProductModel ไปใช้