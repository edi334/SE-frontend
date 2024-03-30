export interface ICriteriaUpdate {
  token: string;
  form_title: string;
  criteria_id: number;
}

export interface ICriteriaCheck {
  token: string;
  form_title: string;
  value_to_check: number;
}

export interface ICriteriaResponse {
  message: string;
}
