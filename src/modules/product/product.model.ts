import { model, Schema, Types } from "mongoose";
import { TProduct } from "./product.interface";

//  Create a Schema corresponding to the document interface.
const productSchema = new Schema<TProduct>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },

    description: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// 3. Create a Model.
const Product = model<TProduct>("Product", productSchema);
export default Product;
