const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
];

const Gan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const Zhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
const Animals = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"];
const solarTerms = ["小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"];
const sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];

const lunarMonths = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
const lunarDays = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十",
    "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十",
    "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];

const baguaData = [
    { name: "乾", symbol: "☰", description: "乾为天，元亨利贞，象征刚健、创造、领导者", meaning: "此卦象主大吉，诸事顺利，宜积极进取" },
    { name: "坤", symbol: "☷", description: "坤为地，厚德载物，象征柔顺、包容、承载者", meaning: "此卦象主稳，宜守成、积累，不宜冒进" },
    { name: "震", symbol: "☳", description: "震为雷，动也，象征震动、奋起、警觉", meaning: "此卦象主变，有喜事将至，但需保持警觉" },
    { name: "艮", symbol: "☶", description: "艮为山，止也，象征静止、稳重、观察", meaning: "此卦象主止，宜静观其变，不宜妄动" },
    { name: "离", symbol: "☲", description: "离为火，丽也，象征光明、依附、文明", meaning: "此卦象主明，宜展现才华，与人和睦" },
    { name: "坎", symbol: "☵", description: "坎为水，陷也，象征危险、智慧、坚持", meaning: "此卦象主险，需谨慎行事，保持信念" },
    { name: "兑", symbol: "☱", description: "兑为泽，悦也，象征喜悦、沟通、分享", meaning: "此卦象主悦，宜沟通交流，广结善缘" },
    { name: "巽", symbol: "☴", description: "巽为风，入也，象征谦逊、渗透、适应", meaning: "此卦象主入，宜循序渐进，顺势而为" }
];

const astrologyData = [
    { sign: "事业", description: "今日事业运势旺盛，宜积极推进工作项目，有望获得领导赏识。", color: "#3498db" },
    { sign: "财运", description: "今日财运亨通，投资理财可获收益，但需谨慎决策，不可盲目跟风。", color: "#2ecc71" },
    { sign: "感情", description: "今日感情运势甜蜜，单身者有望邂逅良缘，已有伴侣者感情升温。", color: "#e74c3c" },
    { sign: "健康", description: "今日身体状况良好，宜适度运动，保持规律作息，注意饮食均衡。", color: "#9b59b6" },
    { sign: "学业", description: "今日学习效率高，适合攻克难题，记忆力和理解力都处于最佳状态。", color: "#f39c12" },
    { sign: "人际关系", description: "今日人际运势极佳，适合社交活动，能结识新朋友，人脉得到拓展。", color: "#1abc9c" }
];

function lYearDays(y) {
    let sum = 348;
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
    }
    return sum + leapDays(y);
}

function leapMonth(y) {
    return lunarInfo[y - 1900] & 0xf;
}

function leapDays(y) {
    if (leapMonth(y)) {
        return (lunarInfo[y - 1900] & 0x10000) ? 30 : 29;
    }
    return 0;
}

function monthDays(y, m) {
    return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29;
}

function getLunarDate(year, month, day) {
    const baseDate = new Date(1900, 0, 31);
    const objDate = new Date(year, month - 1, day);
    let offset = Math.floor((objDate - baseDate) / 86400000);
    
    let yearL = 1900;
    let temp = 0;
    for (; yearL < 2100 && offset > 0; yearL++) {
        temp = lYearDays(yearL);
        offset -= temp;
    }
    if (offset < 0) {
        offset += temp;
        yearL--;
    }
    
    const leap = leapMonth(yearL);
    let isLeap = false;
    let monthL = 1;
    for (; monthL < 13 && offset > 0; monthL++) {
        if (leap > 0 && monthL === leap + 1 && isLeap === false) {
            --monthL;
            isLeap = true;
            temp = leapDays(yearL);
        } else {
            temp = monthDays(yearL, monthL);
        }
        if (isLeap === true && monthL === leap + 1) {
            isLeap = false;
        }
        offset -= temp;
    }
    if (offset === 0 && leap > 0 && monthL === leap + 1) {
        if (isLeap) {
            isLeap = false;
        } else {
            isLeap = true;
            --monthL;
        }
    }
    if (offset < 0) {
        offset += temp;
        --monthL;
    }
    
    const dayL = offset + 1;
    return {
        year: yearL,
        month: monthL,
        day: dayL,
        isLeap: isLeap,
        yearGanZhi: cyclical(yearL - 1900 + 36),
        zodiac: Animals[(yearL - 1900) % 12]
    };
}

function cyclical(num) {
    return Gan[num % 10] + Zhi[num % 12];
}

function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}年${month}月${day}日`;
}

function formatLunarDate(lunar) {
    let monthStr = lunar.isLeap ? "闰" : "";
    monthStr += lunarMonths[lunar.month - 1];
    const dayStr = lunarDays[lunar.day - 1];
    return `${lunar.yearGanZhi}年（${lunar.zodiac}年）${monthStr}月${dayStr}`;
}

function getWeekday(date) {
    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekdays[date.getDay()];
}

function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('currentTime').textContent = `${hours}:${minutes}:${seconds}`;
}

function updateDateDisplay() {
    const now = new Date();
    const solarDate = formatDate(now);
    const lunar = getLunarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
    const lunarDate = formatLunarDate(lunar);
    const weekday = getWeekday(now);
    
    document.getElementById('solarDate').textContent = solarDate;
    document.getElementById('lunarDate').textContent = lunarDate;
    document.getElementById('weekdayInfo').textContent = weekday;
}

function generateBagua() {
    const randomIndex = Math.floor(Math.random() * baguaData.length);
    const bagua = baguaData[randomIndex];
    
    document.getElementById('baguaSymbol').textContent = bagua.symbol;
    document.getElementById('baguaInfo').innerHTML = `
        <div style="font-size: 1.4rem; font-weight: bold; color: #d4af37; margin-bottom: 10px;">
            【${bagua.name}卦】
        </div>
        <div style="margin-bottom: 8px;">${bagua.description}</div>
        <div style="color: #27ae60; font-weight: 500;">${bagua.meaning}</div>
    `;
}

function getAstrology() {
    const randomIndex = Math.floor(Math.random() * astrologyData.length);
    const astrology = astrologyData[randomIndex];
    
    document.getElementById('astrologyResult').innerHTML = `
        <div style="font-size: 1.4rem; font-weight: bold; color: ${astrology.color}; margin-bottom: 10px;">
            【${astrology.sign}运势】
        </div>
        <div>${astrology.description}</div>
    `;
}

function saveNotes() {
    const notes = document.getElementById('notesArea').value;
    const today = new Date().toDateString();
    localStorage.setItem('notes_' + today, notes);
    alert('笔记已保存！');
}

function loadNotes() {
    const today = new Date().toDateString();
    const notes = localStorage.getItem('notes_' + today);
    if (notes) {
        document.getElementById('notesArea').value = notes;
    }
}

function getReminders() {
    const reminders = localStorage.getItem('reminders');
    return reminders ? JSON.parse(reminders) : [];
}

function saveReminders(reminders) {
    localStorage.setItem('reminders', JSON.stringify(reminders));
}

function addReminder() {
    const text = document.getElementById('reminderText').value;
    const time = document.getElementById('reminderTime').value;
    
    if (!text || !time) {
        alert('请填写完整的事件内容和时间！');
        return;
    }
    
    const reminders = getReminders();
    reminders.push({
        id: Date.now(),
        text: text,
        time: time
    });
    
    reminders.sort((a, b) => new Date(a.time) - new Date(b.time));
    saveReminders(reminders);
    displayReminders();
    
    document.getElementById('reminderText').value = '';
    document.getElementById('reminderTime').value = '';
}

function deleteReminder(id) {
    const reminders = getReminders();
    const filtered = reminders.filter(r => r.id !== id);
    saveReminders(filtered);
    displayReminders();
}

function formatReminderTime(timeStr) {
    const date = new Date(timeStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}`;
}

function displayReminders() {
    const reminders = getReminders();
    const container = document.getElementById('remindersList');
    
    if (reminders.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center; padding: 20px;">暂无提醒事件</p>';
        return;
    }
    
    container.innerHTML = reminders.map(reminder => `
        <div class="reminder-item">
            <div class="reminder-content">
                <div class="reminder-text">${reminder.text}</div>
                <div class="reminder-time">${formatReminderTime(reminder.time)}</div>
            </div>
            <button class="delete-btn" onclick="deleteReminder(${reminder.id})">删除</button>
        </div>
    `).join('');
}

function checkReminders() {
    const reminders = getReminders();
    const now = new Date();
    
    reminders.forEach(reminder => {
        const reminderTime = new Date(reminder.time);
        const diff = reminderTime - now;
        
        if (diff > 0 && diff < 60000) {
            alert(`提醒：${reminder.text}`);
        }
    });
}

function init() {
    updateDateDisplay();
    updateCurrentTime();
    loadNotes();
    displayReminders();
    
    generateBagua();
    getAstrology();
    
    setInterval(updateCurrentTime, 1000);
    setInterval(checkReminders, 30000);
}

document.addEventListener('DOMContentLoaded', init);
