const inputs = Array.from(document.querySelectorAll('input'));
const formGroups = Array.from(document.querySelectorAll('.form-group'));

formGroups.forEach((formGroup, i) => inputs[i].addEventListener('focus', () => 
	formGroup.classList.add('form-group-edit')));

formGroups.forEach((formGroup, i) => inputs[i].addEventListener('blur', () => 
	formGroup.classList.remove('form-group-edit')));