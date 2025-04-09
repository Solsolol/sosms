const express = require('express');
const app = express();
const axios = require('axios');

// Configuration SFMC
const sfmcConfig = {
    clientId: 'ataf650dw2v0b5oh4s2sgh7h',
    clientSecret: 'q1Ig1QQPX4giDUXHyTmnyG5Y',
    authUri: 'https://mcjnmn9mfnxq4m36wvmtt59plqg1.auth.marketingcloudapis.com/',
    restUri: 'https://mcjnmn9mfnxq4m36wvmtt59plqg1.rest.marketingcloudapis.com/'
};

app.use(express.json());
app.use(express.static('public'));

// Fonction pour obtenir le token d'authentification
async function getAuthToken() {
    try {
        const response = await axios.post(`${sfmcConfig.authUri}/v2/token`, {
            grant_type: 'client_credentials',
            client_id: sfmcConfig.clientId,
            client_secret: sfmcConfig.clientSecret
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Auth Error:', error);
        throw error;
    }
}

// Route pour l'exécution
app.post('/execute', async (req, res) => {
    try {
        const token = await getAuthToken();
        const { email, phone, Date } = req.body.inArguments[0];
        
        // Validation et traitement
        const isPhoneValid = phone && phone.length >= 10;
        
        // Mise à jour dans SFMC si nécessaire
        if (isPhoneValid) {
            // Ici vous pouvez ajouter la logique pour mettre à jour SFMC
            // en utilisant le token et restUri
        }

        res.status(200).json({
            email: email,
            validatedPhone: isPhoneValid ? phone : null,
            verificationDate: new Date().toISOString(),
            isVerified: isPhoneValid,
            errorMessage: isPhoneValid ? null : 'Invalid phone number'
        });
    } catch (error) {
        console.error('Execute Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('SMS Custom Activity backend is now running!');
});
