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
			$().berry({legend: 'Confirmation', fields: [
				{label: 'Patient', type: 'qrcode', name:'patient', required: true, help: e.currentTarget.dataset.name},
				{label: 'Prescription', type: 'qrcode', name:'prescription', required: true,help: e.currentTarget.dataset.orderText},
				{label: 'Confirm', value: getNodeIndex(e.currentTarget.parentNode), type: 'hidden', required: true}
			]}).on('save', function() {
				if( this.validate() ) {
					session.medication_administration_record = session.medication_administration_record || {scheduled:[]};
					var position = parseInt(this.toJSON().confirm, 10);
					var length = session.medication_administration_record.scheduled.length;
					if(position > length) {
						for(var i = length; i < position; i++)					
							session.medication_administration_record.scheduled[i] = {has_been_administered: false};
					}
					session.medication_administration_record.scheduled[position-1] = {has_been_administered: true};
					store();
					this.trigger('saved');
				}
			})
			.on('saved', function(){load(true)})
			.on('change:patient', function(item){
				qrcode.callback = $.proxy(function(data){
					this.fields.patient.setValue(data)
				},this)
				processFile.call(this.findByID(item.id).$el[0]);
			})
			.on('change:prescription', function(item){
				qrcode.callback = $.proxy(function(data){
					this.fields.prescription.setValue(data)
				},this)
				processFile.call(this.findByID(item.id).$el[0]);
			})
		})
	},
	form: function(){
		switch(hashParams.form) {
			case 'patient_information':				
				$('#form').berry({flatten: false, attributes: data, fields: {
					'First Name': {},
					'Middle Name': {},
					'Last Name': {},
					'Medical Record Number':{}
				}});

				break;
			default:
				$('#form').berry({flatten: false, attributes: data, fields: getItems(data)});
		}
	}

};

