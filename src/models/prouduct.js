import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  shippings: String,
  productImage1: String,
  productImage2: String,
  productImage3: String,
  productImage4: String,
  productImage5: String,
  designers: String,
  productName: String,
  size: String,
  color: String,
  price: String,
  floorPrice: String,
  description: String,
  vendor: String,
  condition: String,
  department: String,
  category: String,
  subcategory: String,
  tag:Array,
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;