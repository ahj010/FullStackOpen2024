import express from 'express';
import path from 'path';
const app = express();
import diagnosesRouter from './src/routes/diagnoses';
import patientsRouter from './src/routes/patients';

app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));


const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
