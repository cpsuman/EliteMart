export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Allows formats: +1234567890, 1234567890, (123) 456-7890
  const phoneRegex = /^\+?\d{10,12}$|^\(\d{3}\)\s?\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  // Ensure we have exactly 10 digits
  if (cleaned.length !== 10) return phone;
  // Format as (XXX) XXX-XXXX
  return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
};