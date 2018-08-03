console.log('connected ul.js file')

const sendButton = document.querySelector('#send-button')
const conversation = document.querySelector('#conversation-content')
const text_input = document.querySelector('#text-input')
document.addEventListener('DOMContentLoaded', function() {
    var options = {}
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, options);
  });
  
console.log(sendButton)
console.log(conversation)
console.log(text_input)

sendButton.addEventListener("click", e => {
    conversation.innerHTML += `<li>${text_input.value}</li>`
    text_input.value = ''
})

const signin = document.querySelector('#sign-in-button')
const signout = document.querySelector('#sign-out-button')

signin.addEventListener("click", e => {
    signInWithGoogle()
})

signout.addEventListener("click", function(e){
    signOutWithGoogle()
})

const authDropdownItem = document.querySelector('#auth-dropdown-button')

function updateUIforSignIn(avatarSrc)
{
    authDropdownItem.innerHTML = `<i><img class = "avatar-image" src = "${avatarSrc}"/></i>`
}
function updateUIforSignOut(){
     authDropdownItem.innerHTML = `<i class="material-icons">more_vert</i>`
}

const contactList = document.querySelector('#contact-list')

function updateUIwithNewContact(userInfo){
    contactList.innerHTML +=
    `
        <li onclick="displayTextsFrom('${userInfo.id}')" class="contact-item avatar">
            <img src= "${userInfo.photoURL}" class="circle avatar-image" />
            <div class="contact-name-and-text">
                <h6 class = "title">${userInfo.name}</h6>
                <p class = "grey-text last-text-message">This is a fake text...</p>
            </div>
            <div class="contact-timestamp">
                <p class="grey-text">3:00 PM</p>
            </div>
        </li>
    `
}

function displayTextsFrom(uid){
    console.log(uid)
}