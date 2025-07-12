// Study Timer
let studyTime = 0;
let timerInterval;

function updateTimer() {
    const minutes = Math.floor(studyTime / 60);
    const seconds = studyTime % 60;
    document.getElementById('study-timer').textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    studyTime++;
}

// Start timer when page loads
timerInterval = setInterval(updateTimer, 1000);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('-translate-x-full');
    sidebarOverlay.classList.toggle('hidden');
});

sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
});

// User dropdown toggle
const userMenuBtn = document.getElementById('user-menu-btn');
const userDropdown = document.getElementById('user-dropdown');

userMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('hidden');
});

document.addEventListener('click', () => {
    userDropdown.classList.add('hidden');
});

// Navigation system
function showSection(targetId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.add('hidden');
    });

    // Show target section
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
    }

    // If we're showing the experiment detail, init Three.js
    if (targetId === 'experiment-detail') {
        initThreeJS();
    }

    // Update sidebar navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-gradient-to-r', 'from-violet-500', 'to-pink-500', 'text-white', 'shadow-lg');
        link.classList.add('text-gray-600', 'hover:bg-gray-100', 'hover:text-gray-800');
    });

    const activeLink = document.querySelector(`[href="#${targetId}"]`);
    if (activeLink) {
        activeLink.classList.remove('text-gray-600', 'hover:bg-gray-100', 'hover:text-gray-800');
        activeLink.classList.add('bg-gradient-to-r', 'from-violet-500', 'to-pink-500', 'text-white', 'shadow-lg');
    }

    // Update mobile navigation
    document.querySelectorAll('.nav-mobile').forEach(btn => {
        btn.classList.remove('text-violet-600');
        btn.classList.add('text-gray-500');
    });

    const activeMobileBtn = document.querySelector(`[data-target="${targetId}"]`);
    if (activeMobileBtn) {
        activeMobileBtn.classList.remove('text-gray-500');
        activeMobileBtn.classList.add('text-violet-600');
    }
}

// Sidebar navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        showSection(targetId);
    });
});

// Mobile navigation
document.querySelectorAll('.nav-mobile').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        showSection(targetId);
    });
});

// Chapter tabs
document.querySelectorAll('.chapter-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.chapter-tab').forEach(t => {
            t.classList.remove('bg-gradient-to-r', 'from-violet-500', 'to-pink-500', 'text-white');
            t.classList.add('bg-gray-100', 'text-gray-600');
        });
        tab.classList.remove('bg-gray-100', 'text-gray-600');
        tab.classList.add('bg-gradient-to-r', 'from-violet-500', 'to-pink-500', 'text-white');
    });
});

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        sidebar.classList.add('-translate-x-full');
        sidebarOverlay.classList.add('hidden');
        userDropdown.classList.add('hidden');
    }

    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('input[placeholder*="Tìm kiếm"]').focus();
    }

    // Quick navigation shortcuts
    if (e.altKey) {
        switch (e.key) {
            case '1':
                e.preventDefault();
                showSection('dashboard');
                break;
            case '2':
                e.preventDefault();
                showSection('lessons');
                break;
            case '3':
                e.preventDefault();
                showSection('experiments');
                break;
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Show dashboard by default
    showSection('dashboard');

    // Add loading states
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Animate progress bars
    setTimeout(() => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.style.animation = 'progressFill 2s ease-out forwards';
        });
    }, 500);
});

// Auto-save study progress
setInterval(() => {
    // This would normally save to a backend
    console.log('Auto-saving study progress...');
}, 30000); // Every 30 seconds

 // Global variables
        let isPlaying = false;
        let animationId;
        let startTime = Date.now();
        let currentQuestion = 0;
        let score = 0;
        let selectedAnswer = null;
        
        // Physics parameters
        let length = 1.0;
        let angle = 15;
        let mass = 1.0;
        let gravity = 9.8;
        let damping = 0.0;
        
        // Tab switching
        document.addEventListener('DOMContentLoaded', function() {
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabContents = document.querySelectorAll('.tab-content');
            
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    tabBtns.forEach(b => {
                        b.classList.remove('bg-gradient-to-r', 'from-violet-500', 'to-pink-500', 'text-white', 'shadow-lg');
                        b.classList.add('text-gray-600', 'hover:text-gray-800', 'hover:bg-gray-100');
                    });
                    btn.classList.add('bg-gradient-to-r', 'from-violet-500', 'to-pink-500', 'text-white', 'shadow-lg');
                    btn.classList.remove('text-gray-600', 'hover:text-gray-800', 'hover:bg-gray-100');
                    
                    tabContents.forEach(content => content.classList.remove('active'));
                    document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
                });
            });
            
            updatePendulumDisplay();
            setupSliders();
            showQuestion();
            
            document.getElementById('play-btn').addEventListener('click', toggleAnimation);
        });
        
        // Pendulum animation
        function animatePendulum() {
            if (!isPlaying) return;
            
            const time = (Date.now() - startTime) * 0.001;
            const period = 2 * Math.PI * Math.sqrt(length / gravity);
            const amplitude = angle * Math.exp(-damping * time);
            const currentAngle = amplitude * Math.cos(2 * Math.PI * time / period);
            
            const pendulumString = document.getElementById('pendulum-string');
            if (pendulumString) {
                pendulumString.style.transform = `rotate(${currentAngle}deg)`;
            }
            
            updatePhysicsDisplay(currentAngle, time);
            updateDataTable(time, currentAngle);
            
            animationId = requestAnimationFrame(animatePendulum);
        }
        
        function toggleAnimation() {
            isPlaying = !isPlaying;
            document.getElementById('play-btn').textContent = isPlaying ? 'Pause' : 'Play';
            if (isPlaying) {
                startTime = Date.now();
                animatePendulum();
            } else {
                cancelAnimationFrame(animationId);
            }
        }
        
        // Update physics display
        function updatePhysicsDisplay(currentAngle, time) {
            const period = 2 * Math.PI * Math.sqrt(length / gravity);
            const frequency = 1 / period;
            const velocity = angle * Math.sqrt(gravity / length) * Math.cos(2 * Math.PI * time / period) * Math.exp(-damping * time);
            
            document.getElementById('period-display').textContent = period.toFixed(2) + 's';
            document.getElementById('frequency-display').textContent = frequency.toFixed(2) + 'Hz';
            document.getElementById('angle-display').textContent = Math.abs(currentAngle).toFixed(1) + '°';
            document.getElementById('velocity-display').textContent = Math.abs(velocity).toFixed(1) + 'm/s';
            
            const potentialPercent = Math.pow(Math.sin(currentAngle * Math.PI / 180), 2) * 100;
            const kineticPercent = 100 - potentialPercent;
            
            document.getElementById('potential-energy').style.width = potentialPercent + '%';
            document.getElementById('kinetic-energy').style.width = kineticPercent + '%';
        }
        
        function updatePendulumDisplay() {
            const stringHeight = length * 100;
            document.getElementById('pendulum-string').style.height = stringHeight + 'px';
        }
        
        function updateDataTable(time, angle) {
            const tbody = document.getElementById('data-table');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="p-2">${time.toFixed(2)}</td>
                <td class="p-2">${angle.toFixed(1)}</td>
                <td class="p-2">${(angle * Math.sqrt(gravity / length) * Math.cos(time)).toFixed(1)}</td>
            `;
            tbody.insertBefore(row, tbody.firstChild);
            if (tbody.children.length > 10) tbody.removeChild(tbody.lastChild);
        }
        
        // Control sliders
        function setupSliders() {
            document.getElementById('length-slider').oninput = function() {
                length = parseFloat(this.value);
                document.getElementById('length-value').textContent = length.toFixed(1) + 'm';
                updatePendulumDisplay();
            };
            document.getElementById('angle-slider').oninput = function() {
                angle = parseInt(this.value);
                document.getElementById('angle-value').textContent = angle + '°';
            };
            document.getElementById('mass-slider').oninput = function() {
                mass = parseFloat(this.value);
                document.getElementById('mass-value').textContent = mass.toFixed(1) + 'kg';
            };
            document.getElementById('gravity-slider').oninput = function() {
                gravity = parseFloat(this.value);
                document.getElementById('gravity-value').textContent = gravity.toFixed(1) + 'm/s²';
            };
            document.getElementById('damping-slider').oninput = function() {
                damping = parseFloat(this.value);
                document.getElementById('damping-value').textContent = damping.toFixed(2);
            };
        }
        
        // Quiz functionality
        const quizQuestions = [
            { question: "Chu kỳ dao động của con lắc đơn phụ thuộc vào yếu tố nào?", options: ["Khối lượng vật nặng", "Chiều dài dây treo", "Biên độ dao động", "Màu sắc vật nặng"], correct: 1 },
            { question: "Công thức tính chu kỳ của con lắc đơn là gì?", options: ["T = 2π√(m/g)", "T = 2π√(L/g)", "T = 2π√(g/L)", "T = 2π√(m/L)"], correct: 1 },
            { question: "Gia tốc trọng trường ảnh hưởng thế nào đến chu kỳ?", options: ["Tăng g, T tăng", "Tăng g, T giảm", "Không ảnh hưởng", "Tăng g, T không đổi"], correct: 1 },
            { question: "Khối lượng vật nặng có ảnh hưởng đến chu kỳ không?", options: ["Có", "Không", "Tùy trường hợp", "Chỉ khi lớn"], correct: 1 },
            { question: "Ứng dụng nào sau đây sử dụng con lắc đơn?", options: ["Đồng hồ", "Máy giặt", "Động cơ xe", "Quạt điện"], correct: 0 },
            { question: "Nếu L tăng 4 lần, chu kỳ T thay đổi thế nào?", options: ["Tăng 2 lần", "Tăng 4 lần", "Giảm 2 lần", "Không đổi"], correct: 0 },
            { question: "Năng lượng nào lớn nhất khi con lắc ở điểm thấp nhất?", options: ["Thế năng", "Động năng", "Nhiệt năng", "Hóa năng"], correct: 1 },
            { question: "Chu kỳ T có đơn vị gì?", options: ["m/s", "s", "Hz", "kg"], correct: 1 },
            { question: "Damping ảnh hưởng thế nào đến dao động?", options: ["Tăng biên độ", "Giảm biên độ", "Tăng chu kỳ", "Không ảnh hưởng"], correct: 1 },
            { question: "Con lắc đơn dao động điều hòa khi nào?", options: ["Góc nhỏ", "Góc lớn", "Mọi góc", "Không bao giờ"], correct: 0 }
        ];
        
        function showQuestion() {
            const question = quizQuestions[currentQuestion];
            document.getElementById('question-text').textContent = question.question;
            const options = document.querySelectorAll('.option');
            options.forEach((option, index) => {
                option.textContent = String.fromCharCode(65 + index) + '. ' + question.options[index];
                option.classList.remove('selected', 'correct', 'incorrect');
            });
            document.getElementById('progress-ring').setAttribute('stroke-dasharray', `${(currentQuestion + 1) * 28.3} 283`);
            selectedAnswer = null;
        }
        
        function selectAnswer(index) {
            const options = document.querySelectorAll('.option');
            options.forEach(option => option.classList.remove('selected'));
            options[index].classList.add('selected');
            selectedAnswer = index;
        }
        
        function submitAnswer() {
            if (selectedAnswer === null) return;
            const question = quizQuestions[currentQuestion];
            const options = document.querySelectorAll('.option');
            options[selectedAnswer].classList.add(selectedAnswer === question.correct ? 'correct' : 'incorrect');
            if (selectedAnswer === question.correct) score++;
            document.getElementById('score-display').textContent = score;
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < quizQuestions.length) {
                    showQuestion();
                } else {
                    document.getElementById('quiz-content').innerHTML = '<p class="text-xl font-bold">Quiz completed! Score: ' + score + '/10</p>';
                }
            }, 1000);
        }
            