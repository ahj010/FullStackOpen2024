export interface Result{
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

export interface TrainingPlan{
    target: number;
    daily_exercises: number[];
}
