const socket = io();
const searchParams = new URLSearchParams( window.location.search );
const name = searchParams.get('nombre');
const room = searchParams.get('sala');

document.querySelector('#name-room').textContent = room;
document.querySelector('#name-chat').textContent = name;

//Pinta los usuarios conectados la primera vez.
socket.emit('userConnect', {name, room}, res => {
	
	const filterRoom = res.filter(el => el.room === room);

	filterRoom.forEach(user => drawUserOnline(user) )
});

//Pinta los usuarios cada vez que se conectan o desconectan.
socket.on('userConnectOrDisconnected', res => {
	
	const filterRoom = res.filter(el => el.room === room);
	
	templeteUserOnline = ''; // templeteUserOnline = viene del archivo ui.js
	filterRoom.forEach(user => drawUserOnline(user) )
} );

// El administrador da una alerta de que el usuario ingreso al chat
socket.on('enterChat', res => enterOrLeaveChat(res, 'success'));

// El administrador da una alerta de que el usuario abandono al chat
socket.on('leaveChat', res => enterOrLeaveChat(res, 'danger'));

socket.on('receivedMessage', res => drawMessageReceived(res));

//Eventos ------ formMessage = viene del archivo ui.js
formMessage.addEventListener('submit', e => {
	
	// writeMessage = viene del archivo ui.js
	e.preventDefault();
	writeMessage.focus();

	if (writeMessage.value === '') return;

	socket.emit('sendMessage', writeMessage.value, res => drawMessageSend(res));

	writeMessage.value = '';
});