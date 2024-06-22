document.getElementById('cvForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;

    // Generate CV HTML
    const cvOutput = `
        <h2>${fullName}</h2>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>

        <h3>Education</h3>
        <p>${education}</p>

        <h3>Experience</h3>
        <p>${experience}</p>
    `;

    // Display generated CV
    document.getElementById('cvOutput').innerHTML = cvOutput;
});
