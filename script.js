
 
function sendMail(){
    var params = {
        from_name: document.getElementById("Nom").value,
        email: document.getElementById("email").value,
        telephone: document.getElementById("telephone").value,
        message: document.getElementById("message").value,
    }
   emailjs.send("service_vpdxis6","template_2t8v6j9", params).then(function(res){
        alert("Votre message a été envoyé avec succés!!" +res.status);
   })
}

        
/*const serviceID ="service_9r3f1n6";
const templateID ="template_4lc43ng";

emailjs
.send(serviceID,templateID , params)
.then(
    res =>{
        document.getElementById("nom").value ="";
        email: document.getElementById("email").value ="";
        telephone: document.getElementById("telephone").value ="";
        message: document.getElementById("message").value ="";
        console.log(res);
        alert("Votre message a été envoyé avec succés!!")

    }
     )
     .catch((error) => console.log(error));
     */





// scripts.js
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Ici, vous devriez ajouter le code pour envoyer les données à votre service de newsletter
    // Par exemple, en utilisant l'API de Mailchimp

    const url = 'https://YOUR_MAILCHIMP_URL'; // Remplacez par l'URL de votre endpoint Mailchimp
    const data = {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
            FNAME: name
        }
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('anystring:YOUR_API_KEY') // Remplacez 'YOUR_API_KEY' par votre clé API Mailchimp
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = 'Merci pour votre inscription !';
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Une erreur est survenue. Veuillez réessayer.';
        console.error('Error:', error);
    });
});



// server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/subscribe', async (req, res) => {
    const { name, email } = req.body;

    const url = 'https://<dc>.api.mailchimp.com/3.0/lists/<list_id>/members/';
    const apiKey = 'YOUR_API_KEY';
    const dc = apiKey.split('-')[1]; // Extract the datacenter from the API key

    try {
        const response = await axios.post(url, {
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: name
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`
            }
        });

        if (response.status === 200) {
            res.status(200).json({ message: 'Successfully subscribed!' });
        } else {
            res.status(response.status).json({ message: response.data.title });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred. Please try again.', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


// scripts.js
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    fetch('http://localhost:3000/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Une erreur est survenue. Veuillez réessayer.';
        console.error('Error:', error);
    });
});




     