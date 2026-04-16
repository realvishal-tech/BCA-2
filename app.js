// ==================== STORAGE KEYS ====================
const STORAGE_USER_KEY = 'studyAppUser';
const STORAGE_ADMIN_KEY = 'studyAppAdmin';

// Category storage keys
const STORAGE_NOTES_KEY = 'notes';
const STORAGE_LINKS_KEY = 'importantLinks';
const STORAGE_MATERIALS_KEY = 'studyMaterials';

// ==================== CATEGORIZED RESOURCE MANAGEMENT ====================

/**
 * Get all notes from localStorage
 */
function getNotes() {
  const saved = localStorage.getItem(STORAGE_NOTES_KEY);
  if (!saved) {
    const defaultNotes = [
      { title: 'JavaScript Fundamentals', url: 'https://www.w3schools.com/js/DEFAULT.asp' },
      { title: 'Web Development Basics', url: 'https://www.w3schools.com/whatis/default.asp' },
      { title: 'Programming Concepts', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
    ];
    localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(defaultNotes));
    return defaultNotes;
  }
  try {
    return JSON.parse(saved) || [];
  } catch (error) {
    console.error('Error parsing notes:', error);
    return [];
  }
}

/**
 * Get all important links from localStorage
 */
function getImportantLinks() {
  const saved = localStorage.getItem(STORAGE_LINKS_KEY);
  if (!saved) {
    const defaultLinks = [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/' },
      { title: 'W3Schools Tutorial', url: 'https://www.w3schools.com/' },
    ];
    localStorage.setItem(STORAGE_LINKS_KEY, JSON.stringify(defaultLinks));
    return defaultLinks;
  }
  try {
    return JSON.parse(saved) || [];
  } catch (error) {
    console.error('Error parsing links:', error);
    return [];
  }
}

/**
 * Get all study materials from localStorage
 */
function getStudyMaterials() {
  const saved = localStorage.getItem(STORAGE_MATERIALS_KEY);
  if (!saved) {
    const defaultMaterials = [
      { title: 'Introduction to HTML', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML' },
      { title: 'CSS Basics & Styling', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps' },
      { title: 'JavaScript Complete Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
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
 * Save notes to localStorage
 */
function saveNotes(notes) {
  localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notes));
}

/**
 * Save important links to localStorage
 */
function saveImportantLinks(links) {
  localStorage.setItem(STORAGE_LINKS_KEY, JSON.stringify(links));
}

/**
 * Save study materials to localStorage
 */
function saveStudyMaterials(materials) {
  localStorage.setItem(STORAGE_MATERIALS_KEY, JSON.stringify(materials));
}

/**
 * Get all materials (for backward compatibility)
 */
function getMaterials() {
  return getStudyMaterials();
}

/**
 * Save materials (for backward compatibility)
 */
function saveMaterials(materials) {
  saveStudyMaterials(materials);
}

/**
 * Add item to a category
 */
function addToCategory(category, item) {
  let items;
  
  switch(category) {
    case 'notes':
      items = getNotes();
      items.push(item);
      saveNotes(items);
      break;
    case 'links':
      items = getImportantLinks();
      items.push(item);
      saveImportantLinks(items);
      break;
    case 'materials':
      items = getStudyMaterials();
      items.push(item);
      saveStudyMaterials(items);
      break;
  }
}

/**
 * Remove item from category by index
 */
function removeFromCategory(category, index) {
  let items;
  
  switch(category) {
    case 'notes':
      items = getNotes();
      items.splice(index, 1);
      saveNotes(items);
      break;
    case 'links':
      items = getImportantLinks();
      items.splice(index, 1);
      saveImportantLinks(items);
      break;
    case 'materials':
      items = getStudyMaterials();
      items.splice(index, 1);
      saveStudyMaterials(items);
      break;
  }
}

/**
 * Get all resources (all categories combined)
 */
function getAllResources() {
  return {
    notes: getNotes(),
    links: getImportantLinks(),
    materials: getStudyMaterials()
  };
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

/**
 * Extract domain name from URL
 */
function getDomainName(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch (_) {
    return 'Link';
  }
}

/**
 * Create preview card element
 */
function createPreviewCard(item, category, index) {
  const domain = getDomainName(item.url);
  const card = document.createElement('div');
  card.className = 'preview-card';
  card.innerHTML = `
    <div class="preview-header">
      <div class="preview-favicon">
        <img src="https://www.google.com/s2/favicons?domain=${domain}&sz=32" alt="favicon" onerror="this.src='🔗'">
      </div>
      <div class="preview-meta">
        <div class="preview-title">${item.title}</div>
        <div class="preview-domain">${domain}</div>
      </div>
    </div>
    <div class="preview-actions">
      <button class="btn-preview-open" data-url="${item.url}" title="Open link">🔗</button>
      <button class="btn-preview-delete" data-category="${category}" data-index="${index}" title="Delete (admin only)">🗑️</button>
    </div>
  `;
  return card;
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
