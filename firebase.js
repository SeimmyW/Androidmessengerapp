const auth = firebase.auth()
const database = firebase.firestore()

//Using a popup
const provider = new firebase.auth.GoogleAuthProvider()
provider.addScope('profile')
provider.addScope('email')

window.onload = function(){
    initializeApp()
}

function initializeApp(){
    auth.onAuthStateChanged(function(user){
        if (user) {
            //do something for logged in users
            const avatarSrc = user.photoURL
            updateUIforSignIn(avatarSrc)
            getUsersFriends()
        } else {
            //do somethig for logged out users
            updateUIforSignOut()
        }
    })
}

function signInWithGoogle(){
    auth.signInWithPopup(provider)
    .then(function(result) {
    //This gives you a Google Access Token  
    const token = result.credential.accessToken
    //The signed-in user info.
    const user = result.user
    const avatarSrc = user.photoURL
    const name = user.displayName
    const email = user.email
    const userId = user.uid
    const userInfo = {
        name: name,
        id: userId,
        photoURL: avatarSrc,
        email: email
    }
    addUserToDatabase(userInfo, userId)
    updateUIforSignIn(avatarSrc)
    })
}

function addUserToDatabase(userInfo, userId){
    //get a reference to the collection you need
    const userCollectionRef = database.collection('users')
    //create a document in that collection
    const newUserRef = userCollectionRef.doc(userId)
    //set the info equal to what you want
    newUserRef.set(userInfo)
}


function signOutWithGoogle(){
    auth.signOut()
    .then(function() {
     updateUIforSignOut()
    })
}

function getUsersFriends(){
    console.log
    const user = auth.currentUser
    const userId = user.uid
    
    const query = database.collection('users')
    .get()
    .then( snapshot => {
        console.log('snap found')
        if (snapshot.size > 0) { /*You can also say snapshot.size to say if there is more than 1 value*/
            snapshot.forEach( doc => {
                let userInfo = doc.data()
                console.log('size found')
                updateUIwithNewContact(userInfo)
            })
        }
    })
}






