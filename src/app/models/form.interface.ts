export interface IForm {
  title: string;
  first_question: number;
  description: string;
  is_featured: boolean;
}

export interface IRecommendation {
  form_title: string;
  form_description: string;
  additional_text: string;
}
