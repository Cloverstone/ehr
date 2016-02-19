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
					'Medical Record Number': {},
					'Marital Status': {
						options: ['Married', 'Married - Not Living Together', 'Significant Other', 'Single', 'Divorced', 'Widowed', 'Unknown', 'Other']
					},
					'Gender': {
						options: ['Female', 'Male', 'Ambiguous', 'Unknown', 'Other']
					},
					'Age': {},
					'Height': {},
					'Weight': {},
					'Race': {
						options: ['American Indian / Alaska Native', 'Asian', 'Asian Indian', 'Black / African American', 'Chinese', 'Filipino', 'Guamanian / Chamorro', 'Japanese', 'Korean', 'Native Hawaiian', 'Pacific Islander', 'Samoan', 'Viernamese', 'White / Caucasian', 'Unknown', 'Other']
					},
					'Religion': {
						options: ['Agnostic/Atheist', 'Buddhist', 'Christian', 'Hindu', 'Humanist', 'Jewish', 'Muslim', 'Native American', 'Irreligion/No Religion', 'Pagan', 'Sikh', 'Spititualist', 'Unitarian/Universalist', 'Wiccan', 'Unknown', 'Other']
					},
					'Occupation': {},
					'Employer': {},
					'Insurance': {},
					'Diagnosis': {},
					'Admitted On': {},
					'Healthcare Facility': {},
					'Room': {},
					'Contact Precaution': {
						options: ['Standard', 'Contact', 'Droplet', 'Airborn']
					},
					'Advanced Directive': {
						options: ['Full Code', 'No Code', 'Meds Only', 'No CPR']
					},
					'Health Care Proxy': { type: 'select',
						options: ['Yes', 'No']
					},
					'Emergency Contact': {}
				}});
				break;			
			case 'vital_signs':				
				$('#form').berry({flatten: false, attributes: data, fields: {
					'Blood Pressure': {fields: {
						'Systolic': {},
						'Diastolic': {},
						'Location': {help: 'Cuff', options: ['LUE', 'RUE', 'Left Forearm', 'Right Forearm', 'Left Thigh', 'Right Thigh']},
						'Position': {options: ['Sitting ', 'Standing ', 'Supine', 'Prone', 'Left Side Lying', 'Right Side Lying']},
					}},
					'Heart Rate': {fields: {
						'Beats per Minute': {},
						'Location': {help: 'Arterial', options: ['Left Radial', 'Right Radial', 'Left Brachial', 'Right Brachial', 'Left Femoral', 'Right Femoral']},
						}
					},
					'Respiratory': {fields: {
						'Breaths per Minute': {},
						'SpO2': {},
						}
					},
					'Temperature': {fields: {
						'F': {},
						'Route': {options: ['Oral', 'Rectal', 'Tympanic', 'Core', 'Axillary ']},
						'Notes': {type: 'textarea'}
						}
					}
				}});
				break;
			case 'intake_output':				
				$('#form').berry({flatten: false, attributes: data, fields: {
					'Shift': {label:false, options: ['Day Shift', 'Evening Shift', 'Night Shift']},
					'Sample Question 2': {},
					'Intake': {fields: {
						'Oral': {help: 'in mLs'},
						'IV': {help: 'in mLs'},
						'Blood': {help: 'in mLs'},
						'Other': {help: 'in mLs'},
					}},
					'Output': {fields: {
						'Urine': {help: 'in mLs'},
						'Stool (liquid)': {help: 'in mLs'},
						'Emesis': {help: 'in mLs'},
						'Gastric Tube': {help: 'in mLs'},
						'Drainage Tubes': {help: 'in mLs'},
						'Other': {},
					}}
				}});
				break;
			case 'genitourinary':				
				$('#form').berry({flatten: false, attributes: data, fields: {
					'Shift': {label:false, options: ['Day Shift', 'Evening Shift', 'Night Shift']},
					'Sample Question 2': {},
					'Intake': {fields: {
						'Oral': {help: 'in mLs'},
						'IV': {help: 'in mLs'},
						'Blood': {help: 'in mLs'},
						'Other': {help: 'in mLs'},
					}},
					'Output': {fields: {
						'Urine': {help: 'in mLs'},
						'Stool (liquid)': {help: 'in mLs'},
						'Emesis': {help: 'in mLs'},
						'Gastric Tube': {help: 'in mLs'},
						'Drainage Tubes': {help: 'in mLs'},
						'Other': {},
					}}
				}});
				break;
			default:
				$('#form').berry({flatten: false, attributes: data, fields: getItems(data)});
		}
	}

};



