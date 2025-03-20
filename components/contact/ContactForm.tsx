"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';
import { Button } from '@/components/ui';
import { TextInput } from '@/components/forms';

// Types for the form data
interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

// Types for validation errors
interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Types for submission state
type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // State for submission status
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');
  
  // State for submission message
  const [submissionMessage, setSubmissionMessage] = useState('');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Set submission state
    setSubmissionState('submitting');
    
    try {
      // Submit form data
      const result = await submitContactForm(formData);
      
      if (result.success) {
        // Reset form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
        setSubmissionState('success');
        setSubmissionMessage(result.message);
      } else {
        setSubmissionState('error');
        setSubmissionMessage(result.message || 'Something went wrong. Please try again later');
      }
    } catch (error) {
      setSubmissionState('error');
      setSubmissionMessage('Something went wrong. Please try again later');
      console.error('Error submitting form:', error);
    }
  };

  // Handle cursor text for form elements
  const setCursorText = (text: string) => {
    // This will be implemented with the real cursor hook in the actual app
    // For testing, we'll just set a data attribute on the body
    document.body.setAttribute('data-cursor-text', text);
  };

  return (
    <motion.div
      className="contact-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {submissionState === 'success' ? (
        <div className="success-message">
          <h3 className="text-2xl font-bold mb-4">Message Sent!</h3>
          <p 
            role="status" 
            aria-live="polite"
          >
            {submissionMessage}
          </p>
          <Button
            className="mt-6"
            onClick={() => setSubmissionState('idle')}
            onMouseEnter={() => setCursorText('NEW')}
            onMouseLeave={() => setCursorText('')}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              onMouseEnter={() => setCursorText('TYPE')}
              onMouseLeave={() => setCursorText('')}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-bold mb-2">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              onMouseEnter={() => setCursorText('TYPE')}
              onMouseLeave={() => setCursorText('')}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="company" className="block text-sm font-bold mb-2">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300"
              onMouseEnter={() => setCursorText('TYPE')}
              onMouseLeave={() => setCursorText('')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject" className="block text-sm font-bold mb-2">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300"
              onMouseEnter={() => setCursorText('TYPE')}
              onMouseLeave={() => setCursorText('')}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className="block text-sm font-bold mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 border ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
              onMouseEnter={() => setCursorText('TYPE')}
              onMouseLeave={() => setCursorText('')}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                {errors.message}
              </p>
            )}
          </div>
          
          {submissionState === 'error' && (
            <div className="bg-red-50 p-4 rounded">
              <p className="text-red-700" role="alert" aria-live="assertive">
                {submissionMessage}
              </p>
            </div>
          )}
          
          <Button
            type="submit"
            disabled={submissionState === 'submitting'}
            className="w-full p-4 bg-black text-white font-bold hover:bg-gray-800 transition-colors"
            onMouseEnter={() => setCursorText('SEND')}
            onMouseLeave={() => setCursorText('')}
          >
            {submissionState === 'submitting' ? 'Sending...' : 'SEND MESSAGE'}
          </Button>
        </form>
      )}
    </motion.div>
  );
} 