// ==================== Data ====================
const courses = [
    {
        id: 1,
        title: { ar: 'التسويق الرقمي الشامل', en: 'Complete Digital Marketing' },
        description: { 
            ar: 'تعلم استراتيجيات التسويق الرقمي، SEO، إعلانات فيسبوك وجوجل، وتحليل البيانات', 
            en: 'Learn digital marketing strategies, SEO, Facebook & Google ads, and data analytics' 
        },
        category: 'Digital Marketing',
        type: 'paid',
        originalPrice: 2500,
        duration: '40 ساعة',
        lessons: 85,
        students: 3200,
        gradient: 'bg-marketing',
        icon: 'fa-bullhorn'
    },
    {
        id: 2,
        title: { ar: 'صناعة المحتوى الرقمي', en: 'Digital Content Creation' },
        description: { 
            ar: 'أنشئ محتوى احترافي ليوتيوب، تيك توك، ومنصات التواصل الاجتماعي', 
            en: 'Create professional content for YouTube, TikTok, and social media platforms' 
        },
        category: 'Digital Creator',
        type: 'paid',
        originalPrice: 1800,
        duration: '30 ساعة',
        lessons: 60,
        students: 2100,
        gradient: 'bg-creator',
        icon: 'fa-video'
    },
    {
        id: 3,
        title: { ar: 'تطوير الألعاب بـ Unity', en: 'Game Development with Unity' },
        description: { 
            ar: 'ابنِ ألعاب ثنائية وثلاثية الأبعاد احترافية باستخدام Unity و C#', 
            en: 'Build professional 2D & 3D games using Unity and C#' 
        },
        category: 'Game Development',
        type: 'paid',
        originalPrice: 3500,
        duration: '60 ساعة',
        lessons: 120,
        students: 4500,
        gradient: 'bg-gamedev',
        icon: 'fa-gamepad'
    },
    {
        id: 4,
        title: { ar: 'أساسيات الرسوم المتحركة', en: 'Animation Fundamentals' },
        description: { 
            ar: 'تعلم مبادئ الحركة، التحريك الشخصيات، والمؤثرات البصرية', 
            en: 'Learn motion principles, character animation, and visual effects' 
        },
        category: 'Animation',
        type: 'free',
        originalPrice: 0,
        duration: '15 ساعة',
        lessons: 35,
        students: 5600,
        gradient: 'bg-animation',
        icon: 'fa-film'
    },
    {
        id: 5,
        title: { ar: 'تصميم الألعاب', en: 'Game Design' },
        description: { 
            ar: 'صمم ميكانيكيات اللعب، القصص التفاعلية، وتجربة المستخدم للألعاب', 
            en: 'Design game mechanics, interactive stories, and user experience for games' 
        },
        category: 'Game Design',
        type: 'paid',
        originalPrice: 2200,
        duration: '35 ساعة',
        lessons: 70,
        students: 1800,
        gradient: 'bg-gamedesign',
        icon: 'fa-puzzle-piece'
    },
    {
        id: 6,
        title: { ar: 'مقدمة في التسويق الرقمي', en: 'Intro to Digital Marketing' },
        description: { 
            ar: 'كورس مجاني يغطي أساسيات التسويق الرقمي واستراتيجيات النمو', 
            en: 'Free course covering digital marketing basics and growth strategies' 
        },
        category: 'Digital Marketing',
        type: 'free',
        originalPrice: 0,
        duration: '10 ساعات',
        lessons: 25,
        students: 8900,
        gradient: 'bg-free',
        icon: 'fa-chart-line'
    }
];

// ==================== State ====================
let currentLang = 'ar';
let currentUser = null;

// ==================== DOM Elements ====================
const loginScreen = document.getElementById('login-screen');
const mainApp = document.getElementById('main-app');
const loginForm = document.getElementById('login-form');
const coursesGrid = document.getElementById('courses-grid');
const currentLangEl = document.getElementById('current-lang');
const userNameEl = document.getElementById('user-name');

// ==================== Initialization ====================
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in (simulated)
    const savedUser = localStorage.getItem('edtech_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
    }
    
    renderCourses('all');
    updateLanguage();
});

// ==================== Login Functions ====================
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0]
        };
        localStorage.setItem('edtech_user', JSON.stringify(currentUser));
        showMainApp();
    }
});

function showMainApp() {
    loginScreen.style.display = 'none';
    mainApp.classList.remove('hidden');
    userNameEl.textContent = currentUser.name;
    
    // Animate entrance
    mainApp.style.opacity = '0';
    setTimeout(() => {
        mainApp.style.transition = 'opacity 0.5s ease';
        mainApp.style.opacity = '1';
    }, 100);
}

function logout() {
    localStorage.removeItem('edtech_user');
    currentUser = null;
    location.reload();
}

function togglePassword() {
    const input = document.getElementById('login-password');
    const icon = document.querySelector('.toggle-password');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ==================== Course Functions ====================
function calculateDiscountedPrice(originalPrice) {
    if (originalPrice === 0) return 0;
    return Math.round(originalPrice * 0.6); // 40% discount
}

function renderCourses(filter) {
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(c => c.type === filter);
    
    coursesGrid.innerHTML = filteredCourses.map(course => {
        const discountedPrice = calculateDiscountedPrice(course.originalPrice);
        const isFree = course.type === 'free';
        
        return `
            <div class="course-card" data-category="${course.type}">
                <div class="course-image ${course.gradient}">
                    <i class="fas ${course.icon}"></i>
                    <span class="course-badge ${isFree ? 'badge-free' : 'badge-paid'}">
                        ${isFree ? (currentLang === 'ar' ? 'مجاني' : 'FREE') : (currentLang === 'ar' ? 'مدفوع' : 'PAID')}
                    </span>
                </div>
                <div class="course-content">
                    <span class="course-category">${course.category}</span>
                    <h3 class="course-title">${course.title[currentLang]}</h3>
                    <p class="course-description">${course.description[currentLang]}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-book"></i> ${course.lessons} ${currentLang === 'ar' ? 'درس' : 'lessons'}</span>
                        <span><i class="fas fa-users"></i> ${formatNumber(course.students)}</span>
                    </div>
                    <div class="course-footer">
                        <div class="course-price">
                            ${isFree 
                                ? `<span class="price-current" style="color: var(--success);">${currentLang === 'ar' ? 'مجاناً' : 'Free'}</span>`
                                : `
                                    <span class="price-original">${course.originalPrice} EGP</span>
                                    <span class="price-current">${discountedPrice} <span>EGP</span></span>
                                `
                            }
                        </div>
                        <button class="btn-enroll" onclick="enrollCourse(${course.id})">
                            ${isFree 
                                ? (currentLang === 'ar' ? 'ابدأ الآن' : 'Start Now') 
                                : (currentLang === 'ar' ? 'اشترك الآن' : 'Enroll Now')
                            }
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num;
}

function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    const price = calculateDiscountedPrice(course.originalPrice);
    
    if (course.type === 'free') {
        alert(currentLang === 'ar' 
            ? `🎉 تم تسجيلك في كورس "${course.title.ar}" بنجاح!`
            : `🎉 You have successfully enrolled in "${course.title.en}"!`
        );
    } else {
        alert(currentLang === 'ar'
            ? `💳 سيتم تحويلك لصفحة الدفع...\nالكورس: ${course.title.ar}\nالسعر بعد الخصم: ${price} جنيه`
            : `💳 Redirecting to payment...\nCourse: ${course.title.en}\nDiscounted Price: ${price} EGP`
        );
    }
}

// ==================== Filter Functions ====================
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCourses(btn.dataset.filter);
    });
});

// ==================== Language Functions ====================
function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    updateLanguage();
    renderCourses(document.querySelector('.filter-btn.active').dataset.filter);
}

function updateLanguage() {
    currentLangEl.textContent = currentLang === 'ar' ? 'EN' : 'AR';
    
    // Update all elements with data-ar and data-en attributes
    document.querySelectorAll('[data-ar][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${currentLang}`);
    });
    
    // Update placeholders
    const emailInput = document.getElementById('login-email');
    const passInput = document.getElementById('login-password');
    
    if (currentLang === 'en') {
        emailInput.placeholder = 'example@email.com';
        passInput.placeholder = '••••••••';
    } else {
        emailInput.placeholder = 'example@email.com';
        passInput.placeholder = '••••••••';
    }
}

// ==================== Mobile Menu ====================
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== Navbar Scroll Effect ====================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ==================== Contact Form ====================
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(currentLang === 'ar' 
        ? '✅ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.'
        : '✅ Your message has been sent successfully! We will contact you soon.'
    );
    e.target.reset();
});
