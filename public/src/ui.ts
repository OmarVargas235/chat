import { User, DrawMessage, DrawMessageAdministrador } from './helper/types_object';

export class Ui {

	private templeteUserOnline:string;
	private templeteMessage:string;
	private containerAvatares:any;
	private messageElement:any;
	private name_room:any;
	private name_chat:any;

	constructor() {
		
		this.templeteUserOnline = '';
		this.templeteMessage = '';
		this.containerAvatares = document.querySelector('#container-avatares');
		this.messageElement = document.getElementById('message');
		this.name_room = document.getElementById('name-room');
		this.name_chat = document.getElementById('name-chat');
	}

	clearTempleteUseronline():void {
		this.templeteUserOnline = '';
	}

	drawUserOnline(data:User):void {
	
		this.templeteUserOnline += `
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
		  (<any>$(`#${data.id}`)).popover({content: data.name, placement: "top", trigger: "hover"});
		});

		this.containerAvatares.innerHTML = this.templeteUserOnline;

		const figureWidth:number = document.querySelector('figure').clientWidth - 70;
		const tagsP:any = Array.from(document.querySelectorAll('figcaption p:first-child'));
		tagsP.forEach((tag:any) => tag.style.width = figureWidth + 'px');
	}

	drawMessageSend(res:DrawMessage):void {

		const { message, user } = res;

		this.templeteMessage += `
			<figure class="d-flex justify-content-end mb-5">
				<img 
					src="./img/avatares/avatar_1.png" 
					class="message__img img-fluid rounded-circle order-1" 
				/>

				<p class="mb-0 order-2 align-self-center message__hour ml-3 ml-sm-0">${this.setTime()}</p>

				<figcaption class="mr-2">
					<p class="mb-2 p-2">${user.name}</p>
					<p class="mb-0 p-2 send">${message}</p>
				</figcaption>
			</figure>
		`;

		this.messageElement.innerHTML = this.templeteMessage;

		this.scrollBottom();
	}

	drawMessageReceived(res:DrawMessage):void {

		const { message, user } = res;

		this.templeteMessage += `
			<figure class="d-flex mb-5">
				<img 
					src="./img/avatares/avatar_2.png" 
					class="message__img img-fluid rounded-circle" 
				/>

				<p class="mb-0 order-2 align-self-center flex-grow-1 text-right message__hour">${this.setTime()}</p>

				<figcaption class="mr-2">
					<p class="mb-2 p-2">${user.name}</p>
					<p class="mb-0 p-2 received">${message}</p>
				</figcaption>
			</figure>
		`;

		this.messageElement.innerHTML = this.templeteMessage;

		this.scrollBottom();
	}

	enterOrLeaveChat(data:DrawMessageAdministrador, typeAlert:string):void {

		this.templeteMessage += `
			<figure class="d-flex mb-5">
				<p class="mb-0 order-2 align-self-center flex-grow-1 text-right message__hour">${this.setTime()}</p>

				<figcaption class="mr-2">
					<p class="mb-2 p-2">${data.administrador}</p>
					<p class="mb-0 p-2 alert alert-${typeAlert}">${data.user}</p>
				</figcaption>
			</figure>
		`;

		this.messageElement.innerHTML = this.templeteMessage;

		this.scrollBottom();
	}

	nameRoomAndOwner_chat(room:string, nameChat:string):void {
		this.name_room.textContent = room;
		this.name_chat.textContent = nameChat;
	}

	private setTime():string {

		const date:any = new Date();
		let hours:number = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(), 
			minutes = date.getMinutes();
		
		hours = hours === 0 ? 12 : Number(("0" + hours).slice(-2));

		minutes = ("0" + minutes).slice(-2);

		return `${hours}:${minutes} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
	}

	private scrollBottom():void {
		
		const height:number = document.querySelector('#message figure:last-child').clientHeight + 48;
		
		if (this.messageElement.scrollTop + this.messageElement.offsetHeight + height > this.messageElement.scrollHeight) {
			this.messageElement.scrollTop = this.messageElement.scrollHeight;
		}
	}
}