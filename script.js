const contactForm = document.querySelector(".contact-form");
const formMessage = document.querySelector(".form-message");
contactForm.addEventListener("submit", async(event)=>{
    event.preventDefault();
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    };
    try{
        const response = await fetch("http://localhost:8080/api/contact",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (response.ok) {
          formMessage.textContent = result.message;
          formMessage.style.color = "#00c853";
          contactForm.reset();
        } else {
           formMessage.textContent = result.message;
           formMessage.style.color = "#ff004f";
        }
    }
    catch(error) {
    console.error(error);
    formMessage.textContent = "Unable to send message.";
    formMessage.style.color = "#ff004f";
}
});