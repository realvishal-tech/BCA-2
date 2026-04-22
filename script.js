/* ============================================================
   BCA STUDY HUB — MAIN SCRIPT
   Pure frontend, localStorage-based
============================================================ */

// ===== STORAGE KEYS =====
const K = {
  DARK: 'bsh_dark',
  PROGRESS: 'bsh_progress',
  BOOKMARKS: 'bsh_bookmarks',
  REVISIONS: 'bsh_revisions',
  SUGGESTIONS: 'bsh_suggestions',
  HEATMAP: 'bsh_heatmap',
  SCROLL: 'bsh_scroll',
  CONTENT: 'bsh_content',
  HIGHLIGHTS: 'bsh_highlights',
  USER_NOTES: 'bsh_user_notes',
  CHALLENGE: 'bsh_challenge',
  ADMIN: 'bsh_admin_ok',
  STUDY_TABS: 'bsh_study_tabs',
};

// ===== ADMIN CREDENTIALS (encoded) =====
// These are only used for comparison; not displayed anywhere in the UI.
const _AE = btoa('10717vishal@gmail.com');
const _AP = btoa('Vishal@@2004');
function verifyAdmin(email, pass) { return btoa(email) === _AE && btoa(pass) === _AP; }

// ===== SEMESTER DATA =====
const SEMESTERS = {
  1: {
    name: 'Semester 1',
    icon: '🏫',
    subjects: [
      { code: 'BCA-101', name: 'Mathematical Foundation', icon: '📐', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-102', name: 'Computer Fundamentals', icon: '💻', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-103', name: 'Business Communication & Information System', icon: '📋', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-104', name: 'C Programming', icon: '🔤', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-105', name: 'Lab on DOS & Windows', icon: '🖥️', type: 'lab', hasPrograms: false, hasLab: true },
      { code: 'BCA-106', name: 'Lab on C', icon: '⌨️', type: 'lab', hasPrograms: true, hasLab: true },
    ]
  },
  2: {
    name: 'Semester 2',
    icon: '📚',
    subjects: [
      { code: 'BCA-201', name: 'Discrete Mathematics', icon: '🔢', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-202', name: 'Computer Architecture', icon: '🏗️', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-203', name: 'Data Structure through C', icon: '🌲', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-204', name: 'System Analysis and Design', icon: '📊', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-205', name: 'Lab on MS-Office', icon: '📎', type: 'lab', hasPrograms: false, hasLab: true },
      { code: 'BCA-206', name: 'Lab on Data Structure', icon: '🗂️', type: 'lab', hasPrograms: true, hasLab: true },
    ]
  },
  3: {
    name: 'Semester 3',
    icon: '🎯',
    subjects: [
      { code: 'BCA-301', name: 'Management & Business Accounting', icon: '💼', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-302', name: 'Database Management System', icon: '🗄️', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-303', name: 'Object Oriented Programming using C++', icon: '🔷', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-304', name: 'Numerical Methodology', icon: '🔢', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-305', name: 'Lab on DBMS', icon: '🖥️', type: 'lab', hasPrograms: true, hasLab: true },
      { code: 'BCA-306', name: 'Lab on C++', icon: '⌨️', type: 'lab', hasPrograms: true, hasLab: true },
    ]
  },
  4: {
    name: 'Semester 4',
    icon: '🚀',
    subjects: [
      { code: 'BCA-401', name: 'Java Programming', icon: '☕', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-402', name: 'Computer Graphics & Multimedia', icon: '🎨', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-403', name: 'Operating System & Linux', icon: '🐧', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-404', name: 'Software Engineering', icon: '⚙️', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-405', name: 'Lab on Java', icon: '☕', type: 'lab', hasPrograms: true, hasLab: true },
      { code: 'BCA-406', name: 'Lab on Graphics & Linux', icon: '🖥️', type: 'lab', hasPrograms: true, hasLab: true },
    ]
  },
  5: {
    name: 'Semester 5',
    icon: '💡',
    subjects: [
      { code: 'BCA-501', name: 'RDBMS', icon: '🗃️', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-502', name: 'AI with Python', icon: '🤖', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-503', name: 'Web Technology (HTML, CSS, JS)', icon: '🌐', type: 'theory', hasPrograms: true, hasLab: false },
      { code: 'BCA-504', name: 'Network & Cyber Law', icon: '🔒', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-505', name: 'Lab on Oracle', icon: '🗄️', type: 'lab', hasPrograms: true, hasLab: true },
      { code: 'BCA-506', name: 'Lab on Python & Web', icon: '🐍', type: 'lab', hasPrograms: true, hasLab: true },
    ]
  },
  6: {
    name: 'Semester 6',
    icon: '🎓',
    subjects: [
      { code: 'BCA-601', name: 'Project', icon: '📁', type: 'lab', hasPrograms: true, hasLab: true },
      { code: 'BCA-602', name: 'Seminar', icon: '🎤', type: 'theory', hasPrograms: false, hasLab: false },
      { code: 'BCA-603', name: 'Viva', icon: '🗣️', type: 'theory', hasPrograms: false, hasLab: false },
    ]
  }
};

// ===== DEFAULT CONTENT (demo data) =====
const DEFAULT_CONTENT = {
  'BCA-104': {
    notes: [
      { id: 'n1', title: 'Introduction to C Programming', desc: 'Basic syntax, data types, variables, operators', url: 'https://www.w3schools.com/c/index.php', type: 'link' },
      { id: 'n2', title: 'Control Flow in C', desc: 'if-else, loops (for, while, do-while), switch-case', url: 'https://www.tutorialspoint.com/cprogramming/c_decision_making.htm', type: 'link' },
    ],
    pyqs: [
      { id: 'q1', title: 'BCA-104 PYQ 2022', year: '2022', desc: 'Previous year question paper with solutions', url: '#', type: 'link' },
    ],
    videos: [
      { id: 'v1', title: 'C Programming Full Course', youtubeId: 'KJgsSFOSQv0', desc: 'Complete beginner to advanced C programming tutorial' },
    ],
    programs: [
      { id: 'p1', title: 'Hello World in C', code: '#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}', desc: 'Basic Hello World program' },
      { id: 'p2', title: 'Fibonacci Series', code: '#include <stdio.h>\nint main() {\n    int n, a=0, b=1, c;\n    printf("Enter terms: ");\n    scanf("%d", &n);\n    for(int i=0; i<n; i++) {\n        printf("%d ", a);\n        c = a+b; a = b; b = c;\n    }\n    return 0;\n}', desc: 'Print Fibonacci series up to n terms' },
    ],
    lab: []
  },
  'BCA-203': {
    notes: [
      { id: 'n1', title: 'Introduction to Data Structures', desc: 'Arrays, linked lists, stacks, queues overview', url: 'https://www.geeksforgeeks.org/data-structures/', type: 'link' },
    ],
    pyqs: [],
    videos: [
      { id: 'v1', title: 'Data Structures Full Course', youtubeId: 'RBSGKlAvoiM', desc: 'Complete data structures tutorial in C' },
    ],
    programs: [
      { id: 'p1', title: 'Linked List Implementation', code: '#include <stdio.h>\n#include <stdlib.h>\nstruct Node {\n    int data;\n    struct Node* next;\n};\nvoid printList(struct Node* n) {\n    while(n) { printf("%d -> ", n->data); n=n->next; }\n    printf("NULL\\n");\n}\nint main() {\n    struct Node* head = NULL;\n    struct Node* n1 = malloc(sizeof(struct Node));\n    n1->data = 1; n1->next = NULL; head = n1;\n    printList(head);\n    return 0;\n}', desc: 'Basic singly linked list' },
    ],
    lab: []
  },
  'BCA-302': {
    notes: [
      { id: 'n1', title: 'DBMS Introduction', desc: 'Database concepts, DBMS architecture, data models', url: 'https://www.geeksforgeeks.org/dbms/', type: 'link' },
      { id: 'n2', title: 'SQL Basics', desc: 'SELECT, INSERT, UPDATE, DELETE, JOIN operations', url: 'https://www.w3schools.com/sql/', type: 'link' },
    ],
    pyqs: [],
    videos: [
      { id: 'v1', title: 'DBMS Complete Course', youtubeId: 'T7AxM7YedEE', desc: 'Full DBMS course for BCA students' },
    ],
    programs: [
      { id: 'p1', title: 'Basic SQL Queries', code: '-- Create Table\nCREATE TABLE Students (\n    id INT PRIMARY KEY,\n    name VARCHAR(50),\n    marks INT\n);\n\n-- Insert Records\nINSERT INTO Students VALUES (1, \'Alice\', 85);\nINSERT INTO Students VALUES (2, \'Bob\', 90);\n\n-- Select All\nSELECT * FROM Students;\n\n-- Select with Condition\nSELECT * FROM Students WHERE marks > 80;', desc: 'Basic DBMS SQL operations' },
    ],
    lab: [
      { id: 'l1', title: 'Lab 1: Database Creation', desc: 'Create and manipulate a student database', code: '-- Lab Exercise 1\n-- Create a database for a library system\nCREATE DATABASE Library;\nUSE Library;\nCREATE TABLE Books (\n    book_id INT PRIMARY KEY AUTO_INCREMENT,\n    title VARCHAR(100) NOT NULL,\n    author VARCHAR(60),\n    year INT\n);\nINSERT INTO Books(title,author,year) VALUES(\'DBMS\',\'Navathe\',2010);\nSELECT * FROM Books;' },
    ]
  },
  'BCA-303': {
    notes: [
      { id: 'n1', title: 'OOP Concepts in C++', desc: 'Classes, objects, inheritance, polymorphism, encapsulation', url: 'https://www.tutorialspoint.com/cplusplus/index.htm', type: 'link' },
    ],
    pyqs: [],
    videos: [
      { id: 'v1', title: 'C++ OOP Full Course', youtubeId: 'wN0x9eZLix4', desc: 'Object-oriented programming in C++' },
    ],
    programs: [
      { id: 'p1', title: 'Class & Object in C++', code: '#include <iostream>\nusing namespace std;\nclass Student {\npublic:\n    string name;\n    int roll;\n    void display() {\n        cout << "Name: " << name << ", Roll: " << roll << endl;\n    }\n};\nint main() {\n    Student s;\n    s.name = "Alice"; s.roll = 1;\n    s.display();\n    return 0;\n}', desc: 'Basic class and object example' },
    ],
    lab: []
  },
  'BCA-502': {
    notes: [
      { id: 'n1', title: 'Python for AI', desc: 'Python basics, NumPy, pandas, scikit-learn overview', url: 'https://www.w3schools.com/python/', type: 'link' },
    ],
    pyqs: [],
    videos: [
      { id: 'v1', title: 'Python AI Course', youtubeId: 'JMUxmLyrhSk', desc: 'AI and machine learning with Python' },
    ],
    programs: [
      { id: 'p1', title: 'Simple Linear Regression', code: '# Linear Regression with sklearn\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1],[2],[3],[4],[5]])\ny = np.array([2,4,5,4,5])\n\nmodel = LinearRegression()\nmodel.fit(X, y)\n\nprint("Slope:", model.coef_[0])\nprint("Intercept:", model.intercept_)\nprint("Prediction for X=6:", model.predict([[6]]))', desc: 'Basic ML linear regression example' },
    ],
    lab: []
  },
  'BCA-503': {
    notes: [
      { id: 'n1', title: 'HTML5 Fundamentals', desc: 'HTML structure, semantic elements, forms, multimedia', url: 'https://www.w3schools.com/html/', type: 'link' },
      { id: 'n2', title: 'CSS3 Styling', desc: 'Selectors, box model, flexbox, grid, animations', url: 'https://www.w3schools.com/css/', type: 'link' },
      { id: 'n3', title: 'JavaScript ES6+', desc: 'Variables, functions, arrays, DOM manipulation, fetch API', url: 'https://www.w3schools.com/js/', type: 'link' },
    ],
    pyqs: [],
    videos: [
      { id: 'v1', title: 'Web Development Full Course', youtubeId: 'nu_pCVPKzTk', desc: 'Complete HTML, CSS, JS tutorial' },
    ],
    programs: [
      { id: 'p1', title: 'Responsive Web Page', code: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>My Web Page</title>\n  <style>\n    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }\n    h1 { color: #4F46E5; }\n    .card { background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 10px 0; }\n  </style>\n</head>\n<body>\n  <h1>Hello BCA!</h1>\n  <div class="card"><p>Web Technology with HTML, CSS, JS</p></div>\n  <script>\n    document.querySelector(\'h1\').addEventListener(\'click\', () => alert(\'Clicked!\'));\n  </script>\n</body>\n</html>', desc: 'Basic responsive HTML page example' },
    ],
    lab: []
  }
};

// Sample PYQ questions for random generator
const SAMPLE_QUESTIONS = [
  { q: 'What is a pointer in C? Explain with example.', subject: 'C Programming', sem: 1 },
  { q: 'Explain the concept of recursion with a C program to compute factorial.', subject: 'C Programming', sem: 1 },
  { q: 'What is the difference between structure and union in C?', subject: 'C Programming', sem: 1 },
  { q: 'Define data structure. List different types of data structures.', subject: 'Data Structure', sem: 2 },
  { q: 'Write an algorithm to implement stack using array.', subject: 'Data Structure', sem: 2 },
  { q: 'What is a binary tree? Explain tree traversal methods.', subject: 'Data Structure', sem: 2 },
  { q: 'What is normalization in DBMS? Explain 1NF, 2NF, 3NF.', subject: 'DBMS', sem: 3 },
  { q: 'Differentiate between DDL and DML with examples.', subject: 'DBMS', sem: 3 },
  { q: 'What are the ACID properties of a transaction?', subject: 'DBMS', sem: 3 },
  { q: 'Explain the concept of class and object in C++ with example.', subject: 'OOP C++', sem: 3 },
  { q: 'What is inheritance? Explain types of inheritance with examples.', subject: 'OOP C++', sem: 3 },
  { q: 'Write a Java program to demonstrate polymorphism.', subject: 'Java', sem: 4 },
  { q: 'Explain exception handling in Java with try-catch-finally.', subject: 'Java', sem: 4 },
  { q: 'What is an interface in Java? How does it differ from abstract class?', subject: 'Java', sem: 4 },
  { q: 'Describe the features of Python as a programming language for AI.', subject: 'AI with Python', sem: 5 },
  { q: 'What is machine learning? Differentiate supervised and unsupervised learning.', subject: 'AI with Python', sem: 5 },
  { q: 'Write HTML code to create a registration form with validation.', subject: 'Web Technology', sem: 5 },
  { q: 'Explain CSS Flexbox layout model with example.', subject: 'Web Technology', sem: 5 },
  { q: 'What is RDBMS? How does it differ from DBMS?', subject: 'RDBMS', sem: 5 },
  { q: 'Explain primary key, foreign key and candidate key with examples.', subject: 'RDBMS', sem: 5 },
];

// Keyword definitions
const KEYWORD_DEFS = {
  'algorithm': 'A step-by-step procedure for solving a problem or accomplishing a task.',
  'recursion': 'A function that calls itself to solve a smaller version of the same problem.',
  'pointer': 'A variable that stores the memory address of another variable in C/C++.',
  'array': 'A collection of elements of the same data type stored in contiguous memory.',
  'stack': 'A linear data structure following LIFO (Last In, First Out) principle.',
  'queue': 'A linear data structure following FIFO (First In, First Out) principle.',
  'inheritance': 'OOP concept where a class acquires properties and methods of another class.',
  'polymorphism': 'OOP concept allowing one interface to be used for different data types.',
  'encapsulation': 'Wrapping data and methods that operate on data into a single unit (class).',
  'normalization': 'Process of organizing database tables to reduce redundancy and improve integrity.',
  'sql': 'Structured Query Language used to communicate with relational databases.',
  'loop': 'A control structure that repeats a block of code multiple times.',
  'function': 'A reusable block of code that performs a specific task.',
  'class': 'A blueprint/template for creating objects in OOP.',
  'object': 'An instance of a class containing data and methods.',
  'variable': 'A named storage location in memory that holds a value.',
  'compile': 'Converting source code into machine-readable binary code.',
  'debugging': 'The process of finding and fixing errors (bugs) in a program.',
  'api': 'Application Programming Interface — a set of rules for communication between software.',
  'database': 'An organized collection of structured data stored electronically.',
  'primary key': 'A unique identifier for each record in a database table.',
  'join': 'SQL operation that combines rows from two or more tables based on a related column.',
  'constructor': 'A special method called when an object is created to initialize its properties.',
  'interface': 'In Java, a contract specifying what methods a class must implement.',
  'exception': 'An error event that disrupts normal program execution.',
  'thread': 'The smallest unit of execution within a process.',
  'html': 'HyperText Markup Language — the standard language for creating web pages.',
  'css': 'Cascading Style Sheets — language for styling HTML elements.',
  'javascript': 'A scripting language used to make web pages interactive.',
  'machine learning': 'A branch of AI where systems learn from data to improve performance.',
  'neural network': 'Computing systems inspired by biological neural networks in the brain.',
};

// ===== LOCAL STORAGE HELPERS =====
const store = {
  get(key, def = null) {
    try { return JSON.parse(localStorage.getItem(key)) ?? def; } catch { return def; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  remove(key) { localStorage.removeItem(key); }
};

// ===== DARK MODE =====
function initDarkMode() {
  const saved = store.get(K.DARK, 'dark');
  document.documentElement.setAttribute('data-theme', saved);
  return saved;
}

function toggleDarkMode() {
  const curr = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = curr === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  store.set(K.DARK, next);
  document.querySelectorAll('.dark-toggle-btn').forEach(btn => {
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
    btn.title = next === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  });
  return next;
}

// ===== TOAST SYSTEM =====
function ensureToastContainer() {
  let c = document.getElementById('toastContainer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  return c;
}

function showToast(msg, type = 'success', duration = 3200) {
  const container = ensureToastContainer();
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span class="toast-msg">${msg}</span><button class="toast-close" aria-label="Close">✕</button>`;
  t.querySelector('.toast-close').addEventListener('click', () => dismissToast(t));
  container.appendChild(t);
  setTimeout(() => dismissToast(t), duration);
}

function dismissToast(t) {
  t.classList.add('toast-exit');
  setTimeout(() => t.remove(), 320);
}

// ===== PROGRESS TRACKER =====
function getProgress() { return store.get(K.PROGRESS, {}); }
function setProgress(code, done) {
  const p = getProgress();
  p[code] = done;
  store.set(K.PROGRESS, p);
}
function isCompleted(code) { return !!getProgress()[code]; }

function getSemesterProgress(semNum) {
  const subjects = SEMESTERS[semNum]?.subjects || [];
  if (!subjects.length) return 0;
  const done = subjects.filter(s => isCompleted(s.code)).length;
  return Math.round((done / subjects.length) * 100);
}

// ===== BOOKMARKS =====
function getBookmarks() { return store.get(K.BOOKMARKS, []); }
function toggleBookmark(code) {
  let bm = getBookmarks();
  if (bm.includes(code)) { bm = bm.filter(x => x !== code); showToast('Bookmark removed', 'info'); }
  else { bm.push(code); showToast('Bookmarked! 🔖', 'success'); }
  store.set(K.BOOKMARKS, bm);
  return bm.includes(code);
}
function isBookmarked(code) { return getBookmarks().includes(code); }

// ===== REVISION SCHEDULER =====
function getRevisions() { return store.get(K.REVISIONS, []); }
function scheduleRevision(code, name) {
  const revisions = getRevisions();
  const now = Date.now();
  const existing = revisions.filter(r => r.code !== code);
  const schedules = [
    { code, name, dueDate: now + 1*24*60*60*1000, interval: 1 },
    { code, name, dueDate: now + 3*24*60*60*1000, interval: 3 },
    { code, name, dueDate: now + 7*24*60*60*1000, interval: 7 },
  ];
  store.set(K.REVISIONS, [...existing, ...schedules]);
}
function getDueRevisions() {
  const now = Date.now();
  const revisions = getRevisions();
  return revisions.filter(r => r.dueDate <= now + 12*60*60*1000); // due within 12h
}

// ===== HEATMAP =====
function getHeatmap() { return store.get(K.HEATMAP, {}); }
function trackVisit(code) {
  const h = getHeatmap();
  h[code] = h[code] || { visits: 0, lastVisit: 0 };
  h[code].visits++;
  h[code].lastVisit = Date.now();
  store.set(K.HEATMAP, h);
}
function getHeatLevel(code) {
  const h = getHeatmap();
  const v = h[code]?.visits || 0;
  if (v === 0) return 0;
  if (v <= 2) return 1;
  if (v <= 5) return 2;
  if (v <= 10) return 3;
  return 4;
}

// ===== SCROLL POSITION =====
function saveScrollPos(page) {
  const pos = store.get(K.SCROLL, {});
  pos[page] = window.scrollY;
  store.set(K.SCROLL, pos);
}
function restoreScrollPos(page) {
  const pos = store.get(K.SCROLL, {});
  if (pos[page]) setTimeout(() => window.scrollTo({ top: pos[page], behavior: 'smooth' }), 200);
}

// ===== CONTENT MANAGEMENT =====
function getAllContent() { return store.get(K.CONTENT, {}); }
function getSubjectContent(code) {
  const all = getAllContent();
  return all[code] || DEFAULT_CONTENT[code] || { notes: [], pyqs: [], videos: [], programs: [], lab: [] };
}
function saveSubjectContent(code, data) {
  const all = getAllContent();
  all[code] = data;
  store.set(K.CONTENT, all);
}
function addContentItem(code, tab, item) {
  const content = getSubjectContent(code);
  content[tab] = content[tab] || [];
  item.id = Date.now().toString();
  content[tab].push(item);
  saveSubjectContent(code, content);
}
function deleteContentItem(code, tab, id) {
  const content = getSubjectContent(code);
  content[tab] = (content[tab] || []).filter(i => i.id !== id);
  saveSubjectContent(code, content);
}

// ===== SUGGESTIONS =====
function getSuggestions() { return store.get(K.SUGGESTIONS, []); }
function addSuggestion(name, message) {
  const arr = getSuggestions();
  arr.unshift({ id: Date.now().toString(), name: name || 'Anonymous', message, date: new Date().toLocaleString(), read: false });
  store.set(K.SUGGESTIONS, arr);
}
function markSuggestionRead(id) {
  const arr = getSuggestions();
  const s = arr.find(x => x.id === id);
  if (s) s.read = !s.read;
  store.set(K.SUGGESTIONS, arr);
}
function deleteSuggestion(id) {
  const arr = getSuggestions().filter(s => s.id !== id);
  store.set(K.SUGGESTIONS, arr);
}
function unreadCount() { return getSuggestions().filter(s => !s.read).length; }

// ===== TEXT TO SPEECH =====
let ttsUtterance = null;
let ttsPaused = false;

function ttsSpeak(text) {
  if (!window.speechSynthesis) { showToast('TTS not supported in this browser', 'error'); return; }
  ttsStop();
  ttsUtterance = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ' '));
  ttsUtterance.rate = 0.95;
  ttsUtterance.pitch = 1;
  ttsUtterance.onend = () => { ttsPaused = false; updateTTSButtons(); };
  window.speechSynthesis.speak(ttsUtterance);
  ttsPaused = false;
  updateTTSButtons();
  showToast('Reading notes aloud...', 'info');
}

function ttsPause() {
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause(); ttsPaused = true; updateTTSButtons();
  } else if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume(); ttsPaused = false; updateTTSButtons();
  }
}

function ttsStop() {
  window.speechSynthesis.cancel();
  ttsPaused = false;
  updateTTSButtons();
}

function updateTTSButtons() {
  document.querySelectorAll('.tts-play-btn').forEach(btn => {
    btn.textContent = (window.speechSynthesis.speaking && !window.speechSynthesis.paused) ? '⏸️ Pause' : '▶️ Play';
  });
}

// ===== VOICE COMMANDS =====
let speechRecognition = null;

function startVoiceCommand() {
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRec) { showToast('Voice commands not supported', 'error'); return; }
  const overlay = document.getElementById('voiceListeningOverlay');
  if (overlay) overlay.classList.add('active');

  speechRecognition = new SpeechRec();
  speechRecognition.continuous = false;
  speechRecognition.interimResults = false;
  speechRecognition.lang = 'en-US';

  speechRecognition.onresult = (event) => {
    const cmd = event.results[0][0].transcript.toLowerCase().trim();
    if (overlay) overlay.classList.remove('active');
    handleVoiceCommand(cmd);
  };
  speechRecognition.onerror = () => {
    if (overlay) overlay.classList.remove('active');
    showToast('Could not understand, try again', 'error');
  };
  speechRecognition.onend = () => { if (overlay) overlay.classList.remove('active'); };
  speechRecognition.start();
}

function handleVoiceCommand(cmd) {
  showToast(`Voice: "${cmd}"`, 'info');
  // Navigate to semesters
  for (let s = 1; s <= 6; s++) {
    if (cmd.includes(`semester ${s}`) || cmd.includes(`sem ${s}`)) {
      window.location.href = `semester.html?sem=${s}`; return;
    }
  }
  // Search
  if (cmd.includes('search')) {
    const q = cmd.replace('search', '').trim();
    const si = document.getElementById('heroSearch') || document.getElementById('navSearch');
    if (si) { si.value = q; si.dispatchEvent(new Event('input')); }
    return;
  }
  // Home
  if (cmd.includes('home') || cmd.includes('go back')) { window.location.href = 'index.html'; return; }
  // Dark mode
  if (cmd.includes('dark mode') || cmd.includes('dark theme')) { toggleDarkMode(); return; }
  // Light mode
  if (cmd.includes('light mode') || cmd.includes('light theme')) {
    document.documentElement.setAttribute('data-theme', 'light');
    store.set(K.DARK, 'light'); return;
  }
  showToast(`Command not recognized. Try "Open Semester 1" or "Search DBMS"`, 'warning');
}

// ===== COPY TO CLIPBOARD =====
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const orig = btn.textContent;
    btn.textContent = '✅ Copied!';
    setTimeout(() => { btn.textContent = orig; }, 1800);
    showToast('Copied to clipboard!', 'success');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    showToast('Copied!', 'success');
  });
}

// ===== EXPORT / IMPORT DATA =====
function exportUserData() {
  const data = {
    progress: store.get(K.PROGRESS, {}),
    bookmarks: store.get(K.BOOKMARKS, []),
    revisions: store.get(K.REVISIONS, []),
    highlights: store.get(K.HIGHLIGHTS, {}),
    userNotes: store.get(K.USER_NOTES, {}),
    heatmap: store.get(K.HEATMAP, {}),
    exportDate: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'bca-study-hub-data.json';
  a.click(); URL.revokeObjectURL(url);
  showToast('Data exported successfully!', 'success');
}

function importUserData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.progress) store.set(K.PROGRESS, data.progress);
      if (data.bookmarks) store.set(K.BOOKMARKS, data.bookmarks);
      if (data.revisions) store.set(K.REVISIONS, data.revisions);
      if (data.highlights) store.set(K.HIGHLIGHTS, data.highlights);
      if (data.userNotes) store.set(K.USER_NOTES, data.userNotes);
      if (data.heatmap) store.set(K.HEATMAP, data.heatmap);
      showToast('Data imported successfully!', 'success');
      setTimeout(() => location.reload(), 1000);
    } catch { showToast('Invalid data file', 'error'); }
  };
  reader.readAsText(file);
}

// ===== SUGGESTION MODAL =====
function initSuggestionModal() {
  const modal = document.getElementById('suggestionModal');
  const overlay = document.getElementById('suggestionOverlay');
  const form = document.getElementById('suggestionForm');
  if (!overlay) return;

  document.querySelectorAll('.open-suggestion-modal').forEach(btn => {
    btn.addEventListener('click', () => overlay.classList.add('open'));
  });
  document.querySelectorAll('.close-suggestion-modal').forEach(btn => {
    btn.addEventListener('click', () => overlay.classList.remove('open'));
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.classList.remove('open'); });

  form && form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sugName')?.value.trim() || '';
    const msg = document.getElementById('sugMessage')?.value.trim();
    if (!msg) { showToast('Please enter a message', 'error'); return; }
    addSuggestion(name, msg);
    form.reset();
    overlay.classList.remove('open');
    showToast('✅ Suggestion sent successfully!', 'success');
  });
}

// ===== SEARCH LOGIC =====
function buildSearchIndex() {
  const idx = [];
  Object.entries(SEMESTERS).forEach(([semNum, sem]) => {
    sem.subjects.forEach(sub => {
      idx.push({
        type: 'subject',
        code: sub.code,
        name: sub.name,
        sem: semNum,
        semName: sem.name,
        icon: sub.icon,
        url: `subject.html?sem=${semNum}&sub=${sub.code}`
      });
    });
    idx.push({ type: 'semester', name: sem.name, sem: semNum, icon: sem.icon, url: `semester.html?sem=${semNum}` });
  });
  return idx;
}

let searchIndex = null;

function doSearch(query) {
  if (!searchIndex) searchIndex = buildSearchIndex();
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return searchIndex.filter(item =>
    item.name.toLowerCase().includes(q) ||
    (item.code && item.code.toLowerCase().includes(q)) ||
    (item.semName && item.semName.toLowerCase().includes(q))
  ).slice(0, 8);
}

function renderSearchResults(results, container) {
  if (!container) return;
  if (!results.length) {
    container.innerHTML = `<div class="search-no-result">No results found</div>`;
    container.classList.add('active');
    return;
  }
  container.innerHTML = results.map(r => `
    <div class="search-result-item" data-url="${r.url}">
      <span class="search-result-icon">${r.icon || '��'}</span>
      <div class="search-result-text">
        <div class="search-result-title">${r.code ? r.code + ' — ' : ''}${r.name}</div>
        <div class="search-result-sub">${r.type === 'subject' ? r.semName : 'Semester'}</div>
      </div>
    </div>
  `).join('');
  container.classList.add('active');
  container.querySelectorAll('.search-result-item').forEach(el => {
    el.addEventListener('click', () => { window.location.href = el.dataset.url; });
  });
}

// ===== HIGHLIGHT KEYWORD =====
function highlightKeyword(text, keyword) {
  if (!keyword) return text;
  const re = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark class="kw-search-highlight" style="background:#fef08a;color:#1e293b;border-radius:2px;padding:0 1px;">$1</mark>');
}

// ===== QUICK DEFINITION POPUP =====
function initKeywordDefs(container) {
  if (!container) return;
  let popup = document.getElementById('kwDefPopup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'kwDefPopup'; popup.className = 'kw-def-popup';
    document.body.appendChild(popup);
  }
  container.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('kw-term')) {
      const term = target.dataset.term.toLowerCase();
      const def = KEYWORD_DEFS[term];
      if (!def) return;
      popup.innerHTML = `<div class="kw-def-title">${target.dataset.term}</div><div>${def}</div>`;
      popup.style.left = Math.min(e.clientX, window.innerWidth - 300) + 'px';
      popup.style.top = (e.clientY + 12) + 'px';
      popup.classList.add('show');
      e.stopPropagation();
    }
  });
  document.addEventListener('click', () => popup.classList.remove('show'));
}

function applyKeywordDefs(htmlText) {
  let result = htmlText;
  Object.keys(KEYWORD_DEFS).sort((a,b) => b.length - a.length).forEach(term => {
    const re = new RegExp(`\\b(${term})\\b`, 'gi');
    result = result.replace(re, `<span class="kw-term" data-term="${term}" style="border-bottom:1px dashed var(--primary);cursor:pointer;">$1</span>`);
  });
  return result;
}

// ===== CHALLENGE MODE =====
let challengeState = { questions: [], current: 0, score: 0, answered: false };

function startChallenge(questions) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  challengeState = { questions: shuffled, current: 0, score: 0, answered: false };
  renderChallenge();
}

function renderChallenge() {
  const wrap = document.getElementById('challengeWrap');
  if (!wrap) return;
  const { questions, current, score } = challengeState;
  if (current >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    const badge = pct >= 80 ? '🏆 Excellent!' : pct >= 60 ? '🥈 Good Job!' : '📚 Keep Studying!';
    const today = store.get(K.CHALLENGE, {});
    today[new Date().toDateString()] = { score, total: questions.length };
    store.set(K.CHALLENGE, today);
    wrap.innerHTML = `
      <div class="challenge-score">
        <div class="challenge-score-num">${score}/${questions.length}</div>
        <div style="font-size:1rem;color:var(--text-2);margin:8px 0;">Score: ${pct}%</div>
        <div class="challenge-badge">${badge}</div>
        <div style="margin-top:16px;">
          <button class="btn btn-primary" onclick="startChallenge(SAMPLE_QUESTIONS)">Try Again 🔄</button>
        </div>
      </div>`;
    return;
  }
  const q = questions[current];
  wrap.innerHTML = `
    <div class="challenge-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:0.8rem;color:var(--text-3);">Question ${current+1} of ${questions.length}</span>
        <span style="font-size:0.8rem;color:var(--text-3);">Score: ${score}</span>
      </div>
      <div class="challenge-question">${q.q}</div>
      <div style="font-size:0.82rem;color:var(--text-3);margin-bottom:10px;">Subject: ${q.subject} (Sem ${q.sem})</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn btn-accent" onclick="challengeAnswer(true)">✅ I Know This</button>
        <button class="btn btn-danger" onclick="challengeAnswer(false)">❌ Skip</button>
      </div>
    </div>`;
}

function challengeAnswer(knew) {
  if (knew) challengeState.score++;
  challengeState.current++;
  renderChallenge();
}

// ===== RANDOM QUESTION =====
function getRandomQuestion() {
  return SAMPLE_QUESTIONS[Math.floor(Math.random() * SAMPLE_QUESTIONS.length)];
}

// ===== URL PARAMS HELPER =====
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ===== ADMIN AUTH =====
function isAdminLoggedIn() { return store.get(K.ADMIN) === true; }
function adminLogin(email, pass) {
  if (verifyAdmin(email, pass)) { store.set(K.ADMIN, true); return true; }
  return false;
}
function adminLogout() { store.remove(K.ADMIN); window.location.href = 'admin.html'; }

// ===== INIT NAV SEARCH =====
function initNavSearch() {
  const input = document.getElementById('navSearch');
  const drop = document.getElementById('searchResultsDrop');
  if (!input || !drop) return;
  input.addEventListener('input', () => {
    const results = doSearch(input.value);
    if (!input.value.trim()) { drop.classList.remove('active'); return; }
    renderSearchResults(results, drop);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      const results = doSearch(input.value);
      if (results.length) window.location.href = results[0].url;
    }
    if (e.key === 'Escape') { drop.classList.remove('active'); input.blur(); }
  });
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !drop.contains(e.target)) drop.classList.remove('active');
  });
}

// ===== INIT HERO SEARCH =====
function initHeroSearch() {
  const input = document.getElementById('heroSearch');
  const drop = document.getElementById('heroSearchDrop');
  if (!input) return;
  input.addEventListener('input', () => {
    if (!drop) return;
    const results = doSearch(input.value);
    if (!input.value.trim()) { drop.classList.remove('active'); return; }
    renderSearchResults(results, drop);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const results = doSearch(input.value);
      if (results.length) window.location.href = results[0].url;
    }
  });
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const ham = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (!ham || !mobileNav) return;
  ham.addEventListener('click', () => {
    ham.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!ham.contains(e.target) && !mobileNav.contains(e.target)) {
      ham.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });
}

// ===== EXAM MODE =====
function enterExamMode(content) {
  let overlay = document.getElementById('examModeOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'examModeOverlay';
    overlay.className = 'exam-mode-overlay';
    document.body.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="exam-mode-header">
      <div class="exam-mode-title">🎯 Exam Mode</div>
      <button class="btn btn-secondary btn-sm" onclick="exitExamMode()">✕ Exit Exam Mode</button>
    </div>
    <div id="examModeContent">${content}</div>
  `;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function exitExamMode() {
  const overlay = document.getElementById('examModeOverlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// ===== PRINT MODE =====
function printNotes() {
  window.print();
}

// ===== IMAGE VIEWER =====
function initImageViewer(wrap) {
  if (!wrap) return;
  const img = wrap.querySelector('img');
  if (!img) return;
  let scale = 1;
  wrap.querySelectorAll('.img-viewer-btn[data-action="zoomin"]').forEach(b => {
    b.addEventListener('click', () => { scale = Math.min(scale + 0.25, 3); img.style.transform = `scale(${scale})`; });
  });
  wrap.querySelectorAll('.img-viewer-btn[data-action="zoomout"]').forEach(b => {
    b.addEventListener('click', () => { scale = Math.max(scale - 0.25, 0.5); img.style.transform = `scale(${scale})`; });
  });
  wrap.querySelectorAll('.img-viewer-btn[data-action="reset"]').forEach(b => {
    b.addEventListener('click', () => { scale = 1; img.style.transform = 'scale(1)'; });
  });
}

// ===== AUTO-INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavSearch();
  initHeroSearch();
  initHamburger();
  initSuggestionModal();

  // Dark mode toggle buttons
  document.querySelectorAll('.dark-toggle-btn').forEach(btn => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    btn.addEventListener('click', toggleDarkMode);
  });

  // Voice command button
  document.querySelectorAll('.voice-cmd-btn').forEach(btn => {
    btn.addEventListener('click', startVoiceCommand);
  });

  // Export button
  document.querySelectorAll('.export-data-btn').forEach(btn => {
    btn.addEventListener('click', exportUserData);
  });

  // Import button
  document.querySelectorAll('.import-data-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file'; input.accept = '.json';
      input.onchange = (e) => importUserData(e.target.files[0]);
      input.click();
    });
  });

  // Floating suggestion btn scroll hide on mobile
  const fab = document.querySelector('.fab-suggestion');
  if (fab) {
    window.addEventListener('scroll', () => {
      fab.style.opacity = window.scrollY > 200 ? '1' : '1';
    });
  }

  // Reveal animations on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.5s ease both';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.sem-card, .qa-card, .content-card').forEach(el => observer.observe(el));
});
