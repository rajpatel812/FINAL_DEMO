export interface CourseDetailInterface {
  id?: number;
  title?: string;
  short_description?: string;
  thumbnail?: string;
  category?: {
    id: number;
    title: string;
  };

  created_at?: string;
  created_by?: string;
  description?: string;

  is_published?: boolean;
  language?: string;
  lessons?: [
    {
      id: number;
      title: string;
      duration: number;
      video_url: string;
      created_at: string;
      updated_at: string;
    }
  ];
  level?: string;
  outcome?: string;
  price?: number;
  rating?: string;
  requirements?: string;
  updated_at?: string;
  video_url?: string | undefined ;
}


export interface Course {
  id: number;
  title: string;
  short_description: string;
  rating: number;
  thumbnail: string;
  category: {
    id: number;
    title: string;
  };
}