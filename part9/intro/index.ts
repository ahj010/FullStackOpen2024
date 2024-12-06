import express , {Request, Response}  from 'express';
import calculateBmi from "./bmiCalculator";
import calculateExercises  from "./exerciseCalculator";
const app = express();
import { Result, TrainingPlan } from "./utils/result";
app.use(express.json());


app.get('/', (_req, res) => {
    res.send("Hello Fullstack!");
});

app.get(`/bmi/`, (req: {query: {height: number, weight: number}}, res) => {

    if (!req.query.height || !req.query.weight ) {
       res.send({error: 'parameters missing'});
    }

    if (isNaN(req.query.height) || isNaN(req.query.weight)) {
        res.send({error: 'malformatted parameters'});
    }

    res.json({
        "weight": req.query.weight,
        "height": req.query.height,
        "bmi": calculateBmi(req.query.height, req.query.weight)
    });
});

app.post('/exercises', (req: Request, res: Response) =>  {

    const { daily_exercises, target } = req.body as TrainingPlan;

    if (daily_exercises === undefined || target === undefined) {
       return res.status(400).json({error: 'parameters missing'});
    }

    {
        if (isNaN(target) || daily_exercises.some(e =>isNaN(e))) {
          return  res.status(400).json({error: 'malformatted parameters'});
        }
    }

    try {
        const result: Result = calculateExercises(target, daily_exercises);
        // console.log(result)
        return res.json(result);

    } catch {
        return res.status(500).json({ error: 'something went wrong' });
    }

});

const PORT= 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
