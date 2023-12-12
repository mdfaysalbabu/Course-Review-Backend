import mongoose, { Schema, model } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>({
  name: {
    type: String,
    unique: true,
    required: [true, 'Name is required'],
  },
});

const Category = mongoose.model<TCategory>('Category', categorySchema);

export default Category;
