// // MUST REDEFINE STATE-HANDLER IN HERE
// var states = ['stateA', ...
// 							'stateB', ...
// 							'stateC', ...
// 							'stateC1', ...
// 							'stateC2', ...
// 							'stateC3', ...
// 							'stateC4'];
							
// var currentState = 'stateA';

// function stateChange(nextState){
// 	var arScene = document.querySelector("#scene");

// 	console.log('Changing state from:\t' + currentState + "\nChanging state to:\t\t" + nextState);
	

// 	if(nextState == "stateA"){

// 		var obj = document.getElementsByClassName('selected')[0];
// 		// remove the "object" as selected
// 		if(obj !== undefined){
// 			obj.classList.remove('selected');
// 		}

// 		// If there is no selected item, automatically hide the option buttons before returning to State A
// 		if(selectedItem === null){
// 			hideButtons(document.getElementsByClassName('optionButton'));
// 		}

// 		// reveal the cursor
// 		revealCursor();
// 	}

// 	if(currentState == "stateA"){

// 		// hide cursor
// 		hideCursor();

// 		// reapply full opacity to selectedItem
// 		if(selectedItem !== null){
// 			setOpacity(selectedItem,1);
// 			selectedItem = null;
// 		}
		
// 	}
	
// 	document.getElementById(currentState).classList.add('hide-state');
// 	document.getElementById(nextState).classList.remove('hide-state');

// 	currentState = nextState;
// }

// console.log('This is happening');
// arScene.appendChild(hudElem2);