const socket = io()
let user
let chatBox = document.getElementById('chatBox')



//En la siguiente parte agregaremos por medio de sweetalert con swalfire nuestro identificador para el chat
Swal.fire({
    title:'Ingresa tu nombre',
    input: 'text',
    text:'ingresa tu nombre para indentificarte en el chat',
    inputValidator: (value) => {
        return !value && 'Necesitas escribir un nombre' /* En esta linea pedimos que sea forzoso el ingreso de un nombre par apoder entrar al chat */
    },
    allowOutsideClick:false
}).then(result =>{ 
    user = result.value /* Una vez que el usuario se identifico agregamos el nombre que ingreso a la variable user */
   socket.emit('authenticated', user)//Aca enviamos un mensaje al servidor para anunciar nuestro logueo
})




//Ahora agregaremos un evento a nuestro input chatBox

chatBox.addEventListener('keyup', evt =>{
    if(evt.key === 'Enter'){
        if(user === 'Erne'){ //Este if nos esta haciendo la broma de soy gay
            if(chatBox.value.trim().length > 0){
                socket.emit('message', {user:user,message:'Soy gay amigos'})
                chatBox.value=''
            } 
        }else{
        if(chatBox.value.trim().length > 0){
            socket.emit('message', {user:user,message:chatBox.value})
            chatBox.value=''
        }}
    }
})

socket.on('messageLogs', data=>{
    let log = document.getElementById('messageLogs')
    let messages = ''
   
    data.forEach(message => {
        messages = messages+`${message.user} : ${message.message}</br>`
       
    });

    
    log.innerHTML = messages
})


//Aca etsamos escuchando el servidor para lanzar nuestro logueo
socket.on('newUserConnected', data=>{
    if(!user){
        return}
        Swal.fire({
            toast: true,
            position: 'top-right',
            text: 'Nuevo usuario conectado perras',
            title: 'Una perra se conecto',
            timer: 3000,
            showConfirmButton: false

        })
    }
)