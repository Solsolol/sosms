const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Configuration SFMC
const sfmcConfig = {
    clientId: 'ataf650dw2v0b5oh4s2sgh7h',
    clientSecret: 'q1Ig1QQPX4giDUXHyTmnyG5Y',
    authUri: 'https://mcjnmn9mfnxq4m36wvmtt59plqg1.auth.marketingcloudapis.com/',
    restUri: 'https://mcjnmn9mfnxq4m36wvmtt59plqg1.rest.marketingcloudapis.com/'
};

// Route pour vérifier/mettre à jour les données
app.post('/validateData', async (req, res) => {
    try {
        const { email, phone, date } = req.body;
        
        // Obtenir le token
        const authResponse = await axios.post(`${sfmcConfig.authUri}/v2/token`, {
            grant_type: 'client_credentials',
            client_id: sfmcConfig.clientId,
            client_secret: sfmcConfig.clientSecret
        });
        
        // Vérifier si l'enregistrement existe
        const searchResponse = await axios.get(
            `${sfmcConfig.restUri}/data/v1/customobjectdata/key/SMS_Journey_Entry/rowset`,
            {
                headers: { Authorization: `Bearer ${authResponse.data.access_token}` },
                params: { $filter: `Email eq '${email}'` }
            }
        );

        if (searchResponse.data.items.length > 0) {
            // Mise à jour
            await axios.patch(
                `${sfmcConfig.restUri}/data/v1/customobjectdata/key/SMS_Journey_Entry/rowset`,
                {
                    items: [{
                        Email: email,
                        Phone: phone,
                        RegistrationDate: date
                    }]
                },
                { headers: { Authorization: `Bearer ${authResponse.data.access_token}` } }
            );
            res.json({ success: true, message: 'Data updated' });
        } else {
            // Création
            await axios.post(
                `${sfmcConfig.restUri}/data/v1/customobjectdata/key/SMS_Journey_Entry/rowset`,
                {
                    items: [{
                        Email: email,
                        Phone: phone,
                        RegistrationDate: date
                    }]
                },
                { headers: { Authorization: `Bearer ${authResponse.data.access_token}` } }
            );
            res.json({ success: true, message: 'Data created' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server running');
});
