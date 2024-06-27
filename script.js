document.getElementById('cvForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Fetch form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const age = document.getElementById('age').value;
    const careerObjective = document.getElementById('careerObjective').value;

    // Fetch all education fields
    const educationWrappers = document.querySelectorAll('#educationFieldset .field-wrapper');
    let education = '';
    educationWrappers.forEach(wrapper => {
        const courseName = wrapper.querySelector('input[name="courseName"]').value;
        const startYear = wrapper.querySelector('input[name="startYear"]').value;
        const endYear = wrapper.querySelector('input[name="endYear"]').value;
        education += `
            <div class="education-item">
                <h4>${courseName} (${startYear} - ${endYear})</h4>
            </div>
        `;
    });

    // Fetch all experience fields
    const experienceWrappers = document.querySelectorAll('#experienceFieldset .field-wrapper textarea');
    let experience = '';
    experienceWrappers.forEach(wrapper => {
        experience += `
            <div class="experience-item">
                <h4>${wrapper.value}</h4>
            </div>
        `;
    });

    // Handle image upload
    const imageFile = document.getElementById('image').files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const imageUrl = e.target.result;

        // Generate CV HTML
        const cvOutput = `
            <div class="cv-section">
                <img src="${imageUrl}" alt="Profile Image">
                <div class="cv-details">
                    <h2>${fullName}</h2>
                    <p>Email: ${email}</p>
                    <p>Phone: ${phone}</p>
                    <p>Age: ${age}</p>
                    <div class="social-links">
                        <p>LinkedIn: <a href="${linkedin}" target="_blank">${linkedin}</a></p>
                        <p>GitHub: <a href="${github}" target="_blank">${github}</a></p>
                    </div>
                </div>
            </div>

            <div class="career-objective">
                <h3>Career Objective</h3>
                <p>${careerObjective}</p>
            </div>

            <div class="education">
                <h3>Education</h3>
                ${education}
            </div>

            <div class="experience">
                <h3>Experience</h3>
                ${experience}
            </div>
        `;

        document.getElementById('cvOutput').innerHTML = cvOutput;
    };

    reader.readAsDataURL(imageFile);
});

function addField(fieldsetId, type) {
    const fieldset = document.getElementById(fieldsetId);
    let fieldWrapper;

    if (type === 'education') {
        fieldWrapper = document.createElement('div');
        fieldWrapper.classList.add('field-wrapper');
        fieldWrapper.innerHTML = `
            <label for="courseName">Course Name:</label> 
            <input type="text" name="courseName" required placeholder="B.tech">
            <label for="startYear">Start Year:</label>
            <input type="number" name="startYear" required placeholder="2023">
            <label for="endYear">End Year:</label>
            <input type="number" name="endYear" required placeholder="2027">
            <button type="button" class="delete-button" onclick="deleteField(this)">Delete</button>
        `;
    } else if (type === 'experience') {
        fieldWrapper = document.createElement('div');
        fieldWrapper.classList.add('field-wrapper');
        fieldWrapper.innerHTML = `
            <textarea name="experience" rows="4" required placeholder="CEO,CTO,COO at Enigma for a Decade"></textarea>
            <button type="button" class="delete-button" onclick="deleteField(this)">Delete</button>
        `;
    }

    fieldset.insertBefore(fieldWrapper, fieldset.lastElementChild);
}

function deleteField(button) {
    const fieldWrapper = button.parentElement;
    fieldWrapper.remove();
}
