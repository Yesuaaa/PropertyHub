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

export const VALID_PRIORITIES = ['low', 'medium', 'high', 'urgent'];
export const VALID_STATUS_VALUES = ['open', 'in_progress', 'resolved', 'closed'];

export const STATUS_LABEL_TO_VALUE = {
    Open: 'open',
    'In Progress': 'in_progress',
    Resolved: 'resolved',
    Closed: 'closed',
    open: 'open',
    in_progress: 'in_progress',
    resolved: 'resolved',
    closed: 'closed'
};

export const STATUS_FLOW = {
    open: ['in_progress'],
    in_progress: ['resolved'],
    resolved: ['closed'],
    closed: []
};

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,60}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export function cleanText(value, maxLength = 1000) {
    return String(value ?? '')
        .replace(/<[^>]*>/g, '')
        .replace(/[\u0000-\u001F\u007F]/g, '')
        .trim()
        .slice(0, maxLength);
}

export function normalizeEmail(value) {
    return cleanText(value, 254).toLowerCase();
}

export function normalizeName(value) {
    return cleanText(value, 60).replace(/\s+/g, ' ');
}

export function normalizePriority(value) {
    const priorityMap = {
        low: 'low',
        medium: 'medium',
        high: 'high',
        critical: 'urgent',
        urgent: 'urgent'
    };
    return priorityMap[String(value ?? '').trim().toLowerCase()] || '';
}

export function validatePassword(password, userParts = []) {
    if (!passwordRegex.test(password || '')) {
        return 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character';
    }

    const loweredPassword = password.toLowerCase();
    const hasPersonalInfo = userParts
        .map((part) => String(part || '').trim().toLowerCase())
        .filter((part) => part.length >= 3)
        .some((part) => loweredPassword.includes(part));

    if (hasPersonalInfo) {
        return 'Password cannot contain your name or email';
    }

    return null;
}

export function isValidStatusTransition(oldStatus, newStatus) {
    if (oldStatus === newStatus) return true;
    return STATUS_FLOW[oldStatus]?.includes(newStatus) || false;
}
