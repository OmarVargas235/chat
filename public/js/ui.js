const containerAvatares = document.querySelector('#container-avatares');
const formMessage = document.querySelector('#form');
const writeMessage = document.querySelector('#writeMessage');
const messageElement = document.getElementById('message');

let templeteUserOnline = '', templeteMessage = '';

function drawUserOnline(data) {
	
	templeteUserOnline += `
		<figure class="container-avatares__avatar d-flex align-items-center py-2 px-4 mb-0">
			<img 
				src="./img/avatares/avatar_1.png" 
				class="container-avatares__img img-fluid rounded-circle" 
			/>

			<figcaption class="ml-2">
				<p class="mb-0 text-capitalize" id=${data.id}>${data.name}</p>
				<p class="mb-0 container-avatares__online pl-1">online</p>
			</figcaption>
		</figure>
	`;

	$(document).ready(function(){
	  $(`#${data.id}`).popover({content: data.name, placement: "top", trigger: "hover"});
	});

	containerAvatares.innerHTML = templeteUserOnline;

	const figureWidth = document.querySelector('figure').clientWidth - 70;
	const tagsP = Array.from(document.querySelectorAll('figcaption p:first-child'));
	tagsP.forEach(tag => tag.style.width = figureWidth + 'px');
}

function drawMessageSend(res) {

	const { message, user } = res;

	templeteMessage += `
		<figure class="d-flex justify-content-end mb-5">
			<img 
				src="./img/avatares/avatar_1.png" 
				class="message__img img-fluid rounded-circle order-1" 
			/>

			<p class="mb-0 order-2 align-self-center message__hour ml-3 ml-sm-0">${setTime()}</p>

			<figcaption class="mr-2">
				<p class="mb-2 p-2">${user.name}</p>
				<p class="mb-0 p-2 send">${message}</p>
			</figcaption>
		</figure>
	`;

	messageElement.innerHTML = templeteMessage;

	scrollBottom();
}

function drawMessageReceived(res) {
	
	const { message, user } = res;

	templeteMessage += `
		<figure class="d-flex mb-5">
			<img 
				src="./img/avatares/avatar_2.png" 
				class="message__img img-fluid rounded-circle" 
			/>

			<p class="mb-0 order-2 align-self-center flex-grow-1 text-right message__hour">${setTime()}</p>

			<figcaption class="mr-2">
				<p class="mb-2 p-2">${user.name}</p>
				<p class="mb-0 p-2 received">${message}</p>
			</figcaption>
		</figure>
	`;

	messageElement.innerHTML = templeteMessage;

	scrollBottom();
}

function enterOrLeaveChat(data, typeAlert) {

	templeteMessage += `
		<figure class="d-flex mb-5">
			<p class="mb-0 order-2 align-self-center flex-grow-1 text-right message__hour">${setTime()}</p>

			<figcaption class="mr-2">
				<p class="mb-2 p-2">${data.administrador}</p>
				<p class="mb-0 p-2 alert alert-${typeAlert}">${data.user}</p>
			</figcaption>
		</figure>
	`;

	messageElement.innerHTML = templeteMessage;

	scrollBottom();
}

function setTime() {

	const date = new Date();
	let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(), 
		minutes = date.getMinutes();
	
	hours = hours === 0 ? '12' : ("0" + hours).slice(-2);
	minutes = ("0" + minutes).slice(-2);

	return `${hours}:${minutes} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
}

function scrollBottom() {
	
	const height = document.querySelector('#message figure:last-child').clientHeight + 48;
	
	if (messageElement.scrollTop + messageElement.offsetHeight + height > messageElement.scrollHeight) {
		messageElement.scrollTop = messageElement.scrollHeight;
	}
}