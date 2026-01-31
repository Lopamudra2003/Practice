// Email validation function
function isValidEmail(email) {
    // More strict email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(email)) {
        return false;
    }
    
    // Extract domain part
    const domain = email.split('@')[1];
    const domainParts = domain.split('.');
    
    // Check that domain name (before the TLD) contains at least one letter
    const domainName = domainParts.slice(0, -1).join('.');
    if (!/[a-zA-Z]/.test(domainName)) {
        return false;
    }
    
    // Check that TLD is at least 2 characters and only letters
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
        return false;
    }
    
    return true;
}

// Add visual feedback for invalid inputs
function showError(input, message) {
    const formGroup = input.parentElement;
    
    // Remove any existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    input.style.borderColor = '#f44336';
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#f44336';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    formGroup.appendChild(errorDiv);
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    input.style.borderColor = '#e0e0e0';
}

// Real-time validation for email
document.getElementById('email').addEventListener('blur', function() {
    if (this.value && !isValidEmail(this.value)) {
        showError(this, 'Please enter a valid email address');
    } else if (this.value) {
        clearError(this);
    }
});

// Clear error on input
document.getElementById('email').addEventListener('input', function() {
    if (this.value) {
        clearError(this);
    }
});

// Track form submission
let submitted = false;

// Form submission
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    // Get form values
    const emailInput = document.getElementById('email');
    const email = emailInput.value.trim();
    
    // Validate email before submission
    if (!isValidEmail(email)) {
        e.preventDefault();
        showError(emailInput, 'Please enter a valid email address');
        emailInput.focus();
        return;
    }
    
    // Clear any errors
    clearError(emailInput);
    
    // Set submitted flag
    submitted = true;
    
    // Show success message after a short delay
    setTimeout(() => {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');
        
        // Reset form
        document.getElementById('feedbackForm').reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }, 500);
});