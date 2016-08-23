
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



function customRender(content, scope){
	scope = scope||{};
	var myRegexp = /\[(.*?)\]/g;
  var match = myRegexp.exec(content);
  var response = JSON.parse( JSON.stringify( content ) );
  var temp;

  while (match != null) {
  	try{
  		var format = 'L';
  		if(match[1].indexOf(':')>=0){
  			var parts = match[1].split(':');
  			format = parts[1];
  			match[1] = parts[0];
  		}
  		match[1] = match[1].replace(/Admission/gi, '{{patient_information.admitted_on}}');
  		// match[1] = match[1].replace(/DOB/gi, '{{patient_information.date_of_birth}}');
  		match[1] = match[1].replace(/\{\{&gt;/gi, '{{>');
  		match[1] = customRender(Hogan.compile(match[1]).render(scope.data, templates), scope);	

  		var converted = {};
  		if(match[1].indexOf('&')>=0){
  			 var parts = match[1].split('&');
  			 converted = moment(Date.past(parts[0].substr(0,parts[0].length-1))).subtract(parts[1].substr(4), 'years').format();

  		}
  		else{
  			converted = Date.create(match[1]);
  		}
  			 if((typeof converted == "string" || converted instanceof Date) && converted !== "Invalid date" && converted !== "Invalid Date"){
  			 	temp = moment(converted).format(format);
  			 	if(converted == "Invalid Date"){
	  			 	temp = match[1];
  			 	}
  			 }else{
  			 	temp = match[1];
  			 }
			// temp = moment(temp).format(format);

		}catch(e){}

    response = response.replace(match[0], temp || match[0]);
    match = myRegexp.exec(content);
  }
	return response;
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
	// $.jStorage.set('session', JSON.stringify(session));


	var stored = $.jStorage.get(hashParams.patient) || {};
	stored.session = session;
	$.jStorage.set(hashParams.patient, stored);
}
function clear(){
	// $.jStorage.set('session', JSON.stringify({}));
	// for(var i in forms){
	// 	$.jStorage.set(i, {});
	// }

	var stored = $.jStorage.get(hashParams.patient) || {};
	stored.session = {};
	for(var i in forms){
		stored[i]= {};
	}
	$.jStorage.set(hashParams.patient, stored);


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
		acceptObject: true,
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
				var selected = this.self.find('[name="'+this.name+this.labels[label].name+'"][type="radio"]:checked').data('label');
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
				this.self.find('[name="'+this.name+this.labels[i].name+'"][value="' + this.value[this.labels[i].name] + '"]').prop('checked', true);
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

(function(b, $){
	b.register({ type: 'check_collection',
		defaults: {container: 'span', acceptObject: true},
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






// (function(b, $){
// 	b.register({ type: 'sugar',
// 		defaults: { elType: 'text' },
// 		value: 0,
// 		toJSON: function() {
// 			return '[['+this.getValue()+']]';
// 		},
// 		setValue: function(value) {
// 			this.value = value.replace(/\[\[(.*?)\]\]/g,'');
// 		},


// 	});
// })(Berry,jQuery);
