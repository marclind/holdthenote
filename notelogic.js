let scoreh2 = document.querySelector('.score')

let noteArray = []; 
let currentNote;
let perfectHit = false;
let score = -1;

setInterval(() => {
    noteArray.push(note); 

    currentNote = note; 

    if (noteArray.length > 2) {
        noteArray.shift(); 
    }
    if ((currentNote === noteArray[0] 
        || currentNote === noteArray[0]-1
        || currentNote === noteArray[0]+1
        ) 
        && currentNote != 0 ) {
            AnimateBalls();
            perfectHit = true;
            score++;
            scoreh2.innerHTML = score;
            

    } else {
        perfectHit = false;
        score = -1;
    }

    console.log(perfectHit)

}, 100);




