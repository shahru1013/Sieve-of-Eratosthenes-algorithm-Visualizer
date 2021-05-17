/* Clone the board */
let gridBox = document.getElementById('a');
let board = document.getElementById('m-board');
let row = 0,col = 0;
for (let i = 1; i <= 100; i++) {
    let cln = gridBox.cloneNode(true);
    cln.id = i;
    board.appendChild(cln);
    col++;
}

// start button clicked

const startClicked = () => {
    let value = document.getElementById('val');
    let val = parseInt(value.value);
    if(val<=100){
    let numbers = [];
    for (let i = 2; i <= val; i++) {
        numbers.push(i);
    }

    let tempStr = new Array(parseInt(val)).fill(true); //initialize the bool type array
    boxAnimate(val, 1, numbers, tempStr);
}
else{
    alert('Input Must Be Less Than 101!')
}
    
}

// box animate 
const boxAnimate = (val, cnt, numbers, tempStr) => {

    if (cnt <= val - 1) {
        setTimeout(() => {
            let box = document.getElementById(cnt);
            box.style.backgroundColor = "#B3B6B7"
            box.innerHTML = cnt + 1;
            cnt = cnt + 1;
            boxAnimate(val, cnt, numbers, tempStr);
        }, 40);

    } else {
        setTimeout(() => {
            startAlgo(val, numbers, tempStr, 0);
        }, 100);

    }
}

// start the algorithm and animate boxes move

function startAlgo(val, numbers, tempStr, x) {
    let presentVal = numbers[x];
    //console.log(x +' x');
    if (tempStr[x] == true && x <= val - 2) {
        toastMessage(x+2,val);
        result(val,x);
        let xx = document.getElementById(x + 1);
        xx.style.backgroundColor = "#7FB3D5";
        xx.style.marginTop = "-5px";
        // xx.style.transform="scale(1.1)";
        xx.style.animation = "boxanimate 0.7s"
        xx.style.borderRadius = "10px"
        xx.style.fontSize = "22px"
        xx.style.boxShadow = "0px 2px 10px 0px #F5CBA7"
        startBlockMultiple(val, presentVal, numbers, tempStr, numbers[x] * 2, x);
    } else {
        if (x < val) {
            setTimeout(() => {
                startAlgo(val, numbers, tempStr, x + 1);
            }, 100);
        }
    }

}

let counter = 0;
const startBlockMultiple = (val, presentVal, numbers, tempStr, x, index) => {

    setTimeout(() => {

        if (x <= numbers[val - 2]) {

            let xx = document.getElementById(x - 1);
            xx.style.backgroundColor = "transparent";
            xx.classList.remove("cross");

            setTimeout(() => {
                xx.style.backgroundColor = "red";
                xx.classList.add("cross");
                xx.style.borderRadius = "4px";
                tempStr[x - 2] = false;
                console.log(x - 1);
                x += numbers[index];
                startBlockMultiple(val, presentVal, numbers, tempStr, x, index)
            }, 0);
        } else {
            counter++;
            if (counter == val - 1) {
                console.log(tempStr)
            }
            if (index < val - 1) {
                setTimeout(() => {
                    startAlgo(val, numbers, tempStr, index + 1);
                }, 500);

            }
        }
    }, 1000);
}


// start a action

const restart=()=>{
    location.reload();
}


const result=(val,txt)=>{
    // result section
let resbox = document.getElementById('res-box');
let resdiv = document.getElementById('result');
let resText = document.getElementById('r-txt');
resText.innerHTML="Prime Numbers Up To "+val+": ";

    let cl = resbox.cloneNode(true);
    cl.id="bla-bla-bla"
    cl.innerHTML=txt+2;
    resdiv.appendChild(cl);

}

// Toast Message

function toastMessage(val,upTo) {
    var x = document.getElementById("snackbar");
    x.innerHTML="Find all multiples of : "+val+" less than or equal "+upTo+" and mark them as not Prime";
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1500);
}