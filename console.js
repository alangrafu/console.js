Console = {
	divId: "#consolediv",
	parentId: "body",
	loglevel: 1, //for future use
	events: {},
	init: function(divId, parentId, config){
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
		if(config.events != undefined){
			$.each(config.events, function(action, matchStrings){
				$.each(matchStrings, function(i, matchString){
					var matchedElements = $(matchString);
					$.each(matchedElements, function(j, item){
						$item = $(item);
						$item.on(action, function(e){
							var id = "";
							if(e.target.id != null && e.target.id != ""){
								id = " with id '"+e.target.id+"'";
								console.log($(e.target));
							}
							Console.log("Event '"+action+"' triggered by "+e.target.nodeName+id); 
					    });
					})
				});				
			});
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
		$(self.divId).animate({ scrollTop: n }); 
	}	
}