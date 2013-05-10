Console = {
	divId: "#consolediv",
	parentId: "body",
	loglevel: 1, //for future use
	init: function(divId, parentId){
		var self = this;
		if(parentId != undefined){
			self.parentId = parentId;
		}
		if(divId != undefined){
			self.divId = divId;
		}
		if($(self.divId).length == 0){
			var id = self.divId.replace("#", "");
			$(self.parentId).append("<div id='"+id+"' class='_consolebox'></div>");
			$(self.parentId).append("<div id='"+id+"button' class='_consolebutton'>Hide log window</div>");
		}
		//Event for hiding page
		$(self.divId+"button").on('click', function(){
			if($(self.divId).is(":visible")){
				$(self.divId).hide(300);
				$(this).html("Show log window");
			}else{
				$(self.divId).show(300);
				$(this).html("Hide log window");
			}
		});
	},
	log: function(msg, s){
		var self = this;
		var source = (s != undefined)?s+": " : "";
	    $(self.divId).append("<p> "+source+msg+"</p>");   
		var n = $(self.divId).get(0).scrollHeight;
		$(self.divId).animate({ scrollTop: n },'10'); 
	}
}