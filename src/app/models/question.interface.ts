export interface IQuestion {
  id: number;
  text: string;
  check_required: number;
  next_question: number;
}

export interface IAnswer {
  id: number;
  answer: {
    answer: string;
    criteria: number;
  };
  criteria_id: number;
  criteria_text: string;
}

export interface IQuestionAndAnswers {
  question: IQuestion;
  answers: IAnswer[];
}
