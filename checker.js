const text = document.getElementById("txtInput");
const entry = document.getElementById("Entry");
const spellCheck = document.getElementById("SpellCheck")
const nWSC = document.getElementById("Non-WhiteSpace Characters");
const whiteSpace = document.getElementById("White Spaces");
const wordCount = document.getElementById("Word Count");


function get(){
    let count = 0; //let for variable
    const input = text.value;
    for(let i = 0; i < input.length; i++){
        if(input.charAt(i).match(/^[^\s]$/)){ //correct match and regex
            count++;
        }
    }
    return count;
}

function checkRepeated(){
    const input = text.value;
    const words = input.split(" ");
    const err = []

    for(let i = 0; i < words.length; i++){
        if(words[i].match(/(.)\1{2,}/)){
            err.push(words[i]);;
        }
    }
    if(err.length == 0){
        return "NONE"
    }
    return err;
}

function getLetter(){
    const dict = new Map();
    const input = text.value;
    for(let i = 0; i < input.length; i++){
        if(input.charAt(i).match(/^[^]$/) && !(dict.has(input.charAt(i)))){
            dict.set(input.charAt(i), 1)
        }
        else if(input.charAt(i).match(/^[^]$/) && dict.has(input.charAt(i))){
            dict.set(input.charAt(i), dict.get(input.charAt(i)) + 1)
        }
    }
    return dict;
}

function countWords(){
    const input = text.value;
    let wordCount = 0;
    let whiteSpace = 0;

    if(input.length = 0)
        return wordCount;
    
    let isItIn = 0;
    for(let i = 0; i < input.length; i++){
        if(input.charAt(i) === "\\"){
            i++;
            continue;
        }
        if(input.charAt(i).match(/^[A-Za-z0-9]$/) && !isItIn){
            wordCount++;
            isItIn = 1;
        }
        else if(input.charAt(i).match(/^[\s]+$/)){ //if you see a space and there is no word character
            whiteSpace++;
            isItIn = 0;
        }
    }

    return [whiteSpace, wordCount];
}

text.addEventListener("keypress", function (event) {
    const table = document.getElementById('charInst');

    if (event.keyCode == 13) {
        let count = get();
        let dict = getLetter();
        let wrdCount = countWords();
        let misspelled = checkRepeated();
        event.preventDefault();

        while(table.rows.length > 1){
            table.deleteRow(-1);
        }

        entry.style.display = "block";
        spellCheck.style.display = "block"
        nWSC.style.display = "block";
        whiteSpace.style.display = "block";
        wordCount.style.display = "block";
        table.style.display = "table";

        entry.textContent = "You Entered: " + text.value;
        if(misspelled != "NONE"){
            alert("Too many repeated letters, may be wrong: " + misspelled);
        }
        nWSC.textContent = "Number of non-white space characters: " + count;
        whiteSpace.textContent = "White Spaces: " + wrdCount[0];
        wordCount.textContent = " Word Count: " + wrdCount[1];
        //+ "SpellChecked: " + corrected let corrected = spellCheck();
        
        for(let [key, value] of dict.entries()){

            const newRow = table.insertRow();
            const keyCell = newRow.insertCell();
            const valCell = newRow.insertCell();
            keyCell.textContent = key;
            valCell.textContent = value;

            console.log("Count:" + count + " Key: " + key + "\n Value: " + value + "\n White Spaces and Word Count: " + wrdCount);
        }
     }
});