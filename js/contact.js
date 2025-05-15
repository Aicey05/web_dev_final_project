// Contact form validation
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Create validator
        const validator = new window.FormValidator(contactForm);
        validator.resetErrors();
        
        // Validate each field
        validator.validateRequired(document.getElementById('name'), 'Please enter your name');
        validator.validateRequired(document.getElementById('email'), 'Please enter your email address');
        
        if (email) {
          validator.validateEmail(document.getElementById('email'), 'Please enter a valid email address');
        }
        
        validator.validateRequired(document.getElementById('subject'), 'Please enter a subject');
        validator.validateRequired(document.getElementById('message'), 'Please enter your message');
        validator.validateMinLength(document.getElementById('message'), 20, 'Your message should be at least 20 characters');
        
        // Handle the submission
        if (validator.isValid()) {
          // In a real application, you would send the data to your server here
          // For this example, we'll just show a success message
          
          // Show success toast
          window.toast.show('Your message has been sent successfully! We will get back to you soon.', 'success');
          
          // Reset form
          contactForm.reset();
        } else {
          // Display validation errors
          validator.displayErrors();
        }
      });
    }
  });