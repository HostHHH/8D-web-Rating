const studentsData = [
    { id: 1, name: "Бірюков Денис", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 2, name: "Бойко Максим", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 3, name: "Бровчук Роман", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 4, name: "Верановський Ян", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 5, name: "Верба Соломія", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 6, name: "Гринчук Богдана", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 7, name: "Дмитрук Тарас", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 8, name: "Дорофєєв Назарій", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 9, name: "Дяков Дмитро", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 10, name: "Збирит Маргарита", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 11, name: "Коваль Марія", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 12, name: "Кривчук Андрій", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 13, name: "Крівцова Софія", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 14, name: "Кушнір Олексій", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 15, name: "Левчук Матвій", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 16, name: "Максимчук Марта", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 17, name: "Мартинюк Денис", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 18, name: "Мацевич Орест", scores: { socialEvents: 10099, duty: 100, events: 100 }, remarksList: ["Лінивий чорт"] },
    { id: 19, name: "Мисюра Дмитро", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 20, name: "Михайлов Олександр", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 21, name: "Нечипорук Соломія", scores: { socialEvents: 100, duty: 10099, events: 100 }, remarksList: [] },
    { id: 22, name: "Нікітський Роман", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 23, name: "Опанасюк Віктор", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 24, name: "Паламарчук Максим", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 25, name: "Пальчевська Софія", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 26, name: "Петрушина Софія", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 27, name: "Пилат Владислав", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 28, name: "Рищук Емілія", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 29, name: "Родзін Андрій", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 30, name: "Савчук Евеліна", scores: { socialEvents: 100, duty: 100, events: 10099 }, remarksList: [] },
    { id: 31, name: "Сафонов Улас", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 32, name: "Слопачук Костянтин", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 33, name: "Статнік Микола", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 34, name: "Стихун Артем", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 35, name: "Трачук Матвій", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 36, name: "Шевчук Юстинія ", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 37, name: "Вдовиченко Назарій", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 38, name: "Софія Шліхта", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] },
    { id: 39, name: "Українець Дмитро", scores: { socialEvents: 100, duty: 100, events: 100 }, remarksList: [] }
];

class ClassRatingSystem {
    constructor(students) {
        this.students = students;
    }

    calculateTotalScore(student) {
        const scores = student.scores;
        const remarksCount = student.remarksList.length;
        
        return (scores.socialEvents || 0) + 
               (scores.duty || 0) + 
               (scores.events || 0) - 
               remarksCount;
    }

    getSortedByAspect(aspect) {
        const processedStudents = this.students.map(student => {
            let scoreValue;
            if (aspect === 'total') {
                scoreValue = this.calculateTotalScore(student);
            } else if (aspect === 'remarks') {
                scoreValue = student.remarksList.length;
            } else {
                scoreValue = student.scores[aspect] || 0;
            }
            return {
                id: student.id,
                name: student.name,
                scoreValue: scoreValue,
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

    analyzeTraits(student) {
        const s = student.scores;
        const rCount = student.remarksList.length;

        const aspects = [
            { id: 'socialEvents', name: 'Соціальні івенти', value: s.socialEvents || 0, type: 'positive' },
            { id: 'duty', name: 'Чергування', value: s.duty || 0, type: 'positive' },
            { id: 'events', name: 'Події', value: s.events || 0, type: 'positive' },
            { id: 'remarks', name: 'Зауваження', value: rCount, type: 'negative' }
        ];

        let best = aspects[0];
        aspects.forEach(a => {
            if (a.type === 'positive' && a.value > best.value) {
                best = a;
            }
        });

        let worst = aspects[0];
        let worstSeverity = -1;

        aspects.forEach(a => {
            let severity = 0;
            
            if (a.type === 'positive') {
                severity = 100 - a.value;
            } else if (a.type === 'negative') {
                severity = a.value * 1.5;
            }

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
    const ratingSystem = new ClassRatingSystem(studentsData);
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }

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
            
            tbodyElement.innerHTML = '';
            scoreColumnHeader.textContent = categoryNames[aspect];

            sortedData.forEach((student, index) => {
                const tr = document.createElement('tr');
                const rank = index + 1;
                
                if (rank <= 3) {
                    tr.classList.add(`rank-${rank}`);
                }

                const tdRank = document.createElement('td');
                tdRank.textContent = rank;

                const tdName = document.createElement('td');
                tdName.textContent = student.name;

                const tdScore = document.createElement('td');
                tdScore.textContent = student.scoreValue;

                tr.appendChild(tdRank);
                tr.appendChild(tdName);
                tr.appendChild(tdScore);

                tbodyElement.appendChild(tr);
            });
        };

        renderTable('total');

        selectAspectElement.addEventListener('change', (e) => {
            renderTable(e.target.value);
        });
    }

    const studentSelect = document.getElementById('student-profile-select');
    const profileContainer = document.getElementById('profile-container');
    const profileName = document.getElementById('profile-name');
    const statSocial = document.getElementById('stat-social');
    const statDuty = document.getElementById('stat-duty');
    const statEvents = document.getElementById('stat-events');
    const statRemarks = document.getElementById('stat-remarks');
    const statTotal = document.getElementById('stat-total');
    const traitBest = document.getElementById('trait-best');
    const traitWorst = document.getElementById('trait-worst');
    const remarksListUl = document.getElementById('profile-remarks-list');

    if (studentSelect && profileContainer) {
        ratingSystem.getAllStudents().forEach(student => {
            const option = document.createElement('option');
            option.value = student.id;
            option.textContent = student.name;
            studentSelect.appendChild(option);
        });

        studentSelect.addEventListener('change', (e) => {
            const id = parseInt(e.target.value);
            
            if (!id) {
                profileContainer.style.display = 'none';
                return;
            }

            const student = ratingSystem.getStudent(id);
            
            if (student) {
                profileContainer.style.display = 'block';
                if (profileName) profileName.textContent = student.name;
                if (statSocial) statSocial.textContent = student.scores.socialEvents || 0;
                if (statDuty) statDuty.textContent = student.scores.duty || 0;
                if (statEvents) statEvents.textContent = student.scores.events || 0;
                if (statRemarks) statRemarks.textContent = student.remarksList.length;
                if (statTotal) statTotal.textContent = ratingSystem.calculateTotalScore(student);

                const traits = ratingSystem.analyzeTraits(student);
                if (traitBest) traitBest.textContent = traits.best;
                if (traitWorst) traitWorst.textContent = traits.worst;

                if (remarksListUl) {
                    remarksListUl.innerHTML = '';
                    if (student.remarksList.length === 0) {
                        const li = document.createElement('li');
                        li.textContent = 'Учня немає за що сварити, зауваження відсутні!';
                        li.classList.add('empty');
                        remarksListUl.appendChild(li);
                    } else {
                        student.remarksList.forEach(remark => {
                            const li = document.createElement('li');
                            li.textContent = remark;
                            remarksListUl.appendChild(li);
                        });
                    }
                }
            }
        });
    }
});