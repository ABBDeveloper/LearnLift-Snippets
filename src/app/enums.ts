export type Category = 'Languages' | 'Natural Sciences' | 'Humanities' | 'Medicine' | 'IT' | 'Business' | 'Art' | 'Other';

export enum StatisticsUpdateCode {
  CardLearned = 'CardLearned',
  CardNotLearned = "CardNotLearned",
  CardCreated = 'CardCreated',
  CardDeleted = 'CardDeleted',
  LearnedCardDeleted = 'LearnedCardDeleted'
}