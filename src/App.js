import './App.css';

function App() {
    const handleStartStop = (params) => {};
    const handleReset = (params) => {};

    // function fancyTimeFormat(duration) {
    //     // Hours, minutes and seconds
    //     var hrs = ~~(duration / 3600);
    //     var mins = ~~((duration % 3600) / 60);
    //     var secs = ~~duration % 60;

    //     // Output like "1:01" or "4:03:59" or "123:03:59"
    //     var ret = '';

    //     if (hrs > 0) {
    //         ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    //     }

    //     ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    //     ret += '' + secs;
    //     return ret;
    // }

    // function startTimer(duration, display) {
    //     var start = Date.now(),
    //         diff,
    //         minutes,
    //         seconds;
    //     function timer() {
    //         // get the number of seconds that have elapsed since
    //         // startTimer() was called
    //         diff = duration - (((Date.now() - start) / 1000) | 0);

    //         // does the same job as parseInt truncates the float
    //         minutes = (diff / 60) | 0;
    //         seconds = diff % 60 | 0;

    //         minutes = minutes < 10 ? '0' + minutes : minutes;
    //         seconds = seconds < 10 ? '0' + seconds : seconds;

    //         display.textContent = minutes + ':' + seconds;

    //         if (diff <= 0) {
    //             // add one second so that the count down starts at the full duration
    //             // example 05:00 not 04:59
    //             start = Date.now() + 1000;
    //         }
    //     }
    //     // we don't want to wait a full second before the timer starts
    //     timer();
    //     setInterval(timer, 1000);
    // }

    // window.onload = function () {
    //     var fiveMinutes = 60 * 5,
    //         display = document.querySelector('#time');
    //     startTimer(fiveMinutes, display);
    // };

    return (
        <div className="App  text-white m-auto">
            {/* Settings */}
            <div className="bred">
                <div>
                    <div id="break-label" className="">
                        Break Length
                    </div>
                    <button onClick={() => {}} id="break-decrement">
                        <i className="fa fa-sort-down text-5xl"></i>
                    </button>
                    <button onClick={() => {}} id="break-increment">
                        <i className="fa fa-sort-up text-5xl"></i>
                    </button>
                    <div id="break-length">5:00</div>
                </div>
                <div className="session-controls">
                    <div className="" id="session-label">
                        Session Length
                    </div>
                    <button onClick={() => {}} id="session-decrement">
                        <i className="fa fa-sort-down text-5xl"></i>
                    </button>
                    <button onClick={() => {}} id="session-increment">
                        <i className="fa fa-sort-up text-5xl"></i>
                    </button>
                    <div id="session-length">25:00</div>
                </div>
            </div>
            {/* Display */}
            <div id="timer-label">Session</div>
            <div id="time-left">mm:ss</div>
            <button onClick={handleStartStop} id="start_stop">
                <i class="fa fa-play" /> play / pause
                <i class="fa fa-pause" /> play / pause
            </button>
            <button onCick={handleReset} id="reset">
                reset
            </button>
            <div className="stars "></div>
            <div className="twinkling"></div>
        </div>
    );
}

export default App;
