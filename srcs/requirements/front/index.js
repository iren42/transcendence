let canals = document.querySelectorAll(".canal");
let chatmiddle = document.querySelector(".receive-messages");

// affiche la discussion
let load_chatting_box = function () {
    // clear 
    chatmiddle.replaceChildren();

    // CREATE ONE MESSAGE
    // create new elements and texts

    let message = document.createElement("div");
    let message_sender = document.createElement("div");
    let sender_pic = document.createElement("img");
    let sender_name = document.createElement("p");
    let message_text = document.createElement("p");
    let message_timestamp = document.createElement("p");
    let text = document.createTextNode("Lorem ipsum, dolor sit amet consectetur \
    adipisicing elit. Non quas nemo eum, earum sunt, nobis similique quisquam \
    eveniet pariatur commodi modi voluptatibus iusto omnis harum illum iste \
    distinctio expedita illo!");
    let timestamp = document.createTextNode("18:06 PM | July 24");
    let name = document.createTextNode("Nom");

    // add classes to elements
    message_sender.classList.add("message-sender", "d-flex", "flex-row");
    sender_pic.classList.add("pic");
    sender_name.classList.add("name");
    message.classList.add("actual-message", "border-bottom");
    message_text.classList.add("message-text");
    message_timestamp.classList.add("message-timestamp");

    sender_pic.src = "./assets/user.jpg";
    // append text to their respective elements
    message_text.appendChild(text);
    message_timestamp.appendChild(timestamp);
    sender_name.appendChild(name);

    // append child elements to their parent element
    message_sender.appendChild(sender_pic);
    message_sender.appendChild(sender_name);
    message.appendChild(message_sender);
    message.appendChild(message_text);
    message.appendChild(message_timestamp);
    chatmiddle.appendChild(message);

    // SHOW INPUT BOX
				// <div class="row g-0 border w-100 message-input">
				// 	<div class="col-8 pe-0 h-100 w-75">
				// 		<textarea id="chat-box" class="form-control p-0 h-100 w-100" rows="3"
				// 			placeholder="Envoyer un message..."></textarea>
				// 	</div>
				// 	<div class="col-4 ps-0 h-100 w-25">
				// 		<button class="btn btn-primary " type="button">Envoyer</button>
				// 	</div>
				// </div>
                let inputbox = document.createElement("div");
};

// affiche toutes les discussions
let load_canals = function () {

};

// affiche tous les utilisateurs
let load_users = function () {

};

canals.forEach(element => element.addEventListener('click', event => {
    addEventListener("click", load_chatting_box);
}));
