let scoreh2 = document.querySelector('.score'); 
let highScore = document.querySelector('.highScore'); 

let noteArray = []; 
let currentNote;
let perfectHit = false;
let score = -1;
let scoreArray = []; 
let highScoreArray = []; 
let highScoreValue; 

// for every 0.1 seconds, check note 
setInterval(() => {
    noteArray.push(note); 
    currentNote = note; 

    if (noteArray.length > 2) {
        noteArray.shift(); 
    }

    if ((currentNote === noteArray[0] 
        || currentNote === noteArray[0]-1
        || currentNote === noteArray[0]+1) 
        && currentNote > 0 ) {
            perfectHit = true;
            score++;
            scoreArray.push(score); 
            scoreh2.innerHTML = score;  
            requestAnimationFrame(animate); 
            AnimateBalls();
            // animate(); 
         
    } else {
        let testing = new Promise((resolve, reject) => {
            perfectHit = false;
            score = -1;
            scoreh2.innerHTML = score+1;
            stopAnimation(); 
            if (!perfectHit) {
                resolve("YEY")
            }
        }); 
        testing.then(()=> {
            if (scoreArray.length > 0) {
                highScoreArray.push(scoreArray[scoreArray.length-1])
                // console.log('highScoreArray: ', highScoreArray);
                // console.log("MAX: " + Math.max(...highScoreArray));
                highScoreValue = Math.max(...highScoreArray); 
                highScore.innerHTML = highScoreValue; 
            }
        }).then(()=> { 
            scoreArray = [] 
        })
    }
    // console.log(perfectHit)
}, 5);




