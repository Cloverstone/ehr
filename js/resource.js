pages = {
	medical_admin_record: function() {
		Berry.register({
			type: 'qrcode',
			create: function() {
				return Berry.render('berry_qrcode', this);
			},
			setup: function() {
				this.$el = this.self.find('input');
				this.$el.off();
				if(this.onchange !== undefined) {
					this.$el.on('change', this.onchange);
				}
				this.$el.on('change', $.proxy( function() { this.trigger('change'); }, this ));
			},
			setValue: function(value) {
				if(typeof this.lastSaved === 'undefined'){
					this.lastSaved = value;
				}
					this.success = false;
				if(value.toLowerCase() == this.help.toLowerCase()){

					this.value = value;
					this.success = true;
					this.render();
				}
			},		
			satisfied: function(){
				return this.success
			}
		});
		$('[data-order-text]').on('click', function(e){
			var fields = [
				{label: 'Patient/Date of Birth', type: 'qrcode', name:'patient', required: true, help: e.currentTarget.dataset.name},
				{label: 'Prescription', type: 'qrcode', name:'prescription', required: true,help: e.currentTarget.dataset.orderText},
				{label: 'Initials', required:true},
				{label: 'Confirm', value: getNodeIndex(e.currentTarget.parentNode), type: 'hidden', required: true},
				{name: 'type', type: 'hidden', value:e.currentTarget.dataset.type}
			]
			if(e.currentTarget.dataset.im){
				fields.push({label: "Injection Location", required:true, options:[
					"right deltoid",
					"left deltoid",
					"right ventralgluteal",
					"left ventralgluteal",
					"right vastus lateralis",
					"left vastus lateralis",
					"right dorsal gluteal",
					"left dorsal gluteal"
				]})
			}
			if(e.currentTarget.dataset.sq){
				fields.push({label: "Injection Location", required:true, options:[
					"back of right arm",
					"back of left arm",
					"abdomin - right side",
					"abdomin - left side",
					"other"
				]})
				fields.push({label: 'Other', show:{ "matches": {
					"name": "insulin_administration_location",
					"value": "other"
				}}})
			}
			if(e.currentTarget.dataset.insulin){
				fields.push({label: "Chemstrip value",help:"units", required:true})
				fields.push({label: "Regular Insulin Sliding Scale",help:"units", type:'select', required:true, min: 0, max: 12, default:'Patient Refused'})
				fields.push({label: "Insulin administration location", required:true, options:[
					"back of right arm",
					"back of left arm",
					"abdomin - right side",
					"abdomin - left side",
					"other"
				]})				
				fields.push({label: 'Other', show:{ "matches": {
					"name": "insulin_administration_location",
					"value": "other"
				}}})

			}
			$().berry({name:'validate',legend: 'Confirmation', fields: fields}).on('save', function() {
				if( this.validate() ) {
					var values = this.toJSON();

					session.medication_admin_record = session.medication_admin_record || {scheduled:[], prn:[]};
					var position = parseInt(values.confirm, 10);
					var length = session.medication_admin_record[values.type].length;
					if(position > length) {
						for(var i = length; i < position; i++)					
							session.medication_admin_record[values.type][i] = {has_been_administered: false};
					}
					session.medication_admin_record[values.type][position-1] = {has_been_administered: true, initials: values.initials, time: moment().format('LT')};

					session.medication_admin_record[values.type][position-1].notes = this.toJSON();


					store();
					this.trigger('saved');
				}
			})
			.on('saved', function(){load(true)})
			.on('change:patient', function(item){
				qrcode.callback = $.proxy(function(data){
					pageSession.patient = data;
					this.fields.patient.setValue(data)
				}, this)
				processFile.call(this.findByID(item.id).$el[0]);
			})
			.on('change:prescription', function(item){
				qrcode.callback = $.proxy(function(data){
					this.fields.prescription.setValue(data)
				},this)
				processFile.call(this.findByID(item.id).$el[0]);
			})
			if(pageSession.patient){
				Berries.validate.fields.patient.setValue(pageSession.patient);
			}
		})

	},
	form: function(){
		var fields = {};
		var atts = {};
		var renderer = 'base';

		if(typeof forms[hashParams.form] !== 'undefined'){
			fields = forms[hashParams.form].fields;
			var stored = $.jStorage.get(hashParams.patient) || {};
			atts = $.extend(_.find(scenarios,{id:parseInt(hashParams['patient'])}).data[hashParams.form],stored[hashParams.form]);

			//if multiple instance type form
			if(_.keys(fields).length == 1 && fields[_.keys(fields)[0]].multiple){
				fields[_.keys(fields)[0]].multiple = {duplicate: false}
			}

			$('.header .col-sm-3').html(forms[hashParams.form].legend || 'FORM')
		}else{
			if(hashParams.form == 'scenario2'){
				data = _.find(scenarios,{id:parseInt(hashParams['patient'])}).data;
				renderer = 'tabs';
				fields = forms;
			}else{
				fields = getItems(data);
			}
			atts = data;
		}

		Berry.btn.clear = {
			label: 'Clear',
			icon:'times',
			id: 'berry-clear',
			modifier: 'danger pull-left',
			click: function() {
				this.trigger('clear');
			}
		};

		$('#form').berry({actions:['save', 'cancel', 'clear'] ,renderer: renderer, flatten: false, attributes: atts, fields: fields}).on('save', function() {
				var stored = $.jStorage.get(hashParams.patient) || {};

				//if multiple instance type form
				if(_.keys(this.options.fields).length == 1 && fields[_.keys(this.options.fields)[0]].multiple && !fields[_.keys(this.options.fields)[0]].multiple.duplicate){
					stored[hashParams.form] = stored[hashParams.form] || [];
					stored[hashParams.form].push(this.toJSON());
				}else{
					stored[hashParams.form] = this.toJSON();
				}

				$.jStorage.set(hashParams.patient, stored);
		}).on('cancel', function() {
			window.history.back();
		}).on('clear', function() {
			var stored = $.jStorage.get(hashParams.patient) || {};
			stored[hashParams.form] = null;
			$.jStorage.set(hashParams.patient, stored);

			window.location.reload();
		});
	}


};
