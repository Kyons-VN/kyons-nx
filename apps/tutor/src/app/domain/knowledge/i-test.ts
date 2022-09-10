interface ITestContent {
  id: string,
  content: IQuestion[],
}

interface IQA {
  question: IQuestion,
}

interface IQuestion {
  id: string,
  content: string,
  answers: IAnswer[],
}

interface IAnswer {
  id: string,
  order: number,
  value: string,
  content: string,
}

export { ITestContent, IQA, IQuestion, IAnswer }
