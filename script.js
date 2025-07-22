
document.addEventListener("DOMContentLoaded", () => {
  const dateField = document.getElementById("date");
  dateField.valueAsDate = new Date();

  const form = document.getElementById("dataForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const webAppUrl = "https://script.google.com/macros/s/AKfycbwHHx69aRHVTdrs-bGgr_NoYjUT2D1IRKSW3G64Mzy6ZlcNK9ci6N-Qqukdn8XpvZ5PPw/exec";

    const imageFile = document.getElementById("image").files[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const imageBase64 = reader.result;

      const formData = {
        date: document.getElementById("date").value,
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        std: document.getElementById("std").value,
        div: document.getElementById("div").value,
        phone: document.getElementById("phone").value,
        imageBase64: imageBase64,
      };

      try {
        const response = await fetch(webAppUrl, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          alert("Data submitted");
          form.reset();
          dateField.valueAsDate = new Date();
        } else {
          alert("Failed to submit data.");
        }
      } catch (error) {
        alert("Error occurred: " + error.message);
      }
    };

    reader.readAsDataURL(imageFile);
  });
});
