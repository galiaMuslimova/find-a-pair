setUp();

var clickedArray = [];
var ready = true;
var numCompleted = 0;

function randomAnswers() {
    var answers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];

    answers.sort(function (item) {
        return 0.6 - Math.random();
    })
    return answers;
}

function reveal(cell) {
    var newUrl = 'images/' + cell.value + '.png';
    cell.style.backgroundImage = "url('" + newUrl + " ')";
    cell.clicked = true;
}

function hide(cell) {
    cell.style.backgroundImage = "url('images/bg.jpg')";
    cell.style.transitionDuration = "0s";
    cell.clicked = false;
}

function complete(cell) {
    numCompleted++;
    cell.completed = true;
}

function setUp() {
    var grid = document.getElementsByTagName("td");
    var answers = randomAnswers();

    for (var i = 0; i < grid.length; i++) {
        var cell = grid[i];
        cell.completed = false;
        cell.clicked = false;
        cell.value = answers[i];

        cell.addEventListener('click', function () {
            if (this.clicked == false && this.completed == false) {
                clickedArray.push(this);
                reveal(this);
            }
            if (clickedArray.length == 2) {
                if (clickedArray[0].value == clickedArray[1].value) {
                    complete(clickedArray[0]);
                    complete(clickedArray[1]);
                    clickedArray = [];
                    if (numCompleted == 12) {
                        var winMessage = document.getElementById("winMessage");
                        winMessage.removeAttribute("hidden");
                    }
                }
                else {
                    setTimeout(function () {
                        hide(clickedArray[0]);
                        hide(clickedArray[1]);
                        clickedArray = [];
                    }, 500);
                }
            }
        })
    }
    document.getElementById("restart").addEventListener('click', function(){
        location.reload();
    });
}