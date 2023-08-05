const pincodeInput = document.getElementById('pincodeInput');
const fetchButton = document.getElementById('fetchButton');
const pincodeDetailsElement = document.getElementById('pincodeDetails');

function fetchPincodeDetails(pincode) {
  return fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

function displayPincodeDetails(details) {
  if (Array.isArray(details) && details.length > 0) {
    const data = details[0];
    const postOffice = data.PostOffice[0];

    const html = `
    <div style="background-color: #9adaf1;  border-radius: 15px; color:red;font-family:cursive;">      
      <h2  style=color:red;>Pincode Details</h2>
      <p><strong>Pincode:</strong> ${postOffice.Pincode}</p>
      <p><strong>Office Name:</strong> ${postOffice.Name}</p>
      <p><strong>Division Name:</strong> ${postOffice.DivisionName}</p>
      <p><strong>Region:</strong> ${postOffice.Region}</p>
      <p><strong>State:</strong> ${postOffice.State}</p>
      </div>

    `;

    pincodeDetailsElement.innerHTML = html;
  } else {
    pincodeDetailsElement.innerHTML = '<p>No details found for the provided pincode.</p>';
  }
}

fetchButton.addEventListener('click', () => {
  const selectedPincode = pincodeInput.value.trim();
  if (selectedPincode) {
    fetchPincodeDetails(selectedPincode)
      .then(data => {
        displayPincodeDetails(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  } else {
    pincodeDetailsElement.innerHTML = '<p>Please enter a valid pincode.</p>';
  }
});
