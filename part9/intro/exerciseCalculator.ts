import {Result , TrainingPlan} from './utils/result';

const calculateExercises = ( target: number, daily_exercises: Array<number>) : Result => {

    const periodLength = daily_exercises.length;
    const trainingDays = daily_exercises.filter(day => day !== 0).length;
    const average = Number((daily_exercises.reduce((a, b) => a + b, 0) / periodLength).toFixed(2));
    let success;
    let rating = 0;
    let ratingDescription = '';

    if (average >= target) {
        rating = 3;
        ratingDescription = 'good';
        success = true;
    } else if (average >= target / 2) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
        success = false;
    } else {
        rating = 1;
        ratingDescription = 'bad';
        success = false;
    };
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

// console.log(calculateExercises([3, 2, 2, 4.5, 1, 3, 1], 2));


const parseArguments = (args: string[]): TrainingPlan => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const target = Number(args[2]);
    const daily_exercises = args.slice(3).map(Number);

    if (isNaN(target) || daily_exercises.some(isNaN)) {
      throw new Error('Provided values were not numbers!');
    };
   return  {target, daily_exercises};
  };

  try {
    const { target, daily_exercises } = parseArguments((process.argv));
    const result = calculateExercises(target, daily_exercises);
    console.log(result);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    };
    console.log(errorMessage);

  };

export default calculateExercises;
