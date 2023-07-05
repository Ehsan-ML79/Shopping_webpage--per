// Other btn simple sunctionality
//home sub btn
var subscribeBtn= document.getElementById('subscribe-btn');
subscribeBtn.addEventListener('click', function(event){
    alert('tnx for subscribing !\nyou will noticed newest our product!!');
    event.preventDefault();
});

//Contact pgae
document.addEventListener('DOMContentLoaded', function() {
  var contactBtn = document.getElementById('send-btn');
  contactBtn.addEventListener('click', function(event) {
    alert('پیام شما ارسال شد!\nپاسخ شما در اسرع وقت داده خواهد شد');
    event.preventDefault();
  });
});
