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
            // console.log('noteArray0: ', noteArray[0]);
            // console.log('noteArray1: ', noteArray[1]);

            AnimateBalls();
            perfectHit = true;
            score++;
            scoreArray.push(score); 

            // console.log('scoreArray: ', scoreArray);
            scoreh2.innerHTML = score;


            // if (noteArray[0] === noteArray[1])
            

    } else {
        let testing = new Promise((resolve, reject) => {
            perfectHit = false;
            score = -1;
            scoreh2.innerHTML = score+1;
            if (!perfectHit) {
                resolve("YEY")
            }

        })
        // perfectHit = false;
        // score = -1;
        // scoreh2.innerHTML = score+1;

        testing.then(()=> {
            if (scoreArray.length > 0) {
                highScoreArray.push(scoreArray[scoreArray.length-1])
                console.log('highScoreArray: ', highScoreArray);
                console.log("MAX: " + Math.max(...highScoreArray));

                highScoreValue = Math.max(...highScoreArray); 

                highScore.innerHTML = highScoreValue; 

                // console.log('scoreArray: ', scoreArray[scoreArray.length-1]);

            }

            // highScoreArray.push(scoreArray[scoreArray.length-1])
            // console.log('highScoreArray: ', highScoreArray);
        }).then(()=> { 
            scoreArray = [] 
            // console.log("MAX: " + Math.max(highScoreArray));
        })

        // highScoreArray.push(Math.max(...scoreArray))
        // // console.log('highScoreArray: ', highScoreArray);
        // scoreArray = []; 

    }

    console.log(perfectHit)

}, 100);




