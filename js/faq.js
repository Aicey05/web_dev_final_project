// FAQ functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        // Initially hide all answers
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out';
        answer.style.padding = '0 1rem';
        
        question.addEventListener('click', () => {
          // Toggle active class
          item.classList.toggle('active');
          
          // Toggle answer visibility
          if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            answer.style.padding = '1rem';
            icon.style.transform = 'rotate(180deg)';
          } else {
            answer.style.maxHeight = '0';
            answer.style.padding = '0 1rem';
            icon.style.transform = 'rotate(0)';
          }
          
          // Close other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
              otherItem.classList.remove('active');
              const otherAnswer = otherItem.querySelector('.faq-answer');
              const otherIcon = otherItem.querySelector('.faq-icon');
              otherAnswer.style.maxHeight = '0';
              otherAnswer.style.padding = '0 1rem';
              otherIcon.style.transform = 'rotate(0)';
            }
          });
        });
      });
    }
  });