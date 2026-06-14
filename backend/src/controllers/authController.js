const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User =
require("../models/userModel");

const Vendor =
require("../models/vendorModel");

const Supplier =
require("../models/supplierModel");

async function registerVendor(
  req,
  res
){

try{

 const {
   name,
   email,
   password,
   shopName,
   phone
 } = req.body;

 const existing =
 await User.findByEmail(email);

 if(existing){

   return res.status(400)
   .json({
     message:
     "Email already exists"
   });
 }

 const hash =
 await bcrypt.hash(
   password,
   10
 );

 const user =
 await User.createUser(
   name,
   email,
   hash,
   "VENDOR"
 );

 await Vendor.createVendor(
   user.id,
   shopName,
   phone
 );

 res.status(201).json({
   message:
   "Vendor Registered"
 });

}
catch(err){

 return res.status(500)
 .json({
   message:
   err.message
 });

}

}

async function registerSupplier(
 req,
 res
){

try{

 const {
   name,
   email,
   password,
   companyName,
   gstNumber,
   phone
 } = req.body;

 const existing =
 await User.findByEmail(email);

 if(existing){

  return res.status(400)
  .json({
   message:
   "Email already exists"
  });

 }

 const hash =
 await bcrypt.hash(
  password,
  10
 );

 const user =
 await User.createUser(
   name,
   email,
   hash,
   "SUPPLIER"
 );

 await Supplier.createSupplier(
   user.id,
   companyName,
   gstNumber,
   phone
 );

 res.status(201).json({
  message:
  "Supplier Registered"
 });

}
catch(err){

 res.status(500)
 .json({
   message:
   err.message
 });

}

}

async function login(
 req,
 res
){

try{

 const {
  email,
  password
 } = req.body;

 const user =
 await User.findByEmail(
   email
 );

 if(!user){

   return res.status(401)
   .json({
    message:
    "Invalid credentials"
   });

 }

 const match =
 await bcrypt.compare(
  password,
  user.password_hash
 );

 if(!match){

  return res.status(401)
  .json({
   message:
   "Invalid credentials"
  });

 }

 const token =
 jwt.sign(
  {
   id:user.id,
   role:user.role
  },
  process.env.JWT_SECRET,
  {
   expiresIn:"1d"
  }
 );

 res.json({
  token,
   role: user.role,

 user
 });

}
catch(err){

 res.status(500)
 .json({
  message:
  err.message
 });

}

}

module.exports = {
 registerVendor,
 registerSupplier,
 login
};