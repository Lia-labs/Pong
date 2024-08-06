// Definitions

const b1 = document.querySelector("#b1");
const b2 = document.querySelector("#b2");
const ball = document.querySelector("#ball");
const playground = document.querySelector("#playground");
const reset_button = document.querySelector("#reset_button");
const Menu_button = document.querySelector("#Menu_button");
const text_Pause_Menu = document.querySelector("#text_Pause_Menu");
const Pause_Menu = document.querySelector("#Pause_Menu");
const Score1 = document.querySelector("#Punctuation1");
const Score2 = document.querySelector("#Punctuation2");

Velocity =5;

//Positions
ball_initial_top= playground.offsetHeight/2;
ball_initial_left= playground.offsetWidth/2;
console.log(ball.offsetTop,ball.offsetLeft);



// Functions 

function gameover(){
    LC = 0;
    TC = 0;
    playground.style.border ="10px solid red";

};

function StartGame(Velocity){
    pause_condition=false;
    Pause_Menu.style.display="none";
    PScore1 = 0;
    Score1.innerText = PScore1;
    PScore2 = 0;
    Score2.innerText = PScore2;
    V = Velocity
    angle = GenerateAngleInitial(0,360);
    ix = V * Math.cos(((angle*Math.PI)/180));
    iy = V * Math.sin(((angle*Math.PI)/180));
    TC = iy;
    LC = ix;
    ball.style.top = ball_initial_top+"px";
    ball.style.left = ball_initial_left+"px";
    playground.style.border ="10px solid green";
    startBallMovement();
};

pause_condition=false;
function Menu(){
if (pause_condition == false ){
    clearInterval(intervalId);
    Pause_Menu.style.display="block";
    pause_condition=true;
}else{
    startBallMovement();
    pause_condition=false;
    Pause_Menu.style.display="none";

}

};

function reset(Velocity,Field_Side){
    if(Field_Side == "left"){
        ball.style.top = ball_initial_top+"px";
        ball.style.left = (ball_initial_left-200)+"px";
        angle = GenerateAngleInitial(110,250);
    }
    if(Field_Side == "right"){
        ball.style.top = ball_initial_top+"px";
        ball.style.left = (ball_initial_left+200)+"px";
        angle = GenerateAngleInitial(-70,70);
    }
    
    playground.style.border ="10px solid green";
    V = Velocity
    ix = V * Math.cos(((angle*Math.PI)/180));
    iy = V * Math.sin(((angle*Math.PI)/180));
    TC = iy;
    LC = ix;
    playground.style.border ="10px solid green";
    startBallMovement();
};


function GenerateAngleInitial(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    while (true){
        angle =  Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
        if (!(angle > 225 && angle < 315)){
            if (!(angle > 45 && angle < 135)){
                return angle
            }
        }
    }
};


function addpoint1(){
    PScore1 +=1 ;
    Score1.innerText = PScore1;
};
function addpoint2(){
    PScore2 +=1 ;
    Score2.innerText = PScore2;
};

let intervalId;

function startBallMovement() {
        clearInterval(intervalId); 
        intervalId = setInterval(() => {
        console.log(TC,LC);
        ball_position_top = ball.offsetTop + TC;
        ball_position_left = ball.offsetLeft + LC;
        ball_position_left_normalizated = ball_position_left- playground.offsetLeft;
        //ball.style.top = ball_position_top + "px";
        ball.style.left = ball_position_left + "px";

        console.log(TC,LC,ball.offsetTop,ball_position_top,ball.style.top,ball_position_left ,ball.style.left );

        b2_position_top = b2.offsetTop;
        b2_position_center= b2_position_top+70;
        if (ball_position_top >= b2_position_center){
            if ((b2_position_top+140) <= playground.offsetHeight-10){ 
            b2_position_top = V * 0.6;
            }
        }else{
            if (b2_position_top >=20){
            b2_position_top = V * 0.6;
            }
        }
        b2.style.top = b2_position_top+ "px";

        if (ball_position_top >= (playground.offsetTop+800)) {
            if (iy > 0) {
                TC = -iy;
            } else {
                TC = iy;
            }
        }
        if (ball_position_top <= (playground.offsetTop+10)) {
            TC = Math.abs(iy);
          }
        
        console.log(ball_position_left,playground.offsetLeft,playground.offsetLeft+1600);
        if (ball_position_left_normalizated >= 1600){
            addpoint1();
            //reset(Velocity,"right");
        }
        if (ball_position_left_normalizated <= 0) {
            addpoint2();
           //reset(Velocity,"left");
        }
        /*
        if (ball_position_left <= (b1.offsetLeft + 6)) {
            if (ball_position_top > b1.offsetTop && ball_position_top < (b1.offsetTop + 140)) {
                V += 1;
                ball_position_top_normalizated = ball_position_top - b1.offsetTop;
                if (ball_position_top_normalizated <= 70) {
                    Angle_Calculated = (5 / 7) * ball_position_top_normalizated - 70;
                } else {
                    Angle_Calculated = (5 / 7) * ball_position_top_normalizated - 30;
                }
                iy = V * Math.sin((Angle_Calculated * Math.PI) / 180);
                ix = V * Math.cos((Angle_Calculated * Math.PI) / 180);
                TC = iy;
                LC = ix;
            }
        }
        if (ball_position_left >= (b2.offsetLeft-10)) {
            if (ball_position_top > b2.offsetTop && ball_position_top < (b2.offsetTop + 140)) {
                V += 1;
                ball_position_top_normalizated = ball_position_top - b2.offsetTop;
                if (ball_position_top_normalizated <= 70) {
                    Angle_Calculated = -(5 / 7) * ball_position_top_normalizated + 250;
                } else {
                    Angle_Calculated = -(1 / 2) * ball_position_top_normalizated +195;
                }
                iy = V * Math.sin((Angle_Calculated * Math.PI) / 180);
                ix = V * Math.cos((Angle_Calculated * Math.PI) / 180);
                TC = iy;
                LC = ix;
            }
        }
            */
/*
        if (PScore2 >=7 ||  PScore1 >=7){
            gameover();
            clearInterval(intervalId); 
            if (PScore1 >=7){
                text_Pause_Menu.innerText = "Player 1 Won!";
            }
            if (PScore2 >=7){
                text_Pause_Menu.innerText = "Player 2 Won!";
            }
            Menu()
            return;
        }
            */
    }, 1000 / 60.0);
    return intervalId;
}

// Listeners 

window.addEventListener("mousemove", (ev)=>{
    //console.log(ev.clientX,ev.clientX-70,"\\",ev.clientY,ev.clientY+70);
    let cursorGameY = ev.clientY - playground.offsetTop;
    if (cursorGameY >70 && cursorGameY < 730){
        b1.style.top = ( ev.clientY - playground.offsetTop -70)+ "px";
        /*
    if(!pause_condition==true){
      b1.style.top = (ev.clientY -70)+ "px";
}
*/      
}});
reset_button.addEventListener('click', e => { 
    StartGame(Velocity);
});
Menu_button.addEventListener('click', e => { 
    text_Pause_Menu.innerText = "MENU";
    Menu();
});


// Start
//StartGame(Velocity);
//console.log(playground.offsetTop,playground.offsetLeft);



