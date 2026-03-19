import { useState } from 'react';

export default function useContactForm(initialSubject) {
  const [formState, setFormState] = useState({ 
    name: '', 
    email: '', 
    message: initialSubject ? `Ik heb interesse in: ${initialSubject}\n\n` : '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Construct the mailto: link
    const subject = encodeURIComponent('Nieuw bericht via website');
    const body = encodeURIComponent(
      `Naam: ${formState.name}\n` +
      `E-mailadres: ${formState.email}\n\n` +
      `Bericht:\n${formState.message}`
    );
    
    // Open the default mail client
    window.location.href = `mailto:info@sounds-perfect.nl?subject=${subject}&body=${body}`;
    
    // Show success state briefly then reset
    setIsSuccess(true);
    setIsSubmitting(false);
    
    setTimeout(() => {
      setIsSuccess(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return { formState, isSubmitting, isSuccess, setIsSuccess, handleChange, handleSubmit };
}
