const num1 = document.querySelector("#num1");
const num2 = document.querySelector("#num2");
const op = document.querySelector("#op");
const num = document.querySelectorAll(".num");
const opp = document.querySelectorAll(".opp");
const cl = document.querySelector("#clear");
const eq = document.querySelector("#eq");
const dell = document.querySelector("#dell");
const point = document.querySelector("#point");
const sign = document.querySelector("#sign");
let mark = false;

for (n of num) {
    n.addEventListener('click', function () {
        if (!mark) {
            if (op.textContent === "") {
                if (num1.textContent === '0' && this.textContent === '0') {
                    num1.textContent = num1.textContent;
                } else {
                    if (num1.textContent === '0') {
                        num1.textContent = this.textContent;
                    } else {
                        num1.textContent += this.textContent;
                    }

                }
            }
            if (op.textContent !== "") {
                if (num2.textContent === '0') {
                    num2.textContent = this.textContent;
                } else {
                    num2.textContent += this.textContent;
                }
            }
        } else {
            if (op.textContent === '') {
                num1.textContent = this.textContent;
                mark = false;
            } else {
                if (num2.textContent === '0') {
                    num2.textContent = this.textContent;
                } else {
                    num2.textContent += this.textContent;
                }
            }

        }



    })
}

cl.addEventListener("click", clear);


for (o of opp) {
    o.addEventListener('click', function () {
        op.textContent = this.textContent;
    })
}


eq.addEventListener("click", () => {
    if(num1.textContent !== "" && num2.textContent !== ""){
    let p1 = parseFloat(num1.textContent);
    let p2 = parseFloat(num2.textContent);
    let p3 = op.textContent;
    clear();
    num1.textContent = cal(p1, p2, p3);;
    mark = true;
    }
});

function clear() {
    num1.textContent = '0';
    num2.textContent = '';
    op.textContent = '';
    mark = false;
}

dell.addEventListener("click", () => {
    if(num2.textContent === "" && op.textContent === "" ){
    num1.textContent = num1.textContent.slice(0,-1);
    if(num1.textContent === ""){
        clear();
    }
    }else if (op.textContent !== "" && num2.textContent === ""){
        op.textContent = '';
    }else{
        num2.textContent = num2.textContent.slice(0,-1);
    }
    
})

point.addEventListener("click", () => {
    if(num2.textContent !== ''){
        num2.textContent += '.';
    }else if(num1.textContent !== ''){
        num1.textContent += '.';
    }
})


sign.addEventListener("click", () => {

    if(num2.textContent !== ''){
      if(parseFloat(num2.textContent) > 0 ){
        num2.textContent = `${parseFloat(-num2.textContent)}`;
      }else{
        num2.textContent = Math.abs(parseFloat(num2.textContent));
      }
    }else if(num1.textContent !== ''){
        if(parseFloat(num1.textContent) > 0 ){
            num1.textContent = `${parseFloat(-num1.textContent)}`;
          }else{
            num1.textContent = Math.abs(parseFloat(num1.textContent));
          }
    }
})


function cal(num1, num2, op) {
    let result;

    switch (op) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '÷':
            if (num2 !== 0) {
                result = num1 / num2;
            } else {
                result ='cannot divide by zero';
            }
            break;
        case '×':
            result = num1 * num2;
            break;
        case '%':
            result = num1 % num2;
            break;
    }

    return result;


}