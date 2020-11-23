import { Ui } from './ui';
import { User, DrawMessage, DrawMessageAdministrador } from './helper/types_object';

const socket = io();
const searchParams = new URLSearchParams( window.location.search );
const name:string = searchParams.get('nombre');
const room:string = searchParams.get('sala');

const formMessage:any = document.querySelector('#form');
const writeMessage:any = document.querySelector('#writeMessage');

const ui = new Ui();

ui.nameRoomAndOwner_chat(room, name); // Pinta por pantalla el nombre de la sala y el nombre del usuario.

//Pinta los usuarios conectados la primera vez.
socket.emit('userConnect', {name, room}, (res:User[]):void => {
	
	const filterRoom:User[] = res.filter(el => el.room === room);

	filterRoom.forEach(user => ui.drawUserOnline(user) )
});

//Pinta los usuarios cada vez que se conectan o desconectan.
socket.on('userConnectOrDisconnected', (res:User[]):void => {
	
	const filterRoom:User[] = res.filter(el => el.room === room);
	
	// ui.templeteUserOnline = '';
	ui.clearTempleteUseronline();
	filterRoom.forEach(user => ui.drawUserOnline(user) );
} );

// El administrador da una alerta de que el usuario ingreso al chat
socket.on('enterChat', (res:DrawMessageAdministrador) => ui.enterOrLeaveChat(res, 'success'));

// El administrador da una alerta de que el usuario abandono al chat
socket.on('leaveChat', (res:DrawMessageAdministrador) => ui.enterOrLeaveChat(res, 'danger'));

socket.on('receivedMessage', (res:DrawMessage) => ui.drawMessageReceived(res));

//Eventos ------ formMessage = viene del archivo ui.js
formMessage.addEventListener('submit', e => {
	
	// writeMessage = viene del archivo ui.js
	e.preventDefault();
	writeMessage.focus();

	if (writeMessage.value === '') return;

	socket.emit('sendMessage', writeMessage.value, (res:DrawMessage) => ui.drawMessageSend(res));

	writeMessage.value = '';
});