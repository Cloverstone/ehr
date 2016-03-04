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
		var fields = {};
		if(typeof forms[hashParams.form] !== 'undefined'){
			fields = forms[hashParams.form];
		}else{
			fields = getItems(data);
		}
		var atts = $.jStorage.get(hashParams.form) || data;

		Berry.btn.clear = {
			label: 'Clear',
			icon:'times',
			id: 'berry-clear',
			modifier: 'danger pull-left',
			click: function() {
				this.trigger('clear');
			}
		};

		$('#form').berry({actions:['save', 'cancel', 'clear'] ,flatten: false, attributes: atts, fields: fields}).on('save', function() {
			$.jStorage.set(hashParams.form, this.toJSON())
		}).on('cancel', function() {
			window.history.back();
		}).on('clear', function() {
			$.jStorage.set(hashParams.form, {});
			// this.load($.jStorage.get(hashParams.form))
			window.location.reload();
		});
	}

};





var forms = {
	neuro: {
		'Orientation': {type: 'radio', 
			options: ['Person, Time, Place, Situation', ' Disoriented', ' Person', ' Time', ' Place', ' Situation']
		},
		'Behavioral / Emotional': { type: 'radio',
			options: ['Calm', 'Cooperative', 'Restless', 'Combative', 'Confused', 'Agitated', 'Untestable']
		},
		'Strength': { type: 'radio_collection',
			labels: [{'name':'All'}, {'name':'LUE'}, {'name':'RUE'}, {'name':'LLE'}, {'name':'RLE'}],
			options:['Moves well on request', 'Weak movement on request', 'Moves well with stimulation', 'Weak movement with stimulation', 'No movement']
		},
		'Pupils': {fields:{
			'PERRLA': {help: 'Pupils are:', 
				options: ['Equal', 'Round', 'Reactive to light', 'Reactive to accomodation']
			},
			'Both Eyes': {help: 'Size', min: 1, max: 7, type: 'scale'},
			'Pupil Size (mm)': { type: 'radio_collection',
				options: ['Left', 'Right', 'Both'],
				labels: [{name: '1'},{name: '2'},{name: '3'},{name: '4'},{name: '5'},{name: '6'},{name: '7'},{name: '8'},{name: '9'}]
			},
			'Reaction': { type: 'radio_collection',
				options: ['Left', 'Right', 'Both'],
				labels: [{'name':'Brisk'}, {'name':'Normal'}, {'name':'Sluggish'}, {'name':'Fixed'}, {'name':'Blown'}]
			},
			'Accomodate': ['Left', 'Right', 'Both']
		}},
		'Glasgow Coma Score': {fields:{
			'Eye Opening': { type: 'radio', 
				options: ['Spontaneously', 'To Speech', 'To Pain', 'No Response']
			},
			'Motor Response': { type: 'radio', 
				options: ['Obeys Verbal Command', 'Localizes Pain', 'Flexion Withdrawl', 'Flexion Abnormal', 'Extension Abnormal', 'No Response']
			},
			'Verbal Response': { type: 'radio', 
				options: ['Oriented X 3', 'Conversation Confused', 'Speech Inappropriate', 'Sounds Incomprehensible', 'No Response']
			}
		}},
		'Ramsey Scale': {fields:{
			'Sedation': { type: 'radio', 
				options: ['Anxious or Restless or Both', 'Cooperative, Orientated, and Tranquil', 'Responding to Commands', 'Brisk Response to Stimulus', 'Sluggish Response to Stimulus', 'No Response to Stimulus', 'Submit']
			}
		}}
	}, genitourinary: {
		'Shift': {label:false, type: 'custom_radio', options: ['Day Shift', 'Evening Shift', 'Night Shift']},

	}, intake_output: {
		'Shift': {label:false, type: 'custom_radio', options: ['Day Shift', 'Evening Shift', 'Night Shift']},
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
	}, vital_signs: {
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
	}, patient_information:	{
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
	}
}

forms.pain = {
	'Site': {},
	'Quantity': {min: 0, max: 10, type: 'scale', low: 'No Pain', high: 'Worst Pain Imaginable'},
	'Aggravating Factors': { type: 'radio',
		options: ['Movement','Coughing','Breathing','Eating']
	},
	'Alleviating Factors': { type: 'radio',
		options: ['Rest', 'Compression', 'Medication', 'Ice', 'Immobility'],
	},
	'Quality Of Pain': { type: 'radio',
		options: ['Aching', 'Throbbing', 'Dull', 'Stabbing', 'Burning', 'Piercing', 'Sore', 'Crushing'],
	},
	'Periodicity': { type: 'radio',
		options: ['Constant', 'Intermittent '],
	},
	'Duration': {},
	'Classification': { type: 'custom_radio',
		options: ['Chronic', 'Acute'],
	},
	'Radiation': { type: 'custom_radio',
		options: ['Yes', 'No'],
	},
	'Notes': 'textarea',
	'Reassessment': {help: 'in 1 hour', min: 0, max: 10, type: 'scale', low: 'No Pain', high: 'Worst Pain Imaginable'}
}

forms.iv = {
	'IV Access?': { type: 'custom_radio',
		options: ['Yes', 'No'],
	},
	'IV Site': {multiple:{duplicate: true},fields:{
		'Type': { type: 'radio',
			options: ['Saline Lock', 'Peripheral IV', 'PICC', 'Central Venous Catheter', 'Port-a-Cath']
		},
		'Location': { type: 'radio_collection',
			options: ['Yes', 'No'],
			labels: [{'name':'Hand'}, {'name':'Forearm'}, {'name':'Antecube'}, {'name':'Upper arm'}, {'name':'Femoral'}, {'name':'Saphenous'}, {'name':'Subclavian'}, {'name':'Jugular'}]
		},
		'Assessment': { type: 'check_collection',
			options: [' Dressing clean and dry', 'Assessed every hour', 'Infusing well', 'Errythema', 'Edema', 'Drainage', 'Eccymotic', 'Necrotic', 'Discontinued', 'Physician notified', 'Warm compress', 'Cold compress', 'Dressing changed', 'Tubing changed', 'New site']
		},
		'If new site, document catheter gauge and time initiated.':{}
	}}
}

forms.cardiac = {
	'Heart Tones': { type: 'radio',
		options: ['S1, S2', 'Regular', 'Murmur', 'Gallop', 'S3', 'S4', 'Muffled', 'Irregular', 'Distant'],
	},
	'Pulses': { type: 'radio_collection',
		labels: [{'name':'All'}, {'name':'LUE'}, {'name':'RUE'}, {'name':'LLE'}, {'name':'RLE'}],
		options: ['Absent','+1', '+2', '+3', 'Bounding']
	},
	'Edema': { type: 'radio_collection',
		labels: [{'name':'All'}, {'name':'LUE'}, {'name':'RUE'}, {'name':'LLE'}, {'name':'RLE'}],
		options: ['None', 'Non Pitting', 'Slight Pitting', 'Pitting', 'Deep Pitting']
	},
	'Capillary Refill': { type: 'radio_collection',
		labels: [{'name':'All'}, {'name':'LUE'}, {'name':'RUE'}, {'name':'LLE'}, {'name':'RLE'}],
		options: ['Absent', '< 3 seconds', '> 3 seconds']
	},
	'Skin Color and Description': { type: 'radio',
		options: ['Appropriate for ethnicity', 'Warm', 'Dry', 'Intact', 'Cool', 'Clammy', 'Cyanotic', 'Diaphoretic', 'Blotchy', 'Dusky', 'Flushed', 'Fragile', 'Jaundiced', 'Moist', 'Mottled', 'Pale', 'Ashen'],
	},
	'Detail': 'textarea',
	'Devices': { type: 'radio',
		options: ['Pacer', 'IABP', 'CVP', 'Pulmonary Artery Monitoring', 'Cardiac Monitor', 'Arterial line', 'Other:'],
	},
}
forms.respiratory = {
	'Oxygen Delivery': {fields:{
		'Method': { type: 'radio',
			options: ['Room Air', 'Nasal Cannula', 'Non-rebreather', 'Venti mask', 'Ventilator', 'Other']
		},		
		'Amount (in Liters)': {},
		'Airway Device': { type: 'radio',
			options: ['Endotracheal Tube', 'Tracheostomy']
		}
	}},
	'Breath Sounds': {fields:{
		'Left Lung (Anterior)': { type: 'radio_collection',
			labels: [{'name':'All	'}, {'name':'Upper Lobe	'}, {'name':'Mid Lobe	'}, {'name':'Lower Lobe	'}, {'name':'Axillary	'}, {'name':'All	'}, {'name':'Upper Lobe	'}, {'name':'Mid Lobe	'}, {'name':'Lower Lobe'}],
			options: ['Clear', 'Crackles', 'Rhonchi', 'Wheeze', 'Absent']
		},		
		'Right Lung (Anterior)': { type: 'radio_collection',
			labels: [{'name':'All	'}, {'name':'Upper Lobe	'}, {'name':'Mid Lobe	'}, {'name':'Lower Lobe	'}, {'name':'Axillary	'}, {'name':'All	'}, {'name':'Upper Lobe	'}, {'name':'Mid Lobe	'}, {'name':'Lower Lobe'}],
			options: ['Clear', 'Crackles', 'Rhonchi', 'Wheeze', 'Absent']
		},
		'Wheeze Quality': { type: 'radio',
			options: ['Inspiratory', 'Expiratory', 'Low pitched', 'High pitched']
		},
		'Stridor': { type: 'radio',
			options: ['Present', 'Absent']
		}
	}},
	'Cough': {options: ['None', 'Dry', 'Productive']},
	'Sputum': {fields:{
		'Color': { type: 'radio',
			options: ['None', 'Clear', 'White', 'Creamy', 'Yellow', 'Green', 'Bloody', 'Blood tinged', 'Tan', 'Black']
		},
		'Consistency': { type: 'radio',
			options: ['None', 'Thin', 'Thick']
		},
		'Amount': { type: 'radio',
			options: ['None', 'Small', 'Moderate', 'Copious']
		}
	}},
	'Respirations': {fields:{
		'Respirations': {label:'Respirations', type: 'radio',
			options: ['Unlabored', 'Labored', 'Shallow', 'Gasping', 'Grunting', 'Nasal Flaring', 'Cheyne-Stokes', 'Kussmaul', 'Apneic', 'Tachypnea']
		},
		'Retractions': { type: 'radio',
			options: ['Supracostal', 'Intercostal', 'Subcostal', 'Substernal']
		},
		'Other Respiratory Symptoms': { type: 'radio',
			options: ['None', 'Shortness of Breath', 'Difficulty Breathing at Rest', 'Difficulty Breathing with Activity', 'Cyanosis', 'Kussmaul']
		},
		'Other': {}
	}},

	



}
