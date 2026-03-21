document.addEventListener("DOMContentLoaded", () => {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.getElementById('image-upload');
    const analysisPage = document.getElementById('Analysis_Page');
    const imgPreview = document.getElementById('image-preview');
    const pageDim = document.getElementById('overlay');
    const modal = document.getElementById('Master_Modal')
    const yellow = document.getElementById('ScamYellow');
    const green = document.getElementById('SafeGreen');
    const red = document.getElementById('ScamRed');

    const resultModals = [yellow, green, red];


    // Click upload area triggers file input
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Function to hide all modals
    function hideAllModals() {
        analysisPage.style.display = 'none';
        resultModals.forEach(m => m.style.display = 'none');
        pageDim.style.display = 'none';
        fileInput.disabled = false;
        fileInput.value = '';
    }

    // Close modals if overlay clicked
    pageDim.addEventListener('click', hideAllModals);

    // Close modals when “Go Home” buttons clicked
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', hideAllModals);
    });

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        pageDim.style.display = 'none';
        analysisPage.style.display = 'block';

        // Show uploaded image preview
        if (imgPreview) {
            imgPreview.src = URL.createObjectURL(file);
        }

        // Disable input while analyzing
        fileInput.disabled = true;

        // Prepare form data
        const formData = new FormData();
        formData.append("image", file);
         function showCorrectResult(result) {
    // First, hide the "Analyzing..." text
    analysisPage.style.display = 'none';

    // Then, show the correct result div
    if (result.safe === true) {
        green.style.display = 'block';
    } else if (result.safe === false) {
        red.style.display = 'block';
    } else {
        yellow.style.display = 'block';
    }
}

        try {
            const response = await fetch("http://3.81.248.233/api/check-scam", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
        // 1. Hide the "Analyzing" screen first
    analysisPage.style.display = 'none';
    modal.style.display = 'block'
    console.log (result)
    if (result.safe === true) {
        green.style.display = 'block';
    } else if (result.safe === false) {
        red.style.display = 'block';
    } else {
        yellow.style.display = 'block';
    }

        } catch (error) {
            console.error("Error uploading image:", error);
            const resultText = document.createElement('p');
            resultText.style.color = 'red';
            resultText.style.marginTop = '20px';
            resultText.textContent = "❌ Could not check the image right now.";
            analysisPage.appendChild(resultText);
            resultText = ''
        } finally {
            fileInput.disabled = false;
        }
    });
});