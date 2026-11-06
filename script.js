// เก็บคำแปลภาษาอังกฤษ โดยใช้ข้อความภาษาไทยเดิมจากหน้าเว็บ
const translations = {
  '.hero h1 span': 'Somsak Fongphitak',
  '.profile-top h2': 'Somsak Fongphitak',
  '.nav-link[href="#home"]': 'Home',
  '.nav-link[href="#about"]': 'About',
  '.nav-link[href="#skills"]': 'Skills',
  '.nav-link[href="#projects"]': 'Projects',
  '.nav-link[href="#contact"]': 'Contact',
  '.hero-description': 'An Intelligent Information Technology student interested in backend development, API testing, and information systems, eager to learn through practical experience.',
  '.btn-primary-custom': 'View projects',
  '.btn-outline-custom': 'Contact me',
  '.profile-status': 'Seeking a cooperative education opportunity',
  '.profile-info:nth-of-type(3) span': 'Education',
  '.profile-info:nth-of-type(3) p': 'Walailak University · Intelligent Information Technology',
  '.profile-info:nth-of-type(4) span': 'Interests',
  '#about h2': 'About me',
  '#about .section-space > p:nth-of-type(2)': 'I am a third-year Intelligent Information Technology student at Walailak University, interested in backend development, database management, and software testing.',
  '#about .section-space > p:nth-of-type(3)': 'Through coursework and projects, I have practised developing APIs, processing document data, and testing systems. I am seeking a cooperative education opportunity to learn from real-world work, develop my skills, and support the team.',
  '.education-highlight:nth-child(1) span': 'Cumulative GPA',
  '.education-highlight:nth-child(2) span': 'Major',
  '.education-highlight:nth-child(2) strong': 'Intelligent Information Technology',
  '.education-highlight:nth-child(3) span': 'Expected graduation',
  '.education-highlight:nth-child(3) strong': 'October 2027',
  '#skills h2': 'Skills and tools',
  '.section-intro': 'Technologies used in coursework and projects.',
  '#projects h2': 'Selected projects',
  '#contact h2': 'Contact me',
  '#contact .section-space > p:nth-of-type(2)': 'I would be happy to discuss cooperative education opportunities and learning in technology.',
  '.contact-location': 'Nakhon Si Thammarat'
};

const projectTranslations = [
  ['01 / GROUP PROJECT · IMPORT MODULE', 'A document import system that validates PDF and DOCX files, extracts text and tables, and stores data for further use.', 'Responsible for the Import module and Preview interface for reviewing and editing data before confirmation, as well as text chunking and storing vector embeddings.'],
  ['02 / IN DEVELOPMENT', 'A flexible workflow and document status tracking system.', 'Create workflows and manage tasks, update statuses, record timelines, and generate reference numbers, with REST API, Swagger, and automated testing.'],
  ['03 / INDIVIDUAL MINI PROJECT', 'An order management system supporting multiple items and total calculations.', 'Manage orders using CRUD, validate input, and organize the application into Controller, Service, Repository, and Model layers.'],
  ['04 / INDIVIDUAL WORK · SOFTWARE TESTING', 'Software testing case studies to practise checking system correctness.', 'Created unit and system tests and documented expected versus actual results.']
];

const translatedElements = [];
function addTranslation(element, english) {
  if (element) translatedElements.push({ element, thai: element.innerHTML, english });
}
Object.entries(translations).forEach(([selector, english]) => addTranslation(document.querySelector(selector), english));
document.querySelectorAll('.skill-card p').forEach((element, index) => {
  if (index === 0) addTranslation(element, 'Python, Java, FastAPI, Spring Boot, REST API, HTML, CSS and JavaScript');
  if (index === 1) addTranslation(element, 'MongoDB, SQLite, PostgreSQL, SQLAlchemy and ChromaDB');
  if (index === 2) addTranslation(element, 'pytest, unittest, Swagger, Git, Docker and Docker Compose');
});
document.querySelectorAll('.project-card').forEach((card, index) => {
  const words = projectTranslations[index];
  if (!words) return;
  addTranslation(card.querySelector('small'), words[0]);
  addTranslation(card.querySelector(':scope > p'), words[1]);
  addTranslation(card.querySelector('summary'), 'View details');
  addTranslation(card.querySelector('details p'), words[2]);
});
addTranslation(document.querySelector('.project-demo-link'), 'Try demo');
addTranslation(document.querySelector('.project-code-link'), 'View code');

function setLanguage(language) {
  document.documentElement.lang = language;
  translatedElements.forEach(({ element, thai, english }) => {
    if (language === 'en') element.textContent = english;
    else element.innerHTML = thai;
  });
  document.querySelectorAll('[data-language]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  document.querySelector('.navbar').setAttribute('aria-label', language === 'th' ? 'เมนูหลัก' : 'Main navigation');
  document.querySelector('.navbar-toggler').setAttribute('aria-label', language === 'th' ? 'เปิดเมนู' : 'Toggle menu');
  document.querySelector('.profile-card').setAttribute('aria-label', language === 'th' ? 'ข้อมูลผู้สมัคร' : 'Applicant information');
  document.querySelector('.education-highlights').setAttribute('aria-label', language === 'th' ? 'ข้อมูลการศึกษา' : 'Education information');
  document.querySelector('.portrait').alt = language === 'th' ? 'ภาพถ่ายของสมศักดิ์ ฟองพิทักษ์' : 'Portrait of Somsak Fongphitak';
  updateDetailsLabels();
  try { localStorage.setItem('portfolio-language', language); } catch (error) { /* ใช้ภาษาได้แม้เบราว์เซอร์ไม่เก็บค่า */ }
}
// ปรับข้อความบนปุ่มให้ตรงกับสถานะเปิดหรือปิด
function updateDetailsLabels() {
  document.querySelectorAll('.project-card details').forEach(details => {
    const english = document.documentElement.lang === 'en';
    details.querySelector('summary').textContent = details.open
      ? (english ? 'Hide details' : 'ซ่อนรายละเอียด')
      : (english ? 'View details' : 'ดูรายละเอียด');
  });
}
document.querySelectorAll('.project-card details').forEach(details => {
  details.addEventListener('toggle', updateDetailsLabels);
});
document.querySelectorAll('[data-language]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});
// เมื่อเลือกเมนูบนมือถือ ให้ปิดเมนูก่อนเลื่อนไปยังหัวข้อ
document.querySelectorAll('#navigation .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navigation');
    if (menu.classList.contains('show') && window.bootstrap) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});
try {
  if (localStorage.getItem('portfolio-language') === 'en') setLanguage('en');
} catch (error) { /* เริ่มต้นด้วยภาษาไทย */ }
