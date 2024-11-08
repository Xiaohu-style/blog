document.addEventListener("DOMContentLoaded", function() {
    const videoDay = document.getElementById('video-day');
    const videoNight = document.getElementById('video-night');

    function setBackground() {
        const now = new Date();
        const hours = now.getHours();

        if (hours >= 6 && hours < 18) {
            // Daytime, show daytime video
            videoDay.style.display = 'block';
            videoNight.style.display = 'none';
        } else {
            // Nighttime, show nighttime video
            videoDay.style.display = 'none';
            videoNight.style.display = 'block';
        }
    }

    // Initial setup
    setBackground();

    // Check and update background every minute (adjust as needed)
    setInterval(setBackground, 60000);
});
