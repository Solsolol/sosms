const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Route pour la validation des données
app.post('/validate', (req, res) => {
  console.log('Validate endpoint called');
  res.status(200).json({ success: true });
});

// Route pour la sauvegarde
app.post('/save', (req, res) => {
  console.log('Save endpoint called');
  res.status(200).json({ success: true });
});

// Route pour l'exécution
app.post('/execute', (req, res) => {
  console.log('Execute endpoint called');
  
  // Récupération des données d'entrée
  const { email, phone, Date } = req.body.inArguments[0];
  
  // Simulation de la validation du numéro de téléphone
  const isPhoneValid = phone && phone.length >= 10;
  
  // Préparation de la réponse
  const response = {
    email: email,
    validatedPhone: isPhoneValid ? phone : null,
    verificationDate: new Date().toISOString(),
    isVerified: isPhoneValid,
    errorMessage: isPhoneValid ? null : 'Invalid phone number'
  };

  res.status(200).json(response);
});

app.listen(process.env.PORT || 8080, () => {
  console.log('SMS Custom Activity backend is now running!');
});
