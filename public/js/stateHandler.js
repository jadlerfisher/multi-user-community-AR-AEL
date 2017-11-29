var states = ['stateA', ...
							'stateB', ...
							'stateB2', ...
							'stateC', ...
							'stateC1', ...
							'stateC2', ...
							'stateC3', ...
							'stateC4'];
var currentState = 'stateA';

function stateChange(nextState){
	console.log('Changing state from:\t' + currentState + "\nChanging state to:\t\t" + nextState);
	
	if(nextState == "stateA"){

		var obj = document.getElementsByClassName('selected')[0];
		if(obj !== undefined){
			obj.classList.remove('selected');
		}

		if(selectedItem === null){
			hideButtons(document.getElementsByClassName('optionButton'));
		}

		revealCursor();
	}

	if(currentState == "stateA"){
		hideCursor();

		if(selectedItem !== null){
			setOpacity(selectedItem,1);
			selectedItem = null;
		}
		
	}

	document.getElementById(currentState).classList.add('hide-state');
	document.getElementById(nextState).classList.remove('hide-state');
	currentState = nextState;
}