const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
      trim: true,
   },
   slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
   },
   description: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   category: {
      type: String,
      require: true,
   },
   brand: {
      type: String,
      require: true,
   },
   quantity: {
      type: Number,
      require: true
   },
   sold: {
      type: Number,
      default: 0,
   },
   images: [
      {
         public_id: String,
         url: String,
      },
   ],
   color: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Color"
      }
   ],
   tags: String,
   ratings: [{
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
   }],
   totalrating: {
      type: String,
      default: 0
   }
},
   { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Product', productSchema);