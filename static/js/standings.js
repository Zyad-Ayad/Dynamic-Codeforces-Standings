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


function autoRedload() {
    setInterval(function() {
        location.reload();
    }, 10000);
}


document.addEventListener('DOMContentLoaded', function() {
    scrollDirection = 1;

    
    const params = new URLSearchParams(window.location.search);

    if (params.get('scroll') != 'on') {
        autoRedload();
        return;
    }
    
    let msPassed = 0;

    setInterval(function() {
        msPassed += 20;
        if (scrollDirection == 1) {
            window.scrollBy(0, 1);
            if (window.scrollY + window.innerHeight >= document.body.scrollHeight ) {
                scrollDirection *= -1;

                if (msPassed >= 10000) {
                    location.reload();
                }

            }
        } else {
            window.scrollBy(0, -1);
            if (window.scrollY == 0) {
                scrollDirection *= -1;
                if (msPassed >= 10000) {
                    location.reload();
                }
            }
        }
    }, 20);

});


