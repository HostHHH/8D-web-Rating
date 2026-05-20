import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8n5mXbBMPk4GuUv-aO8CJnSXFBQA8ous",
    authDomain: "class-site-8edef.firebaseapp.com",
    projectId: "class-site-8edef",
    storageBucket: "class-site-8edef.firebasestorage.app",
    messagingSenderId: "13952401746",
    appId: "1:13952401746:web:034759ca8f1eefd4ac3a8b",
    measurementId: "G-30FKZVYE52",
    databaseURL: "https://class-site-8edef-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const provider = new GoogleAuthProvider();

const adminEmails = [
    "solomianech@gmail.com",
    "orestmatsevych@gmail.com"
];

const studentPairs = [
    ["Бірюков Денис", "Дмитро Дяков"],
    ["Кушнір Олексій", "Верановський Ян"],
    ["Слопачук Костя", "Родзін Андрій"],
    ["Статнік Микола", "Мацевич Орест"],
    ["Паламарчук Максим", "Михайлов Олександр"],
    ["Мисюра Дмитро", "Бойко Максим"],
    ["Савчук Евеліна", "Рищук Емілія"],
    ["Нечипорук Соломія", "Гринчук Богдана"],
    ["Петрушина Софія", "Збирит Маргарита"],
    ["Віктор Опанасюк", "Стихун А. - Вдовиченко Н."],
    ["Пальчевська Софія", "Шліхта Софія"],
    ["Пилат Владислав", "Мартинюк Денис"],
    ["Верба Соломія", "Максимчук Марта"],
    ["Крівцова Софія", "Коваль Марія"],
    ["Бровчук Роман", "Дмитрук Тарас"],
    ["Нікіцький Роман", "Дорофєєв Назар"],
    ["Трачук Матвій", "Українець Дмитро"],
    ["Левчук Матвій", "Кривчук Андрій"]
];

let scheduleData = [];
let tempSchedule = [];
let dragStartIndex = null;

const dayNames = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

function generateDatesList(startDate) {
    const dates = [];
    let currentDate = new Date(startDate);
    let daysAdded = 0;
    
    while (daysAdded < 19) {
        const dayOfWeek = currentDate.getDay();
        
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            const dayStr = String(currentDate.getDate()).padStart(2, '0');
            const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
            const localIsoDate = `${currentDate.getFullYear()}-${monthStr}-${dayStr}`;
            
            dates.push({
                date: `${dayStr}/${monthStr}`,
                isoDate: localIsoDate,
                dayIndex: dayOfWeek
            });
            daysAdded++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

function createSchedule(startDate) {
    const newSchedule = [];
    const dates = generateDatesList(startDate);
    
    for (let i = 0; i < 19; i++) {
        const currentPair = studentPairs[i % studentPairs.length];
        newSchedule.push({
            date: dates[i].date,
            duty1: currentPair[0],
            duty2: currentPair[1],
            isoDate: dates[i].isoDate,
            dayIndex: dates[i].dayIndex
        });
    }
    return newSchedule;
}

function renderSchedule() {
    const tbody = document.getElementById("schedule-tbody");
    tbody.innerHTML = "";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    scheduleData.forEach((item) => {
        const dateParts = item.isoDate.split('-');
        const itemDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        itemDate.setHours(0, 0, 0, 0);
        
        const dayOfWeek = dayNames[item.dayIndex];
        
        let statusText = "Очікується";
        let statusClass = "status-pending";
        let rowStyles = "";
        
        if (itemDate.getTime() === today.getTime()) {
            statusText = "Сьогодні";
            statusClass = "status-today";
            rowStyles = "background-color: rgba(141, 164, 196, 0.05); font-weight: 600;";
        } else if (itemDate < today) {
            statusText = "Завершено";
            statusClass = "status-done";
            rowStyles = "opacity: 0.6;";
        }

        const tr = document.createElement("tr");
        tr.style.cssText = rowStyles;
        tr.innerHTML = `
            <td>${item.date}</td>
            <td>${dayOfWeek}</td>
            <td>${item.duty1}</td>
            <td>${item.duty2}</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function renderAdminList() {
    const list = document.getElementById("admin-draggable-list");
    list.innerHTML = "";
    
    tempSchedule.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "draggable-item";
        li.setAttribute("draggable", "true");
        li.setAttribute("data-index", index);
        
        li.innerHTML = `
            <div class="drag-date">${item.date} <br><small>${dayNames[item.dayIndex]}</small></div>
            <div class="drag-duty">${item.duty1} <br> ${item.duty2}</div>
            <div class="drag-handle">☰</div>
        `;
        
        li.addEventListener("dragstart", dragStart);
        li.addEventListener("dragover", dragOver);
        li.addEventListener("drop", dragDrop);
        li.addEventListener("dragenter", dragEnter);
        li.addEventListener("dragleave", dragLeave);
        
        list.appendChild(li);
    });
}

function dragStart() {
    dragStartIndex = +this.getAttribute("data-index");
    this.classList.add("dragging");
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("drag-over");
}

function dragLeave() {
    this.classList.remove("drag-over");
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute("data-index");
    this.classList.remove("drag-over");
    
    const tempDuty1 = tempSchedule[dragStartIndex].duty1;
    const tempDuty2 = tempSchedule[dragStartIndex].duty2;
    
    tempSchedule[dragStartIndex].duty1 = tempSchedule[dragEndIndex].duty1;
    tempSchedule[dragStartIndex].duty2 = tempSchedule[dragEndIndex].duty2;
    
    tempSchedule[dragEndIndex].duty1 = tempDuty1;
    tempSchedule[dragEndIndex].duty2 = tempDuty2;
    
    renderAdminList();
}

const secretTrigger = document.getElementById("secret-trigger");
const adminModal = document.getElementById("admin-modal");
const closeModal = document.getElementById("close-modal");
const adminForm = document.getElementById("admin-form");
const startDateInput = document.getElementById("start-date-input");

function openAdminMenu() {
    tempSchedule = JSON.parse(JSON.stringify(scheduleData));
    
    if (tempSchedule.length > 0) {
        const refDate = new Date(tempSchedule[0].isoDate);
        const month = String(refDate.getMonth() + 1).padStart(2, '0');
        const day = String(refDate.getDate()).padStart(2, '0');
        startDateInput.value = `${refDate.getFullYear()}-${month}-${day}`;
    }
    
    renderAdminList();
    adminModal.classList.add("active");
}

async function handleAdminAccess() {
    const user = auth.currentUser;
    
    if (user) {
        if (adminEmails.includes(user.email)) {
            openAdminMenu();
        } else {
            alert("Доступ заборонено: ваш Google-акаунт не входить до списку адміністраторів.");
        }
    } else {
        try {
            const result = await signInWithPopup(auth, provider);
            if (adminEmails.includes(result.user.email)) {
                openAdminMenu();
            } else {
                alert("Доступ заборонено: ваш Google-акаунт не входить до списку адміністраторів.");
            }
        } catch (error) {
            alert("Помилка авторизації: " + error.message);
        }
    }
}

secretTrigger.addEventListener("dblclick", (e) => {
    e.preventDefault();
    handleAdminAccess();
});

startDateInput.addEventListener("change", (e) => {
    const dateParts = e.target.value.split('-');
    const newDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const newDates = generateDatesList(newDate);
    
    tempSchedule.forEach((item, index) => {
        item.date = newDates[index].date;
        item.isoDate = newDates[index].isoDate;
        item.dayIndex = newDates[index].dayIndex;
    });
    renderAdminList();
});

closeModal.addEventListener("click", () => adminModal.classList.remove("active"));
adminModal.addEventListener("click", (e) => {
    if (e.target === adminModal) adminModal.classList.remove("active");
});

adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    
    if (!user || !adminEmails.includes(user.email)) {
        alert("Дія відхилена: недостатньо прав.");
        return;
    }
    
    try {
        await set(ref(db, "schedule"), tempSchedule);
        adminModal.classList.remove("active");
    } catch (error) {
        alert("Помилка збереження даних: " + error.message);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const scheduleRef = ref(db, "schedule");
    onValue(scheduleRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            scheduleData = data;
        } else {
            scheduleData = createSchedule(new Date());
            set(scheduleRef, scheduleData);
        }
        renderSchedule();
    });
});
