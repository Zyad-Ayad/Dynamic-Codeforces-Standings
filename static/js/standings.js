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


// scroll slowly until the end of the page then reload
document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top
    window.scrollTo(0, 0);

    // Time when the page should start reloading
    var startTime = Date.now();
    var reloadTime = 10000; // 10 seconds

    // Scroll down and check the elapsed time
    var scrollInterval = setInterval(function() {
        window.scrollBy(0, 1);
        
        // Check if the end of the page is reached
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            
            // Check if 10 seconds have passed
            if (Date.now() - startTime >= reloadTime) {
                clearInterval(scrollInterval);
                // Reload the page
                window.location.href = window.location.href;
            } else {
                // Reset scroll to top and continue
                window.scrollTo(0, 0);
                startTime = Date.now(); // Reset start time
            }
        }
    }, 15);
});

