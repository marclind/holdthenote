let noteArray = []; 
let currentNote; ; 

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
        console.log("WINWINWIN")
    } else {
        console.log("YOU SUCK")
    }

    console.log("/////")


}, 100);





