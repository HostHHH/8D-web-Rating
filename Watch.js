class ClassRatingSystem {
    constructor(students) {
        this.students = students;
    }

    calculateTotalScore({ scores, remarksList }) {
        return (scores.socialEvents || 0) + 
               (scores.duty || 0) + 
               (scores.events || 0) - 
               remarksList.length;
    }

    getSortedByAspect(aspect) {
        const processedStudents = this.students.map(student => {
            const scoreValue = aspect === 'total' ? this.calculateTotalScore(student) 
                             : aspect === 'remarks' ? student.remarksList.length 
                             : student.scores[aspect] || 0;
            
            return {
                ...student,
                scoreValue,
                scores: { ...student.scores },
                remarksList: [...student.remarksList]
            };
        });

        return processedStudents.sort((a, b) => b.scoreValue - a.scoreValue);
    }

    getStudent(id) {
        return this.students.find(s => s.id === id);
    }

    getAllStudents() {
        return this.students;
    }

    analyzeTraits({ scores, remarksList, name }) {
        const aspects = [
            { id: 'socialEvents', name: 'Соціальні івенти', value: scores.socialEvents || 0, type: 'positive' },
            { id: 'duty', name: 'Чергування', value: scores.duty || 0, type: 'positive' },
            { id: 'events', name: 'Події', value: scores.events || 0, type: 'positive' },
            { id: 'remarks', name: 'Зауваження', value: remarksList.length, type: 'negative' }
        ];

        let best = aspects[0];
        aspects.forEach(a => { 
            if (a.type === 'positive' && a.value > best.value) best = a; 
        });

        let worst = aspects[0];
        let worstSeverity = -1;

        aspects.forEach(a => {
            const severity = a.type === 'positive' ? 100 - a.value : a.value * 1.5;
            if (severity > worstSeverity) {
                worstSeverity = severity;
                worst = a;
            }
        });

        return { 
            best: best.value > 0 ? best.name : 'Не виявлено', 
            worst: worst.name 
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

    const ratingSystem = new ClassRatingSystem(studentsData);

    const selectAspectElement = document.getElementById('aspect-select');
    const tbodyElement = document.getElementById('rating-tbody');
    const scoreColumnHeader = document.getElementById('score-column-header');

    if (selectAspectElement && tbodyElement && scoreColumnHeader) {
        const categoryNames = {
            total: 'Загальний бал',
            socialEvents: 'Бали (Соціальні івенти)',
            duty: 'Бали (Чергування)',
            events: 'Бали (Події)',
            remarks: 'Кількість (Зауваження)'
        };

        const renderTable = (aspect) => {
            const sortedData = ratingSystem.getSortedByAspect(aspect);
            const fragment = document.createDocumentFragment();
            
            scoreColumnHeader.textContent = categoryNames[aspect];

            sortedData.forEach((student, index) => {
                const tr = document.createElement('tr');
                const rank = index + 1;
                
                if (rank <= 3) tr.classList.add(`rank-${rank}`);

                tr.innerHTML = `
                    <td>${rank}</td>
                    <td>${student.name}</td>
                    <td>${student.scoreValue}</td>
                `;

                fragment.appendChild(tr);
            });

            tbodyElement.innerHTML = '';
            tbodyElement.appendChild(fragment);
        };

        renderTable('total');

        selectAspectElement.addEventListener('change', ({ target }) => {
            renderTable(target.value);
        });
    }

    const studentSelect = document.getElementById('student-profile-select');
    const profileContainer = document.getElementById('profile-container');

    if (studentSelect && profileContainer) {
        const elements = {
            name: document.getElementById('profile-name'),
            social: document.getElementById('stat-social'),
            duty: document.getElementById('stat-duty'),
            events: document.getElementById('stat-events'),
            remarks: document.getElementById('stat-remarks'),
            total: document.getElementById('stat-total'),
            best: document.getElementById('trait-best'),
            worst: document.getElementById('trait-worst'),
            remarksList: document.getElementById('profile-remarks-list')
        };

        const fragment = document.createDocumentFragment();
        ratingSystem.getAllStudents().forEach(({ id, name }) => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = name;
            fragment.appendChild(option);
        });
        studentSelect.appendChild(fragment);

        studentSelect.addEventListener('change', ({ target }) => {
            const id = parseInt(target.value);
            
            if (!id) {
                profileContainer.style.display = 'none';
                return;
            }

            const student = ratingSystem.getStudent(id);
            
            if (student) {
                profileContainer.style.display = 'block';
                
                elements.name.textContent = student.name;
                elements.social.textContent = student.scores.socialEvents || 0;
                elements.duty.textContent = student.scores.duty || 0;
                elements.events.textContent = student.scores.events || 0;
                elements.remarks.textContent = student.remarksList.length;
                elements.total.textContent = ratingSystem.calculateTotalScore(student);

                const traits = ratingSystem.analyzeTraits(student);
                elements.best.textContent = traits.best;
                elements.worst.textContent = traits.worst;

                elements.remarksList.innerHTML = '';
                if (student.remarksList.length === 0) {
                    elements.remarksList.innerHTML = '<li class="empty">Учня немає за що сварити, зауваження відсутні!</li>';
                } else {
                    const remarksFragment = document.createDocumentFragment();
                    student.remarksList.forEach(remark => {
                        const li = document.createElement('li');
                        li.textContent = remark;
                        remarksFragment.appendChild(li);
                    });
                    elements.remarksList.appendChild(remarksFragment);
                }
            }
        });
    }

    const scheduleTbody = document.getElementById('schedule-tbody');
    const weekLabel = document.getElementById('current-week-label');
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');

    if (scheduleTbody && weekLabel && prevWeekBtn && nextWeekBtn) {
        let weeks = [];
        let currentWeekIndex = 0;

        const processScheduleData = (data) => {
            const processedWeeks = [];
            let currentWeek = [];
            
            data.forEach((item, index) => {
                const dateObj = new Date(item.date);
                currentWeek.push({ date: dateObj, pair: item.pair });
                
                if (dateObj.getDay() === 5 || index === data.length - 1) {
                    processedWeeks.push(currentWeek);
                    currentWeek = [];
                }
            });
            return processedWeeks;
        };

        const renderSchedule = (weekIndex) => {
            scheduleTbody.innerHTML = '';
            const weekData = weeks[weekIndex];
            
            if (!weekData || weekData.length === 0) return;

            const firstDay = weekData[0].date;
            const lastDay = weekData[weekData.length - 1].date;
            const options = { day: 'numeric', month: 'long' };
            weekLabel.textContent = `${firstDay.toLocaleDateString('uk-UA', options)} - ${lastDay.toLocaleDateString('uk-UA', options)}`;

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const fragment = document.createDocumentFragment();

            weekData.forEach(item => {
                const tr = document.createElement('tr');
                
                const itemDate = new Date(item.date);
                itemDate.setHours(0, 0, 0, 0);

                if (itemDate.getTime() === today.getTime()) {
                    tr.classList.add('today-row');
                }

                const dayName = item.date.toLocaleDateString('uk-UA', { weekday: 'long' });
                const capitalizedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1);
                
                let statusClass = 'upcoming';
                let statusText = 'Заплановано';

                if (itemDate.getTime() < today.getTime()) {
                    statusClass = 'completed';
                    statusText = 'Завершено';
                } else if (itemDate.getTime() === today.getTime()) {
                    statusClass = 'active';
                    statusText = 'Сьогодні';
                }

                tr.innerHTML = `
                    <td>${item.date.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                    <td>${capitalizedDay}</td>
                    <td>${item.pair[0]}</td>
                    <td>${item.pair[1]}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                `;

                fragment.appendChild(tr);
            });

            scheduleTbody.appendChild(fragment);

            prevWeekBtn.disabled = weekIndex === 0;
            nextWeekBtn.disabled = weekIndex === weeks.length - 1;
        };

        const fetchSchedule = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/schedule');
                if (response.ok) {
                    const data = await response.json();
                    weeks = processScheduleData(data);
                    if (weeks.length > 0) {
                        renderSchedule(currentWeekIndex);
                    }
                } else {
                    scheduleTbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#e11d48;">Помилка: не вдалося завантажити дані з сервера</td></tr>';
                }
            } catch (error) {
                scheduleTbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:#e11d48;">Немає з\'єднання з сервером. Переконайтеся, що Python бекенд запущено.</td></tr>';
            }
        };

        fetchSchedule();

        prevWeekBtn.addEventListener('click', () => {
            if (currentWeekIndex > 0) {
                currentWeekIndex--;
                renderSchedule(currentWeekIndex);
            }
        });

        nextWeekBtn.addEventListener('click', () => {
            if (currentWeekIndex < weeks.length - 1) {
                currentWeekIndex++;
                renderSchedule(currentWeekIndex);
            }
        });
    }
});
