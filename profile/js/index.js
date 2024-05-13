document.getElementById('nameForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(nameForm); 
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];
    
     console.log("1 ");
     console.log(imageFile);
  
    formData.append('image', imageFile);
    console.log(imageFile.path);
    try {
        const response = await fetch('/storeData', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const responseData = await response.json(); 
            console.log('Data stored successfully:', responseData);
        } else {
            console.error('Data is not Stored.');
        }
    } catch (error) {
        console.error('Error storing data:', error);
    }
});

