//CONST & Refs
const BORDERS = [
    "light-top",
    "light-right",
    "light-bottom",
    "light-left"
];

const MAXFIGURE = 1048575;
const seedInput = document.getElementById("seed");
const toggleButton = document.getElementById("toggle");
const inputPanel = document.getElementById("inputPanel");
const context = document.getElementById("container");
let show = false;


//GENERATION functions
function generate(input) {
    console.info(input);
    const binary = input.toString(2).padStart(20, '0');
    console.info(binary);

    let circle = -1;
    for (let i = 0; i < 20; i++) {
        let borderId = i % 4;

        const bit = binary[i];
        if (borderId === 0) circle++;


        if (bit === '1') {
            let query = "";
            if (circle === 0) {
                query = ".big.circle";
                borderId = i;
            }
            else {
                query = ".small.circle";
                switch (circle) {
                    case 0: query += ".top.left"; break;
                    case 1: query += ".top.right"; break;
                    case 2: query += ".bottom.right"; break;
                    case 3: query += ".bottom.left"; break;
                }
            }

            const element = document.querySelector(query);
            const border = BORDERS[borderId];
            element.classList.add(border);
        }
    }
}

const circles = document.getElementsByClassName('circle');
function reset() {
    for (const circle of circles) {
        circle.classList.remove(...BORDERS);
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function update(seed) {
    reset();
    generate(seed);
    seedInput.value = seed;
}

//GUI functions
context.addEventListener("click", e => {
    e.preventDefault();
    let seed = getRandomIntInclusive(1, MAXFIGURE);
    update(seed);
});
seedInput.addEventListener("change", e => {
    e.preventDefault();
    let seed = parseInt( seedInput.value,10);
    if(seed > MAXFIGURE) seed = MAXFIGURE;
    update(seed);
})

toggleButton.addEventListener("click", e => {
    e.preventDefault();

    show = !show;

    if (show) {
        inputPanel.style.display = "none";
    }
    else {
        inputPanel.style.display = "block";

    }
});

//0-20
//0000 0000 0000 0000 0001
//clockwise with top/right as 0
//parseInt("11011",2); ==> 27
//(24 >>> 0).toString(2); => '11000';

// 1 get number to binary with offset
//const input = parseInt('11110000000000000011',2);

//INIT
const input = parseInt('11010000000011100000', 2);
const randomInput = getRandomIntInclusive(1, MAXFIGURE);

generate(input);
seedInput.value = input;

