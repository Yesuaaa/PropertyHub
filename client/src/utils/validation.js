export const TYPE_CATEGORIES = {
  'Hardware Issue': ['PC / Computer', 'Peripherals', 'Gaming Console', 'Printer'],
  'Software Issue': ['PC / Computer', 'Account Login'],
  'Network Problem': ['Wi-Fi', 'LAN Connection', 'Slow Speed', 'Account Login'],
  'Billing Concern': ['Hourly Rate', 'Membership', 'Load / Top-up', 'Printing Charge'],
  'Safety Concern': ['Power Outage', 'Ventilation', 'Workstation Area'],
  'Cleanliness / Comfort': ['Restrooms', 'Workstation Area', 'Gaming Area', 'VIP / Premium Room'],
  'Noise / Disruption': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room'],
  'Gaming Area Concern': ['Gaming Console', 'Gaming Area', 'Peripherals'],
  'Workstation Concern': ['PC / Computer', 'Peripherals', 'Workstation Area', 'Printer'],
  'General Feedback': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room', 'Hourly Rate', 'Membership'],
  'Staff / Service': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room', 'Hourly Rate']
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,60}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export function cleanText(value) {
  return String(value || '').replace(/<[^>]*>/g, '').trim();
}

export function passwordStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[\W_]/.test(password)) score += 1;

  if (score <= 1) return { label: 'Weak', width: '25%' };
  if (score === 2) return { label: 'Fair', width: '50%' };
  if (score === 3) return { label: 'Strong', width: '75%' };
  return { label: 'Very strong', width: '100%' };
}

export function validateRegistration({ firstName, lastName, email, password, confirmPassword, agreeTerms }) {
  const cleanFirst = cleanText(firstName);
  const cleanLast = cleanText(lastName);
  const cleanEmail = cleanText(email).toLowerCase();

  if (!cleanFirst) return 'First name is required.';
  if (!cleanLast) return 'Last name is required.';
  if (!nameRegex.test(cleanFirst) || !nameRegex.test(cleanLast)) return 'Names must be 2-60 characters and use letters, spaces, hyphens, or apostrophes only.';
  if (!cleanEmail) return 'Email is required.';
  if (!emailRegex.test(cleanEmail)) return 'Please enter a valid email address.';
  if (!passwordRegex.test(password)) return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  if (!agreeTerms) return 'You must agree to the Terms of Service and Privacy Policy.';
  return '';
}

export function validateLogin({ email, password }) {
  const cleanEmail = cleanText(email).toLowerCase();
  if (!cleanEmail) return 'Email is required.';
  if (!emailRegex.test(cleanEmail)) return 'Please enter a valid email address.';
  if (!password) return 'Password is required.';
  return '';
}

export function validateTicket({ type, category, description }) {
  const cleanType = cleanText(type);
  const cleanCategory = cleanText(category);
  const cleanDescription = cleanText(description);

  if (!cleanType) return 'Please select a request type.';
  if (!TYPE_CATEGORIES[cleanType]) return 'Please select a valid request type.';
  if (!cleanCategory) return 'Please select a category.';
  if (!TYPE_CATEGORIES[cleanType].includes(cleanCategory)) return 'Please select a valid category for the chosen type.';
  if (!cleanDescription) return 'Description is required.';
  if (cleanDescription.length < 10) return 'Description must be at least 10 characters.';
  if (cleanDescription.length > 1000) return 'Description must be 1000 characters or less.';
  return '';
}
