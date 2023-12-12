import { Types } from 'mongoose';



interface CourseDetails {
  level:string;
  description: string;
}

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: { name: string; isDeleted: boolean }[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks?: number;
  details: CourseDetails;
};
