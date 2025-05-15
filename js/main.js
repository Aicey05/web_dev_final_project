// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const currentYearElement = document.getElementById('current-year');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (mobileMenu.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
});

// Toast notification system
class Toast {
  constructor() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.className = 'toast-container';
    document.body.appendChild(this.toastContainer);
  }
  
  show(message, type = 'success', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if (type === 'success') {
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
      icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    }
    
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-content">
        <div class="toast-title">${type === 'success' ? 'Success' : 'Error'}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Close notification">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;
    
    this.toastContainer.appendChild(toast);
    
    // Add close event listener
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      this.close(toast);
    });
    
    // Auto close after duration
    setTimeout(() => {
      this.close(toast);
    }, duration);
    
    return toast;
  }
  
  close(toast) {
    toast.classList.add('hide');
    setTimeout(() => {
      if (toast.parentNode === this.toastContainer) {
        this.toastContainer.removeChild(toast);
      }
    }, 300); // Match the animation duration
  }
}

// Initialize toast system
window.toast = new Toast();

// Form validation utility
class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = {};
  }
  
  validateRequired(field, message = `${field.name} is required`) {
    if (!field.value.trim()) {
      this.errors[field.name] = message;
      return false;
    }
    return true;
  }
  
  validateEmail(field, message = 'Please enter a valid email address') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      this.errors[field.name] = message;
      return false;
    }
    return true;
  }
  
  validatePhone(field, message = 'Please enter a valid phone number') {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    const cleanedPhone = field.value.replace(/[^0-9+]/g, '');
    if (!phoneRegex.test(cleanedPhone)) {
      this.errors[field.name] = message;
      return false;
    }
    return true;
  }
  
  validateMinLength(field, minLength, message = `${field.name} must be at least ${minLength} characters`) {
    if (field.value.trim().length < minLength) {
      this.errors[field.name] = message;
      return false;
    }
    return true;
  }
  
  displayErrors() {
    // First, remove any existing error messages
    const existingErrors = this.form.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    // Reset error styles
    this.form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(input => {
      input.style.borderColor = '';
    });
    
    // Display new error messages
    for (const [fieldName, errorMessage] of Object.entries(this.errors)) {
      const field = this.form.querySelector(`[name="${fieldName}"]`);
      if (field) {
        // Add error style to input
        field.style.borderColor = 'var(--destructive)';
        
        // Create and append error message
        const errorElement = document.createElement('div');
        errorElement.className = 'form-error';
        errorElement.textContent = errorMessage;
        
        const parentElement = field.parentElement;
        parentElement.appendChild(errorElement);
      }
    }
    
    // Focus on the first field with an error
    const firstErrorField = this.form.querySelector(`[name="${Object.keys(this.errors)[0]}"]`);
    if (firstErrorField) {
      firstErrorField.focus();
    }
  }
  
  isValid() {
    return Object.keys(this.errors).length === 0;
  }
  
  resetErrors() {
    this.errors = {};
  }
}

// Export these utilities for use in other scripts
window.FormValidator = FormValidator;