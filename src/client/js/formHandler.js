import { isValidUrl } from "./urlChecker";

const handleSubmit = async (event) => {
    event.preventDefault();

    const urlInput = document.getElementById('url-input').value;

    if (!isValidUrl(urlInput)) {
        alert('Please enter a valid URL');
        return;
    }

    console.log('URL submitted:', urlInput);

    try {
        const response = await fetch('http://localhost:8081/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: urlInput }),
        });

        const result = await response.json();
        console.log('Server response:', result);

        if (response.ok) {
            
            document.getElementById('polarity').innerText = result.polarity || 'N/A';
            document.getElementById('subjectivity').innerText = result.subjectivity || 'N/A';
            document.getElementById('source').innerText = result.source || 'N/A';
            document.getElementById('summary').innerText = result.summary || 'N/A';
            document.getElementById('entities').innerText = result.entities || 'N/A';
            document.getElementById('categories').innerText = result.categories || 'N/A';
            document.getElementById('keywords').innerText = result.keywords || 'N/A';

            document.getElementById('results').style.display = 'block';
        } else {
            alert(result.error || 'Error analyzing the URL.');
        }
    } catch (error) {
        console.error('Error:', error);
        if (!navigator.onLine) {
            alert('You are offline. Please connect to the internet to analyze the URL.');
        } else {
            alert('Failed to analyze the URL. Please try again later.');
        }
    }
};

export { handleSubmit };



