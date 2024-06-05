export interface dateTraining {
  date: string;
  fullDate: string;
  trainings: {
    type: string;
    status: boolean;
  }[];
}

export interface highlightedDate {
  date: string;
  textColor: string;
  backgroundColor: string;
}
