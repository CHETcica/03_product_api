import express from "express";
//เรียกใช่ express
const router = express.Router();
//เรียกใช้ Router() ใน express
import Product from "../models/product.js";
//เรียกใช้  ไฟล์ product.js
router.get("/", (req, res) => {
  //ใข้ router เมื่อ มีเมธอด get ที่มี"/" เข้ามาให้ส่ง reaponse กลับไปว่า RestfulAPI
  res.send("RestfulAPI");
});

router.get("/products", async (req, res) => {
  //ใข้ router เมื่อ มีเมธอด get ที่มี"/products"  ใช้งาน async
  //ทำการดึงข้อมูลจากฐานข้อมูลทั้งหมดมา ใส่ในproducts เเล้วส่ง products กลับไปเป็น ่Json
  const products = await Product.find({});
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  //ใข้ router เมื่อ มีเมธอด get ที่มี"/products"ตามด้วย id  ใช้งาน async
  //ทำการดึงข้อมูลจากฐานข้อมูลที่ id ตรงกันมา ใส่ใน products เเล้วส่ง products กลับไปเป็น ่Json
  const { id } = req.params;
  const product = await Product.findById(id);
  res.json(product);
});

router.post("/products", async (req, res) => {
  //ใข้ router เมื่อ มีเมธอด post ที่มี"/products"  ใช้งาน async
  // รับค่า จาก req.body มาเก็บบใน playload
  const playload = req.body;
  // สร้าง obj ใหม่ โดยส่งค่่าplayload ไป เเล้วเก็บไว้ใน product
  const product = new Product(playload);
  // productไปเรียกใช้ ฟังก์ชัน save
  await product.save();
  // ส่ง ข้อความว่า "Product addet" ไปใน Message แบบ json
  res.json({ Message: "Product addet" });
});

router.put("/products/:id", async (req, res) => {
  //ใข้ router เมื่อ มีเมธอด put ที่มี"/products"ตามด้วย id  ใช้งาน async
  // รับค่า id จาก params
  const { id } = req.params;
  // รับค่า จาก req.body มาเก็บบใน playload
  const playload = req.body;
  //ทำการค้นหา id ที่ตรงกัน เเละอัพเดท เอาค่าจาก playload
  const product = await Product.findByIdAndUpdate(id, { $set: playload });
  //ข้อความว่า "Product id ${id} is Update" ไปใน Message แบบ json
  res.json({ Message: `Product id ${id} is Update` });
});

router.delete("/products/:id", async (req, res) => {
  // รับค่า id จาก params
  const { id } = req.params;
  //ทำการดึงข้อมูลจากฐานข้อมูลที่ id ตรงกันมา ใส่ใน products
  const product = await Product.findById(id);
  // ถ้า มี product
  if (product) {
    //ถ้าเป็นจริง ให้ค้นหาเเล้วลบ จากไอดี
    const product = await Product.findByIdAndDelete(id);
    //ถ้าเป็นจริง ส่ง ข้อความกลับว่า ลบเเล้วนะจ๊ะ
    res.json({ Message: `Product id ${id} is deleted` });
  } else {
    // ถ้าไม่เป็นจริง ให้บอกว่าหายังไงก็ไม่เจอ
    res.json({ Message: `Product id ${id} not found` });
  }
});
export default router;
