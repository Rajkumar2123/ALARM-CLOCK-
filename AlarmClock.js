let alarmTimeout;

function updateCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const currentTime = `${hours}:${minutes}:${seconds}`;

    const alarmTimeInput = document.getElementById('alarm-time');
    if (alarmTimeInput) {
        alarmTimeInput.value = currentTime;
    }
}
updateCurrentTime();
setInterval(updateCurrentTime, 1000);

function playAlarmSound() {
    const audio = new Audio('https://freesound.org/data/previews/316/316847_4939433-lq.mp3'); // Replace with your audio path
    audio.play();// Play the alarm sound its a javascript method
}

function setAlarm() {
    const alarmTime = document.getElementById('alarm-input').value;
    const alarmMessage = document.getElementById('alarm-message').value;

    if (!alarmTime) return;

    const [alarmHour, alarmMinute] = alarmTime.split(':');
    const now = new Date();
    const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHour, alarmMinute, 0);

    if (alarmDate <= now) {
        alert('Please set a future time for the alarm.');
        return;
    }

    const timeToAlarm = alarmDate - now;

    document.querySelector('#alarm-status p').innerText = `Alarm set for ${alarmTime}.`;

    alarmTimeout = setTimeout(() => {
        alert(`⏰ Alarm: ${alarmMessage}`);
        playAlarmSound();
    }, timeToAlarm);
}

function cancelAlarm() {
    clearTimeout(alarmTimeout);
    document.querySelector('#alarm-status p').innerText = `No alarm set.`;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    updateCurrentTime();
    setInterval(updateCurrentTime, 1000);

    document.getElementById('alarm-form').addEventListener('submit', (e) => {
        e.preventDefault();
        setAlarm();
    });

    document.getElementById('cancel-alarm').addEventListener('click', cancelAlarm);
});