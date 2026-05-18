const studentsData = [
    { id: 1, name: "Бірюков Денис Олександрович", scores: { socialEvents: 45, duty: 10, events: 20 }, remarksList: ["Запізнення на урок", "Розмови під час контрольної"] },
    { id: 2, name: "Бойко Максим Володимирович", scores: { socialEvents: 80, duty: 20, events: 50 }, remarksList: [] },
    { id: 3, name: "Бровчук Роман Ігорович", scores: { socialEvents: 10, duty: 0, events: 5 }, remarksList: ["Невиконане домашнє завдання", "Бійка в коридорі", "Прогул"] },
    { id: 4, name: "Верановський Ян Юрійович", scores: { socialEvents: 60, duty: 30, events: 40 }, remarksList: ["Забув зошит"] },
    { id: 5, name: "Верба Юлія Миколаївна", scores: { socialEvents: 90, duty: 40, events: 80 }, remarksList: [] },
    { id: 6, name: "Гринчук Богдана Віталіївна", scores: { socialEvents: 30, duty: 10, events: 10 }, remarksList: ["Зауваження 1"] },
    { id: 7, name: "Дмитрук Тарас Юрійович", scores: { socialEvents: 50, duty: 20, events: 30 }, remarksList: [] },
    { id: 8, name: "Дорофєєв Назарій Павлович", scores: { socialEvents: 70, duty: 10, events: 60 }, remarksList: ["Зауваження 1", "Зауваження 2"] },
    { id: 9, name: "Дяков Дмитро Павлович", scores: { socialEvents: 20, duty: 0, events: 15 }, remarksList: [] },
    { id: 10, name: "Збирит Маргарита Сергіївна", scores: { socialEvents: 85, duty: 30, events: 70 }, remarksList: [] },
    { id: 11, name: "Коваль Марія Миколаївна", scores: { socialEvents: 95, duty: 40, events: 90 }, remarksList: [] },
    { id: 12, name: "Кривчук Андрій Миколайович", scores: { socialEvents: 40, duty: 10, events: 25 }, remarksList: ["Шум на уроці"] },
    { id: 13, name: "Крівцова Софія Валентинівна", scores: { socialEvents: 75, duty: 20, events: 55 }, remarksList: [] },
    { id: 14, name: "Кушнір Олексій Сергійович", scores: { socialEvents: 55, duty: 10, events: 35 }, remarksList: ["Бігав по коридору", "Запізнення"] },
    { id: 15, name: "Левчук Матвій Іванович", scores: { socialEvents: 65, duty: 20, events: 45 }, remarksList: [] },
    { id: 16, name: "Максимчук Марта Сергіївна", scores: { socialEvents: 100, duty: 50, events: 100 }, remarksList: [] },
    { id: 17, name: "Мартинюк Денис Андрійович", scores: { socialEvents: 35, duty: 0, events: 20 }, remarksList: ["Зауваження"] },
    { id: 18, name: "Мацевич Орест Дмитрович", scores: { socialEvents: 80, duty: 30, events: 65 }, remarksList: [] },
    { id: 19, name: "Мисюра Дмитро Ігорович", scores: { socialEvents: 25, duty: 10, events: 10 }, remarksList: ["Списував"] },
    { id: 20, name: "Михайлов Олександр Андрійович", scores: { socialEvents: 45, duty: 20, events: 30 }, remarksList: [] },
    { id: 21, name: "Нечипорук Соломія Юріївна", scores: { socialEvents: 85, duty: 30, events: 75 }, remarksList: [] },
    { id: 22, name: "Нікітський Роман Олександрович", scores: { socialEvents: 50, duty: 10, events: 40 }, remarksList: ["Зауваження 1", "Зауваження 2", "Зауваження 3"] },
    { id: 23, name: "Опанасюк Віктор Олегович", scores: { socialEvents: 60, duty: 20, events: 50 }, remarksList: [] },
    { id: 24, name: "Паламарчук Максим Віталійович", scores: { socialEvents: 70, duty: 10, events: 60 }, remarksList: ["Порушення дисципліни"] },
    { id: 25, name: "Пальчевська Софія Володимирівна", scores: { socialEvents: 90, duty: 40, events: 85 }, remarksList: [] },
    { id: 26, name: "Петрушина Софія Русланівна", scores: { socialEvents: 75, duty: 20, events: 65 }, remarksList: [] },
    { id: 27, name: "Пилат Владислав Олегович", scores: { socialEvents: 30, duty: 0, events: 20 }, remarksList: ["Без змінного взуття"] },
    { id: 28, name: "Рищук Емілія В'ячеславівна", scores: { socialEvents: 80, duty: 30, events: 70 }, remarksList: [] },
    { id: 29, name: "Родзін Андрій Сергійович", scores: { socialEvents: 40, duty: 10, events: 25 }, remarksList: ["Спізнення"] },
    { id: 30, name: "Савчук Евеліна Віталіївна", scores: { socialEvents: 95, duty: 40, events: 90 }, remarksList: [] },
    { id: 31, name: "Сафонов Улас Романович", scores: { socialEvents: 55, duty: 20, events: 45 }, remarksList: [] },
    { id: 32, name: "Слопачук Костянтин Романович", scores: { socialEvents: 65, duty: 10, events: 50 }, remarksList: ["Зауваження 1", "Зауваження 2"] },
    { id: 33, name: "Статнік Микола Вікторович", scores: { socialEvents: 45, duty: 10, events: 35 }, remarksList: [] },
    { id: 34, name: "Стихун Артем Ігорович", scores: { socialEvents: 70, duty: 20, events: 60 }, remarksList: ["Не виконав завдання"] },
    { id: 35, name: "Трачук Матвій Володимирович", scores: { socialEvents: 85, duty: 30, events: 75 }, remarksList: [] },
    { id: 36, name: "Шевчук Юстинія Василівна", scores: { socialEvents: 90, duty: 40, events: 85 }, remarksList: [] },
    { id: 37, name: "Учень 37", scores: { socialEvents: 0, duty: 0, events: 0 }, remarksList: [] },
    { id: 38, name: "Учень 38", scores: { socialEvents: 0, duty: 0, events: 0 }, remarksList: [] },
    { id: 39, name: "Учень 39", scores: { socialEvents: 0, duty: 0, events: 0 }, remarksList: [] }
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
                profileName.textContent = student.name;
                statSocial.textContent = student.scores.socialEvents || 0;
                statDuty.textContent = student.scores.duty || 0;
                statEvents.textContent = student.scores.events || 0;
                statRemarks.textContent = student.remarksList.length;
                statTotal.textContent = ratingSystem.calculateTotalScore(student);

                const traits = ratingSystem.analyzeTraits(student);
                traitBest.textContent = traits.best;
                traitWorst.textContent = traits.worst;

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
        });
    }
});