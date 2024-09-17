import { model, Schema } from "mongoose";

//  Create a Schema corresponding to the document interface.
const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// 3. Create a Model.
const Category = model<TCategory>("Category", categorySchema);
export default Category;
