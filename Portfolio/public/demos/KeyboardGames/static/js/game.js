const pressedKeys = {};
let animationFrame;
const dbVersion = 1;
let $dot = $('#dot');
const dotWidth = parseInt($dot.outerWidth());
const dotHeight = parseInt($dot.outerHeight());
const pathTolerance = 10;
const centerX = Math.round(window.innerWidth / 2);
const centerXRange = [centerX - pathTolerance, centerX + pathTolerance];
const centerY = Math.round(window.innerHeight / 2);
const centerYRange = [centerY - pathTolerance, centerY + pathTolerance];
let circleInterval;
let loggedIn = false;
let enteredGameRoom = false;
let loadingInterval;
const defaultSkin = `<div id="dot" style="background-color: #000000"></div>`;


function onPageLoad() {
    setSkin();
    setArrowKeys();
}

function bindTouchKey(buttonId, keyName) {
    const btn = $(`#${buttonId}`).get(0);
    if (!btn) return;

    btn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        mover(keyName);
    });

    btn.addEventListener('touchend', function(e) {
        e.preventDefault();
        stopMovement(keyName);
    });

    btn.addEventListener('touchcancel', function(e) {
        e.preventDefault();
        stopMovement(keyName);
    });
}

function setArrowKeys() {
    const mobileControls = `
        <div class="mobile-controls">
            <div class="keys">
                <div>
                    <button class="arrow-key blank">↑</button>
                    <button class="arrow-key up" id="arrow-up">↑</button>
                    <button class="arrow-key blank">↑</button>
                </div>
                <div>
                    <button class="arrow-key left" id="arrow-left">←</button>
                    <button class="arrow-key down" id="arrow-down">↓</button>
                    <button class="arrow-key right" id="arrow-right">→</button>
                </div>
            </div>
            <div class="keys">
                <button class="space-key" id="space-key">Space</button>
            </div>
        </div>    
    `
    const inputType = localStorage.getItem('keyboardGamesInput');
    if (inputType === 'touch'){
        $('body').append(mobileControls);

        bindTouchKey('arrow-up', 'ArrowUp');
        bindTouchKey('arrow-down', 'ArrowDown');
        bindTouchKey('arrow-left', 'ArrowLeft');
        bindTouchKey('arrow-right', 'ArrowRight');
    }
}

function setSkin() {
    let skin = localStorage.getItem('keyboardGameSkin') || null;
    if(!skin) {
        localStorage.setItem('keyboardGameSkin', defaultSkin);
        skin = defaultSkin;
    }
    $dot.replaceWith(skin);
    $dot = $('#dot');
}

function getDotPosition() {
    return {top: parseInt($dot.css('top')), left: parseInt($dot.css('left'))};
}

function handleMovement() {
    let dotPosition = getDotPosition();
    if (pressedKeys['ArrowUp']) {
        if (dotPosition.top > dotHeight) {
            $dot.css('top', dotPosition.top - 10 + 'px');
        }
    }
    if (pressedKeys['ArrowDown']) {
        if (dotPosition.top < window.innerHeight - dotHeight) {
            $dot.css('top', dotPosition.top + 10 + 'px');
        }
    }
    if (pressedKeys['ArrowLeft']) {
        if (dotPosition.left > dotWidth) {
            $dot.css('left', dotPosition.left - 10 + 'px');
        }
    }
    if (pressedKeys['ArrowRight']) {
        if (dotPosition.left < window.innerWidth - dotWidth) {
            $dot.css('left', dotPosition.left + 10 + 'px');
        }
    }
    animationFrame = requestAnimationFrame(handleMovement);
}


function mover(eventKey) {
    if (!pressedKeys[eventKey]) {
        pressedKeys[eventKey] = true;
    }

    // Start movement loop if not already running
    if (!animationFrame) {
        animationFrame = requestAnimationFrame(handleMovement);
    }
}

function stopMovement(eventKey) {
    pressedKeys[eventKey] = false;

    // If no keys are pressed, stop the animation frame
    if (!Object.values(pressedKeys).some((value) => value)) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
    }
}

document.addEventListener('keydown', (event) => {
    mover(event.key);
});

document.addEventListener('keyup', (event) => {
    stopMovement(event.key);
});

function startTimer() {
    let timeLeft = GAME_DURATION;
    $('#time').text(timeLeft);
    const timer = setInterval(function() {
        timeLeft--;
        $('#time').text(timeLeft);
        if (timeLeft === 0) {
            clearInterval(timer);
            if (!enteredGameRoom) {
                console.log('Finshing game on client side');
                finishGame();
            } else {
                // socket listener handles finishing the game
                console.log('Finishing game on server side');
                // add a 3 second timer, if the server does not finish the game, finish it manually on client side
                return;
            }
        }
    }, 1000);
}

function setHighScore(score) {
    let highScores = JSON.parse(localStorage.getItem(storageName));
    const currentDate = new Date();
    const dateStr = currentDate.getMonth() + 1 + '/' + currentDate.getDate() + '/' + currentDate.getFullYear();
    let currentScore = {dateStr, score};
    if (!highScores){
        highScores = [currentScore];
        localStorage.setItem(storageName, JSON.stringify(highScores));
    } else {
        console.log(highScores);
        if ((highScores.length === 5 && highScores[4].score < score) || highScores.length < 5) {
            highScores.push(currentScore);
            highScores.sort((a, b) => b.score - a.score);
            highScores = highScores.slice(0, 5);
            console.log(highScores);
            localStorage.setItem(storageName, JSON.stringify(highScores));
        }
    }
    const highScoreList = $('#high-score-offline ol');
    let currentAdded = false;
    highScores.forEach(function(item) {
        let styling = '';
        if (item.score === score && item.dateStr === dateStr && !currentAdded) {
            styling = 'style="color: white; font-weight: bold;"';
            currentAdded = true;
        }
        highScoreList.append(`<li ${styling}>${item.score} (${item.dateStr})</li>`);
    });
    $('#high-score-offline').css('display', 'flex');
}


function dotEnteredCircle($circle, extra_actions) {
    console.log('Dot entered this circle!');
    if ($circle.data('pointAdded') === 'true') {
        return;
    }
    $circle.data('pointAdded', 'true');
    if (enteredGameRoom) {
        addPointToServer();
    }
    let currentScore = parseInt($('#score').text());
    $('#score').text(currentScore + 1);
    $('#final-score').text(currentScore + 1);
    // Perform a specific action for this circle
    circleDone($circle, true, extra_actions);
}

function resetPointListInDB() {
    const dbRequest = indexedDB.open('KeyboardGamesDB', dbVersion);

    dbRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
    
        // Check if the object store exists
        if (!db.objectStoreNames.contains('points')) {
            db.createObjectStore('points', { keyPath: 'point_token' });
            console.log('Created "points" object store in IndexedDB.');
        }
    };

    dbRequest.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction('points', 'readwrite');
        const store = transaction.objectStore('points');

        // Clear the existing point list
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => {
            console.log('Point list reset in IndexedDB.');
        };
        clearRequest.onerror = () => {
            console.error('Failed to reset point list in IndexedDB.');
        };
    };

    dbRequest.onerror = (event) => {
        console.error('Failed to open IndexedDB:', event.target.error);
    };
}


function startGame({intervalFunction}) {
    console.log('Starting game!');
    let countDown = 3;
    $('#instructions').css('display', 'none');
    $('#starting').css('display', 'flex');
    const countdownInterval = setInterval(async function() {
        if (countDown > 0) {
            $(`#startCount`).css('color', '#2e2e2e');
            $(`#startCount`).text(countDown);
            countDown--;
        } else {
            clearInterval(countdownInterval);
            $('#starting').css('display', 'none');
            $('#score-card').css('display', 'flex');
            intervalFunction.function(intervalFunction.inputs);
            if (intervalFunction.interval) {
                circleInterval = setInterval(function() {
                    intervalFunction.function(intervalFunction.inputs);
                }, intervalFunction.interval);
            }
            startTimer();
            if (loggedIn && enteredGameRoom) {
                const session_jwt = await getSessionJWT();
                if(session_jwt) {
                    console.log(`UserId starting game`);
                    startGameServer(session_jwt);
                    return;
                }
            }
            console.log('Starting game without server');
            enteredGameRoom = false;
            loggedIn = false;
        }
    }, 1000);
}

function checkDotInsideCircle(event, $circle) {
    if (event) {
        event.stopPropagation();
    }
    const circleRect = $circle.get(0).getBoundingClientRect();
    const radius = circleRect.width / 2;
    const centerX = circleRect.left + radius;
    const centerY = circleRect.top + radius;

    const dotRect = $dot.get(0).getBoundingClientRect();
    const dotCenterX = dotRect.left + dotRect.width / 2;
    const dotCenterY = dotRect.top + dotRect.height / 2;

    const distance = Math.sqrt(
        Math.pow(dotCenterX - centerX, 2) +
        Math.pow(dotCenterY - centerY, 2)
    );

    if (distance <= radius) {
        dotEnteredCircle($circle);
    }
}
    

async function startLoadingScreen() {
    $('#loading-screen').css('display', 'flex');
    let loadingCount = 1;
    loadingInterval = setInterval(function() {
        if (loadingCount > 3) {
            $('.loading-dot').css('color', 'transparent');
            loadingCount = 1;
        } else {
            $(`#loading-dot${loadingCount}`).css('color', 'white');
            loadingCount++;
        }
    }, 1000);
}

function clearLoadingScreen() {
    clearInterval(loadingInterval);
    $('#loading-screen').css('display', 'none');
}

async function getFinalPointListFromDB() {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('KeyboardGamesDB', dbVersion);

        dbRequest.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction('points', 'readonly');
            const store = transaction.objectStore('points');

            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                resolve(getAllRequest.result); // Returns the list of points
            };

            getAllRequest.onerror = (error) => {
                reject(error); // Handles any errors during retrieval
            };
        };

        dbRequest.onerror = (event) => {
            reject(event.target.error); // Handles errors opening the database
        };
    });
}

function finishGame() {
    if (circleInterval) { clearInterval(circleInterval); }
    $('#dot').css('display', 'none');
    clearCircles();
    $('#timer').css('display', 'none');
    setHighScore(parseInt($('#score').text()));
    $('#game-over').css('display', 'flex');
    $('#restart').on('click', function() {
        window.location.reload();
    });
}

function circleDone($circle, hit) {
    if ($circle.data('done') === 'true') {
        return;
    }
    $circle.data('done', 'true');
    const color = hit ? 'green' : 'red';
    const text = hit ? 'HIT!' : 'MISS!';
    resetCircle($circle, hit);
    $circle.css('borderColor', color); 
    $circle.css('color', color);
    $circle.css('backgroundColor', 'white');
    $circle.text(text);
    if (!hit) { $circle.css('fontSize', '1.1rem'); }
    setTimeout(function() {
        clearCircle($circle);
    }, 500);
}

function clone_circle_base() {
    const $circleTemplate = $('#circle-template');
    const $circle = $circleTemplate.clone(true);
    // apply a random position on the screen
    $circle.css('left', Math.floor(Math.random() * window.innerWidth) + 'px');
    $circle.css('top', Math.floor(Math.random() * window.innerHeight) + 'px');
    // display the circle
    $circle.css('display', 'flex');
    $circle.data('pointAdded', 'false');
    $circle.data('done', 'false');
    $circle.appendTo('body');
    return $circle;
}

function clone_circle({timeout, extra_actions}) {
    const $circle = clone_circle_base();
    if (extra_actions) {
        extra_actions($circle);
    }
    const $spaceKey = $('#space-key');
    if($spaceKey.get(0)) {
        $spaceKey.on('touchstart', function() {
            if ($circle.get(0) && $circle.data('done') !== 'true') {
                checkDotInsideCircle('', $circle);
            }
        });
    }
    
    document.addEventListener('keydown', function(event) {
        event.stopPropagation();
        if (event.key === ' ' && $circle.get(0) && $circle.data('done') !== 'true') {
            checkDotInsideCircle(event, $circle);
        }
    });

    // Automatically remove the circle
    setTimeout(function () {;
        if ($circle.data('done') !== 'true') {
            circleDone($circle, false);
        }
    }, timeout);
}