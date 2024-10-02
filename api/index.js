const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const pacienteRoute = require('../routes/pacienteRoute');
const usrRoutes = require('../routes/userRoutes');
const citaRoute = require('../routes/citaRoute');

require('../config/db'); 

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000","https://clinica-frontend-blue.vercel.app", "https://www.clinicamedicasj.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
 
}));

    
app.get('/', (req, res) => {
  res.send('Backend Arriba');
});


app.use('/api', pacienteRoute);
app.use('/api', usrRoutes);
app.use('/api',citaRoute);


app.listen(port, () => {
  console.log(`Servidor  en el puerto ${port}`);
});



