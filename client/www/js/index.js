const uploadArea = document.querySelector('.upload-area');
const fileInput = document.getElementById('image-upload');


uploadArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0]; 
    if (!file) return; 

    
    const imgPreview = document.querySelector('.image-preview');
    if (imgPreview) {
        imgPreview.src = URL.createObjectURL(file);
    }

    
    const formData = new FormData();
    formData.append("image", file);

    try {
        // this will Send image to pramod's API
        const response = await fetch("http://localhost:5000/api/check-scam", {
            method: "POST",
            body: formData,
        });

        //  after the result from backend
        const result = await response.json();

        //  Show result to user
        if (result.safe) {
            alert("✅ The content is safe!");
        } else {
            alert("⚠️ The content is not safe and might be a scam!");
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        alert("❌ Could not check the image right now.");
    }
});