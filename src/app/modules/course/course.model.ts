import mongoose, { Schema } from 'mongoose';

import { TCourse } from './course.interface';

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: [true, 'Title is required'],
  },
  instructor: {
    type: String,
    required: [true, 'Instructor is required'],
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Category ID is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  tags: [
    {
      name: {
        type: String,
        required: [true, 'Tag name is required'],
      },
      isDeleted: {
        type: Boolean,
        required: [true, 'Tag deletion status is required'],
      },
    },
  ],
  startDate: {
    type: String,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: String,
    required: [true, 'End date is required'],
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
  },
  provider: {
    type: String,
    required: [true, 'Provider is required'],
  },
  durationInWeeks: {
    type: Number,
  },
  details: {
    level: {
      type: String,
      required: [true, 'Level is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
});

courseSchema.pre('save', function (next) {
  if (!this.durationInWeeks) {
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);

    const timeLaps = endDate.getTime() - startDate.getTime();
    const dayDivided = timeLaps / (1000 * 3600 * 24);

    this.durationInWeeks = Math.ceil(dayDivided / 7);
  }

  next();
});

const Course = mongoose.model<TCourse>('Course', courseSchema);

export default Course;
