(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            
            return $('.message_input').val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        
      
       /* $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });*/
        sendMessage('Welcome to Meetup Bot! :)');
       
        
    });
}.call(this));
$(document).ready(function(){
$('.send_message').click(function (e) {
	var msg = jQuery(".message_input").val();
	
	
	if(msg==''){
	alert("Empty Message");
	return false;
	}
		
if(msg!=''){
	$("ul.messages").append("<li class='message right appeared'><div class='avatar'></div>"+
			"<div class='text_wrapper'><div class='text'>"+msg+"</div></div></li>");
	$('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
	$('.message_input').val("");
var text=msg;
text=text.toLowerCase();
var data="";
	
	if(text.indexOf("event") != -1 || text.indexOf("events") != -1)
		{
		data="2/events"
		}
	else if(text.indexOf("city") != -1 || text.indexOf("place") != -1 || text.indexOf("location") != -1)
	{
	data="2/cities"
	}
	else if(text.indexOf("categories") != -1 || text.indexOf("category") != -1)
	{
	data="2/categories"
	}
	else if(text.indexOf("groups") != -1 || text.indexOf("group") != -1)
	{
	data="2/groups"
	}
 if(data!="")
 {
		jQuery.support.cors = true;
		$.ajax({
			type : "POST",
			url : "getmeetupinfo?data="+data,
			
			crossDomain : true,
			success : function(result) {
				//console.log(result);
				
				var list='';
				if(data=='2/cities'){
					jQuery.each(JSON.parse(result), function (key, value) {
					    console.log(key)
					    jQuery.each(value, function (i, j) {
						   
						    if(j.city!=undefined)
						    list+="City:"+j.city+"   Country name:"+j.localized_country_name+"<br>";
						});
					});
				}
				else if(data=='2/events'){
					jQuery.each(JSON.parse(result), function (key, value) {
					   if(key=="results"){
						   jQuery.each(value, function (i, j) {
							   console.log(j.description)
							   list+="Event:"+j.description+"<br>Venue :"+j.venue.name+",<br>"+j.venue.address_1+",<br>"+j.venue.city+",<br>"+j.venue.localized_country_name
							  
							});
					   }
					    
					});
				}
				else if(data=='2/categories'){
					jQuery.each(JSON.parse(result), function (key, value) {
					   if(key=="results"){
						   list+="Category list:<br>"
						   jQuery.each(value, function (i, j) {
							   console.log(j.name)
							   list+=(i+1)+"."+j.name+"<br>";
							  
							});
					   }
					    
					});
				}
				else if(data=='2/groups'){
					jQuery.each(JSON.parse(result), function (key, value) {
					   if(key=="results"){
						   console.log(value)
						   list+="Group details:<br>"
						   jQuery.each(value, function (i, j) {
							   j.description=j.description.replace("<br>"," ");
							   console.log(j.description)
							   list+="Name:"+j.name+"<br>description:"+j.description.trim()+"link:<a href='"+j.link+"'>"+j.link+"</a><br>";
							  
							});
					   }
					    
					});
				}
				
				$("ul.messages").append("<li class='message left appeared'><div class='avatar'></div>"+
						"<div class='text_wrapper'><div class='text'>"+list+"</div></div></li>");
				$('.messages').animate({ scrollTop: $('.messages').prop('scrollHeight') }, 300)
				
					 
			}
		});
}
 
 //$('.chat_window').scrollTop($('.chat_window')[0].scrollHeight);
}

   // return sendMessage(getMessageText());
});
$('.message_input').keyup(function (e) {
    if (e.which === 13) {
    	$('.send_message').trigger('click');
    }
});
});