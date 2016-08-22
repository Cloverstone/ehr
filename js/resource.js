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
		patient = false;
		$('[data-order-text]').on('click', function(e){
			var fields = [
				{label: 'Patient/Date of Birth', type: 'qrcode', name:'patient', required: true, help: e.currentTarget.dataset.name},
				{label: 'Prescription', type: 'qrcode', name:'prescription', required: true,help: e.currentTarget.dataset.orderText},
				{label: 'Confirm', value: getNodeIndex(e.currentTarget.parentNode), type: 'hidden', required: true}
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

					session.medication_admin_record = session.medication_admin_record || {scheduled:[]};
					var position = parseInt(this.toJSON().confirm, 10);
					var length = session.medication_admin_record.scheduled.length;
					if(position > length) {
						for(var i = length; i < position; i++)					
							session.medication_admin_record.scheduled[i] = {has_been_administered: false};
					}
					session.medication_admin_record.scheduled[position-1] = {has_been_administered: true};

					session.medication_admin_record.scheduled[position-1].notes = this.toJSON();
					store();
					this.trigger('saved');
				}
			})
			.on('saved', function(){load(true)})
			.on('change:patient', function(item){
				qrcode.callback = $.proxy(function(data){
					patient = data;
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
			if(patient){
				Berries.validate.fields.patient.setValue(patient);
			}
		})

	},
	form: function(){
		var fields = {};
		var atts = {};
		var renderer = 'base';

		if(typeof forms[hashParams.form] !== 'undefined'){
			fields = forms[hashParams.form].fields;
			// atts = $.jStorage.get(hashParams.form);
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
