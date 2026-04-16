const STORAGE_USER_KEY = 'studyAppUser';
const STORAGE_ADMIN_KEY = 'studyAppAdmin';
const STORAGE_MATERIALS_KEY = 'studyMaterials';

function getMaterials() {
  const saved = localStorage.getItem(STORAGE_MATERIALS_KEY);
  if (!saved) {
    const defaultMaterials = [
      { title: 'Introduction to HTML', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML' },
      { title: 'CSS Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps' },
      { title: 'JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
    ];
    localStorage.setItem(STORAGE_MATERIALS_KEY, JSON.stringify(defaultMaterials));
    return defaultMaterials;
  }

  try {
    return JSON.parse(saved) || [];
  } catch (error) {
    return [];
  }
}

function saveMaterials(materials) {
  localStorage.setItem(STORAGE_MATERIALS_KEY, JSON.stringify(materials));
}

function showAlert(container, message, type = 'success') {
  if (!container) return;
  const alertBox = document.createElement('div');
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  container.innerHTML = '';
  container.appendChild(alertBox);
  setTimeout(() => {
    if (container.contains(alertBox)) {
      container.removeChild(alertBox);
    }
  }, 3000);
}

function ensureUserLoggedIn() {
  const user = localStorage.getItem(STORAGE_USER_KEY);
  if (!user) {
    location.replace('index.html');
    return null;
  }
  return user;
}

function ensureAdminLoggedIn() {
  const isAdmin = localStorage.getItem(STORAGE_ADMIN_KEY);
  if (isAdmin !== 'true') {
    location.replace('admin.html');
    return false;
  }
  return true;
}

function logoutUser() {
  localStorage.removeItem(STORAGE_USER_KEY);
  location.replace('index.html');
}

function logoutAdmin() {
  localStorage.removeItem(STORAGE_ADMIN_KEY);
  location.replace('admin.html');
}
