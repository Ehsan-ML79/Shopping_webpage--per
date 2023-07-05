// Other btn simple sunctionality
//home sub btn
var subscribeBtn= document.getElementById('subscribe-btn');
subscribeBtn.addEventListener('click', function(event){
    alert('tnx for subscribing !\nyou will noticed newest our product!!');
    event.preventDefault();
})

//Contact pgae
var contactBtn = document.getElementById('send-btn');
//if (contactBtn) {
  contactBtn.addEventListener('click', function(event) {
    alert('پیام شما ارسال شد!\nپاسخ شما در اسرع وقت داده خواهد شد');
    event.preventDefault();
  //});
})
