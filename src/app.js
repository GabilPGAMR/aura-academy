document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Login Form Validation (index.html)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let hasError = false;

            if (!email.value || !email.value.includes('@')) {
                email.classList.add('is-invalid');
                hasError = true;
            } else {
                email.classList.remove('is-invalid');
            }

            if (!password.value || password.value.length < 6) {
                password.classList.add('is-invalid');
                hasError = true;
            } else {
                password.classList.remove('is-invalid');
            }

            if (!hasError) {
                const btn = loginForm.querySelector('.btn');
                btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Autenticando...';
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1200);
            }
        });

        // Remove error state on input
        const inputs = loginForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
            });
        });
    }

    // 2. Course Filters (cursos.html)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-filter-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                courseCards.forEach(card => {
                    if (filterValue === 'todos' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'flex';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('fade-in');
                    }
                });
            });
        });
    }

    // 3. New Course Validation (novo-curso.html)
    const courseForm = document.getElementById('course-form');
    if (courseForm) {
        courseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('course-title');
            if (!title.value) {
                title.classList.add('is-invalid');
                return;
            }

            const btn = courseForm.querySelector('.btn');
            btn.innerHTML = '<i class="ph ph-check"></i> Curso Criado com Sucesso!';
            btn.classList.add('btn-success');
            
            setTimeout(() => {
                window.location.href = 'cursos.html';
            }, 1200);
        });

        const inputs = courseForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.remove('is-invalid');
            });
        });
    }

    // 4. Profile Save (perfil.html)
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = profileForm.querySelector('.btn');
            btn.innerHTML = '<i class="ph ph-check"></i> Salvo com sucesso!';
            btn.classList.add('btn-success');
            setTimeout(() => {
                btn.innerHTML = '<i class="ph ph-floppy-disk"></i> Salvar Alterações';
                btn.classList.remove('btn-success');
            }, 2000);
        });
    }

    // 5. Enrollment System
    const enrollBtn = document.getElementById('enroll-btn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            enrollBtn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Processando...';
            setTimeout(() => {
                window.location.href = 'confirmacao.html';
            }, 800);
        });
    }
});
