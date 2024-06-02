
 
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





     