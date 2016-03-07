// function render(template, data){
// 	if(typeof templates[template] === 'undefined'){
// 		templates[template] =  Hogan.compile($('#'+template).html());
// 	}
//   return templates[template].render(data, templates);
// }


debug=true;
alert = function(value){ if(debug){console.log(value);} };
function render(template, data){
	if(typeof templates[template] === 'undefined'){
		if($('[name='+template+']').length > 0){
			if(!$('[name='+template+']').attr('src')){
				templates[template] =  Hogan.compile($('[name='+template+']').html());
			}else{					
				// $.get(, function (data) {
				//   templates[template]= Hogan.compile(data);
				// }, 'html')

				jQuery.ajax({
	        url: $('[name='+template+']').attr('src'),
	        success: function (data) {
						templates[template]= Hogan.compile(data);
	        },
	        async: false
		    });
			}
			$('#'+template).remove();
		}else{
			return Hogan.compile(template).render(data, templates);	
		}
	}
	if(typeof templates[template] !== 'undefined' && templates[template].length !== 0 ){
 	 return templates[template].render(data, templates);
	}else{
		alert('not found:'+template);
	}
}



function getNodeIndex(node) {
  var index = 0;
  while (node = node.previousSibling) {
    if (node.nodeType != 3 || !/^\s*$/.test(node.data)) {
      index++;
    }
  }
  return index;
}		
function store(){
	$.jStorage.set('session', JSON.stringify(session));
}
function clear(){
	$.jStorage.set('session', JSON.stringify({}));
	for(var i in forms){
		$.jStorage.set(i, {});
	}
	document.location.reload();
}






// var urlParams;
var hashParams
var QueryStringToHash = function QueryStringToHash  (query) {
  var query_string = {};
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    pair[0] = decodeURIComponent(pair[0]);
    pair[1] = decodeURIComponent((pair[1] || "").split('+').join(' '));
      // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]], pair[1] ];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  } 
  return query_string;
};
// (window.onpopstate = function () {
// 		hashParams = QueryStringToHash(document.location.hash.substr(1) || "")
//     var match,
//         pl     = /\+/g,  // Regex for replacing addition symbol with a space
//         search = /([^&=]+)=?([^&]*)/g,
//         decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
//         query  = window.location.search.substring(1);

//     urlParams = {};
//     while (match = search.exec(query))
//        urlParams[decode(match[1])] = decode(match[2]);
// })();







(function(b, $){
	b.register({ type: 'radio_collection',
		create: function() {
			this.options = b.processOpts.call(this.owner, this.item, this).options;
			return b.render('berry_' + (this.elType || this.type), this);
		},
		setup: function() {
			this.$el = this.self.find('[type=radio]');
			this.$el.off();
			if(this.onchange !== undefined) {
				this.on('change', this.onchange);
			}
			this.$el.change($.proxy(function(){this.trigger('change');}, this));
		},
		getValue: function() {
			var values = {}
			for(var label in this.labels){
				// debugger;
				var selected = this.self.find('[name="'+this.labels[label].name+'"][type="radio"]:checked').data('label');
				for(var i in this.item.options) {
					if(this.item.options[i].label == selected) {
						values[this.labels[label].name] = this.item.options[i].value;
						// return this.item.options[i].value;
					}
				}
			}
			return values;
		},
		setValue: function(value) {
			this.value = value;
			for(var i in this.labels){
				this.self.find('[name="'+this.labels[i].name+'"][value="' + this.value[this.labels[i].name] + '"]').prop('checked', true);
			}
		},
		// set: function(value){
		// 	if(this.value != value) {
		// 		//this.value = value;
		// 		this.setValue(value);
		// 		this.trigger('change');
		// 	}
		// },
		displayAs: function() {
			for(var i in this.item.options) {
				if(this.item.options[i].value == this.lastSaved) {
					return this.item.options[i].label;
				}
			}
		},
		focus: function(){
			this.self.find('[name='+this.labels[0].name+'][type="radio"]:checked').focus();
		}
	});
})(Berry, jQuery);


(function(b, $){
	b.register({ type: 'scale',
		create: function() {
			this.options = b.processOpts.call(this.owner, this.item, this).options;
			return b.render('berry_' + (this.elType || this.type), this);
		},
		setup: function() {
			this.$el = this.self.find('[type=radio]');
			this.$el.off();
			if(this.onchange !== undefined) {
				this.on('change', this.onchange);
			}
			this.$el.change($.proxy(function(){this.trigger('change');}, this));
		},
		getValue: function() {
			var selected = this.self.find('[type="radio"]:checked').data('label');
			for(var i in this.item.options) {
				if(this.item.options[i].label == selected) {
					return this.item.options[i].value;
				}
			}
		},
		setValue: function(value) {
			this.value = value;
			this.self.find('[value="' + this.value + '"]').prop('checked', true);
		},
		displayAs: function() {
			for(var i in this.item.options) {
				if(this.item.options[i].value == this.lastSaved) {
					return this.item.options[i].label;
				}
			}
		},
		focus: function(){
			this.self.find('[type="radio"]:checked').focus();
		}
	});
})(Berry, jQuery);
// Berry.register({type: 'datetime-local'})


// (function(b, $){
// 	b.register({ type: 'check_collection',

// 		defaults: {container: 'span'},
// 		create: function() {
// 			this.options = b.processOpts.call(this.owner, this.item, this).options;
// 			return b.render('berry_' + (this.elType || this.type), this);
// 		},
// 		setup: function() {
// 			this.$el = this.self.find('[type=checkbox]');
// 			this.$el.off();
// 			if(this.onchange !== undefined) {
// 				this.on('change', this.onchange);
// 			}
// 			this.$el.change($.proxy(function(){this.trigger('change');}, this));
// 		},
// 		getValue: function() {
// 			var values = {}
// 			for(var label in this.labels){
// 				// debugger;
// 				var selected = this.self.find('[name="'+this.labels[label].name+'"][type="checkbox"]:checked').data('label');
// 				for(var i in this.item.options) {
// 					if(this.item.options[i].label == selected) {
// 						values[this.labels[label].name] = this.item.options[i].value;
// 						// return this.item.options[i].value;
// 					}
// 				}
// 			}
// 			return values;
// 		},
// 		setValue: function(value) {
// 			this.value = value;
// 			for(var i in this.labels){
// 				this.self.find('[name="'+this.labels[i].name+'"][value="' + this.value[this.labels[i].name] + '"]').prop('checked', true);
// 			}
// 		},
// 		// set: function(value){
// 		// 	if(this.value != value) {
// 		// 		//this.value = value;
// 		// 		this.setValue(value);
// 		// 		this.trigger('change');
// 		// 	}
// 		// },
// 		displayAs: function() {
// 			for(var i in this.item.options) {
// 				if(this.item.options[i].value == this.lastSaved) {
// 					return this.item.options[i].label;
// 				}
// 			}
// 		},
// 		focus: function(){
// 			this.self.find('[name='+this.labels[0].name+'][type="checkbox"]:checked').focus();
// 		}
// 	});
// })(Berry, jQuery);




(function(b, $){
	b.register({ type: 'check_collection',
		defaults: {container: 'span'},
		create: function() {
			this.options = b.processOpts.call(this.owner, this.item, this).options;

			this.checkStatus(this.value);
			return b.render('berry_check_collection', this);
		},
		checkStatus: function(value){
			if(value === true || value === "true" || value === 1 || value === "1" || value === "on" || value == this.truestate){
				this.value = true;
			}else{
				this.value = false;
			}
		},
		setup: function() {
			this.$el = this.self.find('[type=checkbox]');
			this.$el.off();
			if(this.onchange !== undefined) {
				this.on('change', this.onchange);
			}
			this.$el.change($.proxy(function(){this.trigger('change');},this));
		},
		getValue: function() {
// debugger;

			// var values = {}
			var values = [];
			for(var opt in this.options){
				if(this.self.find('[name="'+this.options[opt].value+'"][type="checkbox"]').is(':checked')){
					// values[this.options[opt].value] = (this.truestate || true);
					values.push(this.options[opt].value);
				}else{
					if(typeof this.falsestate !== 'undefined') {
						// values[this.options[opt].value] = this.falsestate;
					}else{
						// values[this.options[opt].value] = false;
					}
				}
				
			}
			return values;



		},
		setValue: function(value) {
			// this.checkStatus(value);
			// this.$el.prop('checked', this.value);
			// this.value = value;
			// debugger;
			this.value = value;
				this.self.find('[type="checkbox"]').prop('checked', false);
			for(var i in this.value){
				this.self.find('[name="'+this.value[i]+'"][type="checkbox"]').prop('checked', true);
			}
		},
		displayAs: function() {
			for(var i in this.item.options) {
				if(this.item.options[i].value == this.lastSaved) {
					return this.item.options[i].name;
				}
			}
		},
		focus: function(){
			//this.$el.focus();
			this.self.find('[type=checkbox]:first').focus();
		},
		satisfied: function(){
			return this.$el.is(':checked');
		},
	});
})(Berry, jQuery);
