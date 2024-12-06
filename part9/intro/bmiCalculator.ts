const calculateBmi = (height: number, weight: number) : string=>  {
    const heightInMeters: number = (height / 100);
    const result: number =  (weight/(heightInMeters * heightInMeters));
    if (result <= 18.5) {
        return `Underweight Range , ${result.toFixed(2)}`;

    } else if(result >= 18.5 && result <= 25){
        return 'Normal Range';

    } else if(result > 25 && result <= 30) {
        return 'Overweight Range';

    }else if(result > 30) {
        return 'Obesity Range';
    }
    return '';
};

// console.log(calculateBmi(180 , 74));

const height: number =  Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight));

export default calculateBmi;
