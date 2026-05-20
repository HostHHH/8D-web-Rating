import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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

const studentsList = [
    "Бірюков Денис", "Бойко Максим", "Бровчук Роман", "Вдовиченко Назарій", 
    "Верановський Ян", "Верба Соломія", "Гринчук Богдана", "Дмитрук Тарас", 
    "Дорофєєв Назарій", "Дяков Дмитро", "Збирит Маргарита", "Коваль Марія", 
    "Кривчук Андрій", "Крівцова Софія", "Кушнір Олексій", "Левчук Матвій", 
    "Максимчук Марта", "Мартинюк Денис", "Мацевич Орест", "Мисюра Дмитро", 
    "Михайлов Олександр", "Нечипорук Соломія", "Нікітський Роман", "Опанасюк Віктор", 
    "Паламарчук Максим", "Пальчевська Софія", "Петрушина Софія", "Пилат Владислав", 
    "Рищук Емілія", "Родзін Андрій", "Савчук Евеліна", "Сафонов Улас", 
    "Слопачук Костянтин", "Статнік Микола", "Стихун Артем", "Трачук Матвій", 
    "Українець Дмитро", "Шевчук Юстинія", "Шліхта Софія"
];

let attendanceData = {};
let isAdmin = false;

// Отримуємо сьогоднішню дату у форматі YYYY-MM-DD
function getTodayKey() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const todayKey = getTodayKey();

function renderStudents() {
    const grid = document.getElementById("students-grid");
    const statsCounter = document.getElementById("stats-counter");
    grid.innerHTML = "";
    
    let presentCount = 0;

    studentsList.forEach((name, index) => {
        // Якщо даних немає або вони не 'false', учень вважається присутнім
        const isPresent = attendanceData[index] !== false;
        if (isPresent) presentCount++;

        const card = document.createElement("div");
        card.className = `student-card ${isPresent ? 'present' : 'absent'}`;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="student-name">${name}</div>
            <div class="status-indicator">${isPresent ? 'Присутній(я)' : 'Відсутній(я)'}</div>
        `;

        grid.appendChild(card);
    });

    statsCounter.textContent = `Присутні: ${presentCount} / ${studentsList.length}`;
}

// Авторизація через подвійний клік на логотип
async function handleAdminAccess() {
    const user = auth.currentUser;
    if (user) {
        if (adminEmails.includes(user.email)) {
            alert("Ви вже авторизовані як адміністратор.");
        } else {
            alert("Доступ заборонено: ваш акаунт не має прав адміністратора.");
        }
    } else {
        try {
            const result = await signInWithPopup(auth, provider);
            if (adminEmails.includes(result.user.email)) {
                alert("Немає доступу");
            } else {
                alert("Доступ заборонено: ваш акаунт не має прав адміністратора.");
            }
        } catch (error) {
            alert("Помилка авторизації: " + error.message);
        }
    }
}

document.getElementById("secret-trigger").addEventListener("dblclick", (e) => {
    e.preventDefault();
    handleAdminAccess();
});

// Обробка кліку по учню
async function handleStudentClick(index) {
    if (!isAdmin) {
        alert("Немає доступу");
        return;
    }

    const isPresent = attendanceData[index] !== false;
    try {
        // Зберігаємо поточний стан (true - присутній, false - відсутній) у гілку сьогоднішнього дня
        await set(ref(db, `attendance/${todayKey}/${index}`), !isPresent);
    } catch (error) {
        alert("Помилка збереження даних: " + error.message);
    }
}

document.getElementById("students-grid").addEventListener("click", (e) => {
    const card = e.target.closest(".student-card");
    if (!card) return;
    const studentIndex = parseInt(card.dataset.index);
    handleStudentClick(studentIndex);
});

onAuthStateChanged(auth, (user) => {
    if (user && adminEmails.includes(user.email)) {
        isAdmin = true;
        document.body.classList.add("admin-mode");
    } else {
        isAdmin = false;
        document.body.classList.remove("admin-mode");
    }
});

// Таймер для автоматичного оновлення сторінки рівно о 00:00
function setupMidnightRefresh() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
    const msUntilMidnight = midnight.getTime() - now.getTime();
    
    setTimeout(() => {
        window.location.reload();
    }, msUntilMidnight);
}

document.addEventListener("DOMContentLoaded", () => {
    // Завантажуємо відвідуваність ТІЛЬКИ для поточної дати
    const attendanceRef = ref(db, `attendance/${todayKey}`);
    onValue(attendanceRef, (snapshot) => {
        attendanceData = snapshot.val() || {};
        renderStudents();
    });

    setupMidnightRefresh();
});