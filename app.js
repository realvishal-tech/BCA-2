// ==================== STORAGE KEYS ====================
const STORAGE_USER_KEY = 'studyAppUser';
const STORAGE_ADMIN_KEY = 'studyAppAdmin';
const STORAGE_MATERIALS_KEY = 'studyMaterials';

// ==================== MATERIAL MANAGEMENT ====================

/**
 * Get all study materials from localStorage
 * Returns default materials if none exist
 */
function getMaterials() {
  const saved = localStorage.getItem(STORAGE_MATERIALS_KEY);
  if (!saved) {
    const defaultMaterials = [
      { 
        title: 'Introduction to HTML', 
        url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML' 
      },
      { 
        title: 'CSS Basics & Styling', 
        url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps' 
      },
      { 
        title: 'JavaScript Complete Guide', 
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' 
      },
    ];
    localStorage.setItem(STORAGE_MATERIALS_KEY, JSON.stringify(defaultMaterials));
    return defaultMaterials;
  }

  try {
    return JSON.parse(saved) || [];
  } catch (error) {
    console.error('Error parsing materials:', error);
    return [];
  }
}

/**
 * Save materials to localStorage
 */
function saveMaterials(materials) {
  localStorage.setItem(STORAGE_MATERIALS_KEY, JSON.stringify(materials));
}

// ==================== ALERT SYSTEM ====================

/**
 * Show alert notification
 * @param {Element} container - Container element for alert
 * @param {string} message - Alert message
 * @param {string} type - 'success' or 'error'
 */
function showAlert(container, message, type = 'success') {
  if (!container) return;
  
  const alertBox = document.createElement('div');
  alertBox.className = `alert alert-${type}`;
  
  const icon = type === 'success' ? '✓' : '✕';
  alertBox.innerHTML = `
    <span class="alert-icon">${icon}</span>
    <span>${message}</span>
  `;
  
  container.innerHTML = '';
  container.appendChild(alertBox);
  
  // Auto-remove after 3.5 seconds
  setTimeout(() => {
    if (container.contains(alertBox)) {
      alertBox.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        if (container.contains(alertBox)) {
          container.removeChild(alertBox);
        }
      }, 300);
    }
  }, 3500);
}

// ==================== AUTHENTICATION ====================

/**
 * Ensure user is logged in
 * Redirects to login if not authenticated
 */
function ensureUserLoggedIn() {
  const user = localStorage.getItem(STORAGE_USER_KEY);
  if (!user) {
    location.replace('index.html');
    return null;
  }
  return user;
}

/**
 * Ensure admin is logged in
 * Redirects to admin login if not authenticated
 */
function ensureAdminLoggedIn() {
  const isAdmin = localStorage.getItem(STORAGE_ADMIN_KEY);
  if (isAdmin !== 'true') {
    location.replace('admin.html');
    return false;
  }
  return true;
}

/**
 * Logout user and redirect to login page
 */
function logoutUser() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem(STORAGE_USER_KEY);
    location.replace('index.html');
  }
}

/**
 * Logout admin and redirect to admin login page
 */
function logoutAdmin() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem(STORAGE_ADMIN_KEY);
    location.replace('admin.html');
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Format date to readable format
 */
function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Get user initials from name
 */
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
}

/**
 * Check if URL is valid
 */
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// ==================== THEME UTILITIES ====================

/**
 * Set theme color (for future theme support)
 */
function setTheme(theme) {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

/**
 * Get current theme
 */
function getTheme() {
  return localStorage.getItem('theme') || 'dark';
}
