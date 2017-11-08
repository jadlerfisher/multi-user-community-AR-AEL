var states = ['stateA', ...
							'stateB', ...
							'stateC', ...
							'stateC1', ...
							'stateC2', ...
							'stateC3', ...
							'stateC4'];
var currentState = 'stateA';

function stateChange(nextState){
	console.log('Changing state from:\t' + currentState + "\nChanging state to:\t\t" + nextState);
	
	if(nextState == "stateA"){
		revealCursor();
	}

	if(currentState == "stateA"){
		hideCursor();
	}

	document.getElementById(currentState).classList.add('hide-state');
	document.getElementById(nextState).classList.remove('hide-state');
	currentState = nextState;
}