document.addEventListener('DOMContentLoaded', function() {
    

    var timer = document.querySelector('.timer');
    timer.innerHTML = timer.innerHTML.trim();

    let [contestDuration, contestStartTime] = timer.innerHTML.split(',');

   
    contestDuration = parseInt(contestDuration);
    contestStartTime = parseInt(contestStartTime);

    // contest start time in seconds (unix format)

    let currentTime = Math.floor(Date.now() / 1000);
    let timeElapsed = currentTime - contestStartTime;
    let timeLeft = contestDuration - timeElapsed;

    if (timeLeft < 0) {
        timer.innerHTML = 'Contest Ended';
        return;
    }

    console.log(contestDuration, contestStartTime, currentTime, timeElapsed, timeLeft);

    setInterval(function() {
        let currentTime = Math.floor(Date.now() / 1000);
        let timeElapsed = currentTime - contestStartTime;
        let timeLeft = contestDuration - timeElapsed;

        

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timer.innerHTML = 'Contest Ended';
        }

        let hours = Math.floor(timeLeft / 3600);
        let minutes = Math.floor((timeLeft % 3600) / 60);
        let seconds = timeLeft % 60;

        timer.innerHTML = hours + 'h ' + minutes + 'm ' + seconds + 's';

        

    }, 1000);



});


// reload page after every 5 seconds
setInterval(function() {
    location.reload();
}, 5000);