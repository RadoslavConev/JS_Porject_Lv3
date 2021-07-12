var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; //26
var input_split = [];
var input_split_default = [];
var input;
var mostFrequent = null;
var counts = { };
var indexOfMostCommon;
var inE;
var inT;
var inH;
var newText = [];
var allVariants = {};

function decode (e) {
	document.getElementById("input_form").addEventListener("click", function(event){
    	event.preventDefault() 
	});

	input = document.getElementById('txtinput').value;
	input_split_default = input.split('');
	input = input.toLowerCase();
	input_split = input.split('');
	let letters = {};

		//count letters
for( let i = 0; i < input_split.length; i++){
	var curLetter = input_split[i];
	if ( alphabet.indexOf(curLetter) > -1 ) {	
		if( letters[curLetter] ){
			letters[curLetter] ++
		} else {
			letters[curLetter] = 1;
		}
	}
}
		//most common letter
let max = 1;
let letter = '';
for (const [key, value] of Object.entries(letters)) {
  	if( value > max ){
  		max = value; letter = key;
  	}
}
		//displ`s
if ( ( 4 - alphabet.indexOf(letter) ) > 0 ){	
	inE = 4 - alphabet.indexOf(letter);
} else if ( ( 4 - alphabet.indexOf(letter) ) < 0 ){
	inE = 25 + ( 4 - alphabet.indexOf(letter) );
} else {
	inE = 0;
}

if ( ( 19 - alphabet.indexOf(letter) ) > 0 ){	
	inT = 19 - alphabet.indexOf(letter);
} else if ( ( 19 - alphabet.indexOf(letter) ) < 0 ){
	inT = 25 + ( 19 - alphabet.indexOf(letter) );
} else {
	inT = 0;
}

if ( ( 7 - alphabet.indexOf(letter) ) > 0 ){	
	inH = 7 - alphabet.indexOf(letter);
} else if ( ( 7 - alphabet.indexOf(letter) ) < 0 ){
	inH = 25 + ( 7 - alphabet.indexOf(letter) );
} else {
	inH = 0;
}
		//calc all variants
for (var l = 0; l < 26; l++) {
	let currStr = '';
	for (var b = 0; b < input_split.length; b++) {
		let currSymbol = input_split[b];
		if ( alphabet.indexOf(currSymbol) > -1 ) {
			if ( ( alphabet.indexOf(currSymbol) + l) <= 25 ) {
				if ( input_split_default[b] == input_split_default[b].toUpperCase() ) {
					currStr += alphabet[alphabet.indexOf(currSymbol) + l].toUpperCase();
				} else {
					currStr += alphabet[alphabet.indexOf(currSymbol) + l];
				}
			} else if ( (alphabet.indexOf(currSymbol) + l) > 25) {
				let newIndex = (alphabet.indexOf(currSymbol) + l) - 26;
				if ( input_split_default[b] == input_split_default[b].toUpperCase() ) {
					currStr += alphabet[newIndex].toUpperCase();
				} else {
					currStr += alphabet[newIndex];
				}
			}
		} else {
			currStr += currSymbol;
		}
		allVariants[l] = currStr;
	}
}
		//undefined? alert
if ( allVariants[0] == undefined ) {
	let alertElement = document.createElement('h3');
	alertElement.innerText = 'Please enter text❗️';
	document.getElementById("mostLikely").appendChild(alertElement);
} else {

liElement = document.createElement('li');
liElement.innerText = '"e": ' + allVariants[inE + 1];
liElement.setAttribute('class', "list-group-item");
document.getElementById("mostLikely").appendChild(liElement);

liElement = document.createElement('li');
liElement.innerText = '"t": ' + allVariants[inT + 1];
liElement.setAttribute('class', "list-group-item");
document.getElementById("mostLikely").appendChild(liElement);

liElement = document.createElement('li');
liElement.innerText = '"h": ' + allVariants[inH + 1];
liElement.setAttribute('class', "list-group-item");
document.getElementById("mostLikely").appendChild(liElement);

document.getElementById('mostLikelyTitle').setAttribute('style', 'display:inline');
document.getElementById('full_table_btn').setAttribute('style', 'display:inline');
}

document.getElementById('mostLikelyTable').setAttribute('style', 'display:inline');

for (var r = 0; r < 26; r++) {
		liElement = document.createElement('li');
		liElement.innerText = r + ': ' + allVariants[r];
		liElement.setAttribute('class', "list-group-item");
		document.getElementById("fullList").appendChild(liElement);
	}
}

function showFullTable() {
	document.getElementById("full_table_btn").addEventListener("click", function(event){
		event.preventDefault()
});
document.getElementById('fullTable').setAttribute('style', 'display:inline');
}