// Definitions

const b1 = document.querySelector("#b1");
const b2 = document.querySelector("#b2");
const ball = document.querySelector("#ball");
const playground = document.querySelector("#playground");
const reset_button = document.querySelector("#reset_button");
const Main_Menu = document.querySelector("#Mainmenu");
const Menu_button = document.querySelector("#Menu_button");
const text_Pause_Menu = document.querySelector("#text_Pause_Menu");
const Pause_Menu = document.querySelector("#Pause_Menu");
const ScoreFrame = document.querySelector("#ScoreFrame");
const Score1 = document.querySelector("#Punctuation1");
const Score2 = document.querySelector("#Punctuation2");
const Start_button = document.querySelector("#Start_button");
const Back_Main_Menu = document.querySelector("#Back_Main_Menu");



Velocity =5;

//Positions
ball_initial_top= 400;
ball_initial_left= 800;
console.log(ball_initial_top,ball_initial_left);



// Functions 

function Menu_hidding(){
    Main_Menu.style.display="none";
    StartGame(Velocity);
    playground.style.display="flex";
    ScoreFrame.style.display="flex";

}

function back_to_Menu(){
    Main_Menu.style.display="block";
    playground.style.display="none";
    ScoreFrame.style.display="none";
    Pause_Menu.style.display="none";
}


function gameover(){
    LC = 0;
    TC = 0;
    playground.style.border ="10px solid red";
    playground.style.background="rgb(62, 14, 14)";

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
    playground.style.background= "rgb(7, 42, 7)";
    ball_position_top_variable = ball_initial_top;
    ball_position_left_variable = ball_initial_left;
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
        angle = GenerateAngleInitial(110,250);
    }
    if(Field_Side == "right"){
        angle = GenerateAngleInitial(-70,70);
    }
    ball_position_top_variable = ball_initial_top;
    ball_position_left_variable = ball_initial_left;
    playground.style.border ="10px solid green";
    V = Velocity
    ix = V * Math.cos(((angle*Math.PI)/180));
    iy = V * Math.sin(((angle*Math.PI)/180));
    TC = iy;
    LC = ix;
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
ball_position_top_variable = ball.offsetTop;
ball_position_left_variable = ball.offsetLeft;
b2_position_top = b2.offsetTop-playground.offsetTop;


function startBallMovement() {
        clearInterval(intervalId); 
        intervalId = setInterval(() => {
        
    
        ball_position_left = ball.offsetLeft + LC;
        ball_position_left_normalizated = ball_position_left- playground.offsetLeft;
        ball_position_top_variable_normalizated = ball_position_top_variable - playground.offsetTop;

        ball.style.top = (ball_position_top_variable+TC)+"px";
        ball_position_top_variable += TC;
        ball.style.left = (ball_position_left_variable + LC) + "px";
        ball_position_left_variable += LC;

        b2_position_center= b2_position_top+70;
        if (ball.offsetTop >= (b2.offsetTop+70)){
            if ((b2_position_top+140) <= 790){ 
            b2_position_top += V * 0.6;
            }
        }else{
            if (b2_position_top >= 10){
            b2_position_top -= V * 0.6;
            }
        }
        b2.style.top = b2_position_top+ "px";


        if (ball.offsetTop >= playground.offsetTop+800) {
            if (iy > 0) {
                TC = -iy;
            } else {
                TC = iy;
            }
        }
        if (ball.offsetTop <= playground.offsetTop+10) {
            TC = Math.abs(iy);
          }

        
        if (ball_position_left_normalizated > 1600){
            reset(Velocity,"right");
            addpoint1();
        }
        if (ball_position_left_normalizated < 0) {
           reset(Velocity,"left");
           addpoint2();
        }
           
        
        if (ball.offsetLeft <= (b1.offsetLeft + 6) && ball.offsetLeft>=b1.offsetLeft) {
            if (ball.offsetTop > b1.offsetTop && ball.offsetTop < (b1.offsetTop + 140)) {
                V += 1;
                ball_position_top_normalizated = ball.offsetTop - b1.offsetTop;
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
        if (ball.offsetLeft >= (b2.offsetLeft-10) && ball.offsetLeft < b2.offsetLeft) {
            if (ball.offsetTop > b2.offsetTop && ball.offsetTop < (b2.offsetTop + 140)) {
                V += 1;
                ball_position_top_normalizated = ball.offsetTop - b2.offsetTop;
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
            
    }, 1000 / 60.0);
    return intervalId;
}

// Listeners 

window.addEventListener("mousemove", (ev)=>{
    let cursorGameY = ev.clientY - playground.offsetTop;
    if (cursorGameY >70 && cursorGameY < 730){ 
    if(!pause_condition==true){
      b1.style.top = ( ev.clientY - playground.offsetTop -70)+ "px";
}     
}});
reset_button.addEventListener('click', e => { 
    StartGame(Velocity);
});
Menu_button.addEventListener('click', e => { 
    text_Pause_Menu.innerText = "MENU";
    Menu();
});
Start_button.addEventListener('click', e => { 
    console.log("PRESSED")
    Menu_hidding();
});

Back_Main_Menu.addEventListener('click', e => { 
    console.log("PRESSED")
    back_to_Menu();
});

// Start
//StartGame(Velocity);



