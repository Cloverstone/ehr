
var forms = {};

	forms.patient_information =	{"legend": "Patient Information", "fields":{
		"General": {"fields":{
			"First Name": {},
			"Middle Name": {},
			"Last Name": {},
			"Medical Record Number": {},
			"Marital Status": {
				"options": ["Married", "Married - Not Living Together", "Significant Other", "Single", "Divorced", "Widowed", "Unknown", "Other"]
			},
			"Gender": {
				"options": ["Female", "Male", "Ambiguous", "Unknown", "Other"]
			},
			"Age": {},
			"Date of Birth":{}
			"Height": {},
			"Weight": {},
			"Race": {
				"options": ["American Indian / Alaska Native", "Asian", "Asian Indian", "Black / African American", "Chinese", "Filipino", "Guamanian / Chamorro", "Japanese", "Korean", "Native Hawaiian", "Pacific Islander", "Samoan", "Viernamese", "White / Caucasian", "Unknown", "Other"]
			},
			"Religion": {
				"options": ["Agnostic/Atheist", "Buddhist", "Christian", "Hindu", "Humanist", "Jewish", "Muslim", "Native American", "Irreligion/No Religion", "Pagan", "Sikh", "Spititualist", "Unitarian/Universalist", "Wiccan", "Unknown", "Other"]
			},
			"Occupation": {},
			"Employer": {},
			"Insurance": {},
			"Diagnosis": {},
			"Admitted On": {},
			"Healthcare Facility": {},
			"Room": {},
			"Contact Precaution": {
				"options": ["Standard", "Contact", "Droplet", "Airborn"]
			},
			"Advanced Directive": {
				"options": ["Full Code", "No Code", "Meds Only", "No CPR"]
			},
			"Health Care Proxy": { "type": "select",
				"options": ["Yes", "No"]
			},
			"Emergency Contact": {}
		}}
	}}
	forms.intake_output = {"legend": "Intake and Output", "fields":{
	"items": {"multiple":{"duplicate": true}, "label": false, "fields":{
		"Shift": {"label":false, "type": "custom_radio", "options": ["Day", "Evening", "Night"]},
		"Intake": {"flatten":false,"fields": {
			"Oral": {"help": "in mLs"},
			"IV": {"help": "in mLs"},
			"Blood": {"help": "in mLs"},
			"Other": {"help": "in mLs"}
		}},
		"Output": {"fields": {
			"Urine": {"help": "in mLs"},
			"Stool (liquid)": {"name": "stool","help": "in mLs"},
			"Emesis": {"help": "in mLs"},
			"Gastric Tube": {"help": "in mLs"},
			"Drainage Tubes": {"help": "in mLs"},
			"Other": {}
		}}
	}}
}}

	forms.vital_signs = {"legend": "Vital Signs", "fields":{
			"items": {"multiple":{"duplicate": true}, "label": false, "fields":{

		"Blood Pressure": {"fields": {
			"Systolic": {},
			"Diastolic": {},
			"Location": {"options": ["LUE", "RUE", "Left Forearm", "Right Forearm", "Left Thigh", "Right Thigh"]},
			"Position": {"options": ["Sitting ", "Standing ", "Supine", "Prone", "Left Side Lying", "Right Side Lying"]}
		}},
		"Heart Rate": {"fields": {
			"Beats per Minute": {},
			"Location": {"options": ["Left Radial", "Right Radial", "Left Brachial", "Right Brachial", "Left Femoral", "Right Femoral"]}
			}
		},
		"Respiratory": {"fields": {
			"Breaths per Minute": {},
			"SpO2": {}
			}
		},
		"Temperature": {"fields": {
			"Temp": {"type":"number"},
			"Units": {"choices":["F", "C"], "type":"radio"},
			"Route": {"options": ["Oral", "Rectal", "Tympanic", "Core", "Axillary "]},
			"Notes": {"type": "textarea"}
			}}
		}}
	}} 
	forms.neuro = {"legend": "Neuro", "fields":{	
		"General": {"fields":{
			"Orientation": {"type": "check_collection", 
				"options": ["Person, Time, Place, Situation", " Disoriented", " Person", " Time", " Place", " Situation"]
			},
			"Behavioral / Emotional": { "type": "check_collection",
				"options": ["Calm", "Cooperative", "Restless", "Combative", "Confused", "Agitated", "Untestable"]
			},
			"Strength": { "type": "radio_collection",
				"labels": [{"name":"All"}, {"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
				"options":["Moves well on request", "Weak movement on request", "Moves well with stimulation", "Weak movement with stimulation", "No movement"]
			}
		}},
		"Pupils": {"fields":{
			"PERRLA": {"type": "check_collection",
				"options": ["Equal", "Round", "Reactive to light", "Reactive to accomodation"]
			},
			"Pupil Size (mm)": { "type": "radio_collection",
				"options": ["Left", "Right", "Both"],
				"labels": [{"name": "1"},{"name": "2"},{"name": "3"},{"name": "4"},{"name": "5"},{"name": "6"},{"name": "7"},{"name": "8"},{"name": "9"}]
			},
			"Reaction": { "type": "radio_collection",
				"options": ["Left", "Right", "Both"],
				"labels": [{"name":"Brisk"}, {"name":"Normal"}, {"name":"Sluggish"}, {"name":"Fixed"}, {"name":"Blown"}]
			},
			"Accomodate": ["Left", "Right", "Both"]
		}},
		"Glasgow Coma Score": {"fields":{
			"Eye Opening": { "type": "radio", 
				"options": ["Spontaneously", "To Speech", "To Pain", "No Response"]
			},
			"Motor Response": { "type": "radio", 
				"options": ["Obeys Verbal Command", "Localizes Pain", "Flexion Withdrawl", "Flexion Abnormal", "Extension Abnormal", "No Response"]
			},
			"Verbal Response": { "type": "radio", 
				"options": ["Oriented X 3", "Conversation Confused", "Speech Inappropriate", "Sounds Incomprehensible", "No Response"]
			}
		}},
		"Ramsey Scale": {"fields":{
			"Sedation": { "type": "radio", 
				"options": ["Anxious or Restless or Both", "Cooperative, Orientated, and Tranquil", "Responding to Commands", "Brisk Response to Stimulus", "Sluggish Response to Stimulus", "No Response to Stimulus", "Submit"]
			}
		}}
	}}

forms.pain = {"legend": "Pain", "fields":{
	"General": {"fields":{
		"Site": {},
		"Quantity": {"min": 0, "max": 10, "type": "scale", "low": "No Pain", "high": "Worst Pain Imaginable"},
		"Aggravating Factors": { "type": "check_collection",
			"options": ["Movement","Coughing","Breathing","Eating"]
		},
		"Alleviating Factors": { "type": "check_collection",
			"options": ["Rest", "Compression", "Medication", "Ice", "Immobility"]
		},
		"Quality Of Pain": { "type": "check_collection",
			"options": ["Aching", "Throbbing", "Dull", "Stabbing", "Burning", "Piercing", "Sore", "Crushing"]
		},
		"Periodicity": { "type": "radio",
			"options": ["Constant", "Intermittent "]
		},
		"Duration": {},
		"Classification": { "type": "custom_radio",
			"options": ["Chronic", "Acute"]
		},
		"Radiation": { "type": "custom_radio",
			"options": ["Yes", "No"]
		},
		"Notes": "textarea",
		"Reassessment": {"min": 0, "max": 10, "type": "scale", "low": "No Pain", "high": "Worst Pain Imaginable"}
	}}
}}

forms.iv = {"legend": "IV", "fields":{

	"General": {"fields":{
		"IV Access?": { "type": "custom_radio",
			"options": ["Yes", "No"]
		}
	}},
	"IV Site": {"multiple":{"duplicate": true},"fields":{
		"Type": { "type": "radio",
			"options": ["Saline Lock", "Peripheral IV", "PICC", "Central Venous Catheter", "Port-a-Cath"]
		},
		"Location": { "type": "radio_collection",
			"options": ["Yes", "No"],
			"labels": [{"name":"Hand"}, {"name":"Forearm"}, {"name":"Antecube"}, {"name":"Upper arm"}, {"name":"Femoral"}, {"name":"Saphenous"}, {"name":"Subclavian"}, {"name":"Jugular"}]
		},
		"Assessment": { "type": "check_collection",
			"options": [" Dressing clean and dry", "Assessed every hour", "Infusing well", "Errythema", "Edema", "Drainage", "Eccymotic", "Necrotic", "Discontinued", "Physician notified", "Warm compress", "Cold compress", "Dressing changed", "Tubing changed", "New site"]
		},
		"If new site, document catheter gauge and time initiated.":{}
	}}
}}

forms.cardiac = {"legend": "Cardiac", "fields":{
	"General": {"fields":{
		"Heart Tones": { "type": "check_collection",
			"options": ["S1, S2", "Regular", "Murmur", "Gallop", "S3", "S4", "Muffled", "Irregular", "Distant"]
		},
		"Pulses": { "type": "radio_collection",
			"labels": [{"name":"All"}, {"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
			"options": ["Absent","+1", "+2", "+3", "Bounding"]
		},
		"Edema": { "type": "radio_collection",
			"labels": [{"name":"All"}, {"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
			"options": ["None", "Non Pitting", "Slight Pitting", "Pitting", "Deep Pitting"]
		},
		"Capillary Refill": { "type": "radio_collection",
			"labels": [{"name":"All"}, {"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
			"options": ["Absent", "< 3 seconds", "> 3 seconds"]
		},
		"Skin Color and Description": { "type": "check_collection",
			"options": ["Appropriate for ethnicity", "Warm", "Dry", "Intact", "Cool", "Clammy", "Cyanotic", "Diaphoretic", "Blotchy", "Dusky", "Flushed", "Fragile", "Jaundiced", "Moist", "Mottled", "Pale", "Ashen"]
		},
		"Detail": "textarea",
		"Devices": { "type": "check_collection",
			"options": ["Pacer", "IABP", "CVP", "Pulmonary Artery Monitoring", "Cardiac Monitor", "Arterial line", "Other:"]
		}
	}}
}}
forms.respiratory = {"legend": "Respiratory", "fields":{
	"Oxygen Delivery": {"fields":{
		"Method": { "type": "check_collection",
			"options": ["Room Air", "Nasal Cannula", "Non-rebreather", "Venti mask", "Ventilator", "Other"]
		},		
		"Amount (in Liters)": {},
		"Airway Device": { "type": "check_collection",
			"options": ["Endotracheal Tube", "Tracheostomy"]
		}
	}},
	"Breath Sounds": {"fields":{
		"Left Lung (Anterior)": { "type": "radio_collection",
			"labels": [{"name":"All"}, {"name":"Upper Lobe"}, {"name":"Mid Lobe"}, {"name":"Lower Lobe"}, {"name":"Axillary"}, {"name":"All"}, {"name":"Upper Lobe"}, {"name":"Mid Lobe"}, {"name":"Lower Lobe"}],
			"options": ["Clear", "Crackles", "Rhonchi", "Wheeze", "Absent"]
		},		
		"Right Lung (Anterior)": { "type": "radio_collection",
			"labels": [{"name":"All"}, {"name":"Upper Lobe"}, {"name":"Mid Lobe"}, {"name":"Lower Lobe"}, {"name":"Axillary"}, {"name":"All"}, {"name":"Upper Lobe"}, {"name":"Mid Lobe"}, {"name":"Lower Lobe"}],
			"options": ["Clear", "Crackles", "Rhonchi", "Wheeze", "Absent"]
		},
		"Wheeze Quality": { "type": "check_collection",
			"options": ["Inspiratory", "Expiratory", "Low pitched", "High pitched"]
		},
		"Stridor": { "type": "radio",
			"options": ["Present", "Absent"]
		}
	}},
	"Cough": {"options": ["None", "Dry", "Productive"]},
	"Sputum": {"fields":{
		"Color": { "type": "check_collection",
			"options": ["None", "Clear", "White", "Creamy", "Yellow", "Green", "Bloody", "Blood tinged", "Tan", "Black"]
		},
		"Consistency": { "type": "radio",
			"options": ["None", "Thin", "Thick"]
		},
		"Amount": { "type": "radio",
			"options": ["None", "Small", "Moderate", "Copious"]
		}
	}},
	"Respirations": {"fields":{
		"Respirations": {"label":"Respirations", "type": "check_collection",
			"options": ["Unlabored", "Labored", "Shallow", "Gasping", "Grunting", "Nasal Flaring", "Cheyne-Stokes", "Kussmaul", "Apneic", "Tachypnea"]
		},
		"Retractions": { "type": "check_collection",
			"options": ["Supracostal", "Intercostal", "Subcostal", "Substernal"]
		},
		"Other Respiratory Symptoms": { "type": "check_collection",
			"options": ["None", "Shortness of Breath", "Difficulty Breathing at Rest", "Difficulty Breathing with Activity", "Cyanosis", "Kussmaul"]
		},
		"Other": {}
	}}
}}

forms.gi = {"legend": "Gastrointestinal", "fields":{

	"General": {"fields":{
		"Abdominal Description": {
			"help": "All",
			"type": "check_collection",
			"options": ["Soft", "Flat", "Non Distended", "Non Tender", "Firm", "Distended", "Rounded", "Rigid", "Sunken", "Tender", "Guarded", "Other:"]
		},

		"Abdominal Description (details)": { "type": "radio_collection",
			"labels": [{"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
			"options": ["Non Tender", "Tender", "Guarding", "Rebound pain", "Other:"]
		},

		"Gi Symptoms": {"type": "check_collection",
			"options": [" None", "Anorexia", "Belching", "Vomiting", "Heartburn", "Nausea", "Epl. Pain", "Cramping", "Constipation", "Diarrhea", "Abd. Pain", "Flatulence", "Hiccup", "Incontinence", "Insatiately"]
		},
		"Bowel Sounds": {
			"labels": [{"name":"All"}, {"name":"LUQ"}, {"name":"RUQ"}, {"name":"LLQ"}, {"name":"RLQ"}],
			"options": ["Present", "Hyperactive", "Hypoactive", "Absent"]
		},
		"Diet Tolerance": {
			"options": ["Good", "Fair", "Poor", "N/A"]
		},
		"Output": {"fields":{
			"Stool": {"type": "check_collection",
				"options": ["Soft", "Hard", "Liquid", "Formed", "Frothy", "Clots", "Loose", "Mucous", "Large", "Small", "Pasty", "Seedy", "Tarry", "Watery", "Brown", "Black", "Blood, Frank", "Blood, Tinged", "Clay", "Green", "Maroon", "Yellow", "Tan"]
			},
			"Emesis": {"type": "check_collection",
				"options": ["Clear", "Frothy", "Blood, Tinged", "Billious", "Green", "Bloody", "Coffee Ground", "Food Content", "Projectile"]
			}
		}},
		"Gastric Tubes": {"fields": {
			"Location": {"type": "radio",
				"options": ["Nasogastric, Left Nare", "Nasogastric, Right Nare", "Orogastric", "Gastric"]
			},
			"Size": {"help": "Fr"},
			"Depth": {"help": "cm"},
			"Measure At": {"type": "radio",
				"options": ["Nare", "Lip", "Teeth", "Skin Insertion"]
			}
		}},
		"Ostomy": {"fields": {
			"Location": {"type": "radio",
				"options": ["LUQ", "RUQ", "LLQ", "RLQ"]
			},
			"Appliance Changed": {},
			"Type": {
				"options": ["Colostomy", "Ileostomy"]
			},
			"Site Description": "textarea"
		}},
		"Diet": {"fields":{
			"Diet": { "label":"Diet Ordered", "type": "check_collection",
				"options": ["Regular", "Clear Liquids", "NPO", "Low Fat", "Low Sodium", "1800 cal ADA", "Tube Feeds", "Soft Mechanical", "TPN", "Pureed", "Cardiac"]
			},
			"Amount of Meal Consumed": { "type": "scale", "min": 1, "max": 5, "high": "100%", "low": "0%"}
		}},
		"Abdominal Girth": {"fields":{
			"Size": {"help": "cm"},
			"Measured At": {}
		}}
	}}
}}

forms.gu = {"legend": "Genitourinary", "fields":{
	"General": {"fields":{
		"Urinary Symptoms" : { "help": "Check all that apply", "type": "check_collection",
			"options": ["None", "Dysuria", "Frequency", "Urgency", "Oliguria", "Polyuria", "Anuria", "Incontinence, Stress", "Incontinence, Complete", "Hematuria", "Nocturia", "Urinary Retention", "Diffculty Starting Stream", "Hesitancy"]
		},
		"Urine Color": {
			"options": ["Yellow", "Amber", "Orange", "Brown", "Pink", "Green", "Blue", "Not Visualized"]
		},
		"Urine Character": {
			"options": ["Clear", "Cloudy", "Concentrated", "Dilute", "Sediment", "Bloody", "Clots", "Frothy", "Purulent"]
		},
		"Urinary Elimination": {
			"options": ["Voiding w/o Difficulty", "Voiding with Difficulty", "Indwelling Catheter", "Inability to Void", "Straight Catheter", "Self Catheter", "Condom Catheter", "Surapubic Catheter", "3-way Indwelling Catheter", "Urostomy", "Nephrostomy Tube", "Dialysis"]
		},
		"Amount": {},
		"Catheter": {"fields": {
			"Catheter Size": {"help": "Fr"},
			"Volume in Balloon": { "help": "mL"},
			"Site Description": "textarea"
		}},
		"Genitalia Exam":{"fields": { "exam": {"label": false, "type": "textarea"}}},
		"SANE (Sexual Assault Nurse Examiners) Exam":{"fields": { "exam": {"label": false, "type": "textarea"}}}
	}}
}}

forms.musculoskeletal = {"legend": "Musculoskeletal", "fields":{
	"General": {"fields":{
		"Musculoskeletal Symptoms": {"type": "check_collection",
			"options": ["None", "Pain", "Joint Swelling", "Joint Stiffness", "Contractures", "Deformities", "Crepitus", "Weakness", "Amputation", "Other"]
		},
		"Muscle Tone/Strength": {"fields": {
			"Motor Strength Grade": { "type": "radio_collection",
				"labels": [{"name":"All"}, {"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
				"options": ["Normal", "Average Weakness", "Poor ROM", "Severe Weakness", "Paralysis"]
			},
			"Range of Motion": { "type": "radio_collection",
				"labels": [{"name":"All"}, {"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
				"options": ["Full ROM", "Impaired ROM"]
			},
			"Characteristic": { "type": "radio_collection",
				"labels": [{"name":"All"}, {"name":"LUE"}, {"name":"RUE"}, {"name":"LLE"}, {"name":"RLE"}],
				"options": ["Spasm", "Contracture", "Atrophy", "Paralysis"]
			}
		}},
		"Weight Bearing/Gate": {"fields": {
			"Gate": {
				"type": "check_collection",
				"help": "Check all that apply",
				"options": ["None", "Steady", "Independent", "Unsteady", "Dependent", "Asymmetrical", "Jerky", "Shuffling", "Spastic", "N/A", "Other:"]
			},
			"Ambulatory Device": {
				"options": ["None", "Cane", "Crutches", "Walker", "Wheelchair", "Bedfast", "Artificial Limb", "M/A"]
			}
		}}
	}}
}}

forms.skin = {"legend": "Skin Assessment", "fields":{
	"General": {"fields":{
		"skin": { "type": "check_collection", "label": false,
			"options": ["Warm", "Dry", "Intact", "Skin color appropriate for ethnicity", "Yellow", "Dusky", "Pale", "Ruddy", "Cool", "Diaphoretic", "Lesion(s) noted", "Wound(s) noted", "Pressure ulcers noted"]
		},
		"Lesions": { 
			"type": "textarea",
			"help": "If lesions were noted, document characteristics including color, consistency, measurements and location."
		},
		"Wounds": {
			"type": "textarea",
			"help": "If wounds were noted, document REEDA, COCA, and location."
		},
		"Pressure Ulcers": {
			"type": "textarea",
			"help": "If pressure ulcers were noted, document stage, measurements, and location."
		},
		"Other": {
			"type": "textarea"
		}
	}}
}}

forms.mental = {"legend": "Mental Status", "fields":{
	"General": {"fields":{
		"Behavior/Affect": { "type": "check_collection",
			"options": ["Calm", "Cooperative", "Appropriate", "Restless", "Combative", "Confused", "Agitated", "Anxious", "Depressed", "Crying", "Fearful", "Hostile", "Inappropriate"]
		},		
		"Coping": { "type": "radio",
			"options": ["Well", "Fair", "Poor", "Ineffective"]
		},		
		"Consult": { "type": "check_collection",
			"options": ["Chaplain", "Social Work", "Psychiatry"]
		},	
		"At Risk for": { "type": "check_collection",
			"options": ["Homocidal", "Suicidal"]
		},
	}},
	"Abuse": {"fields":{
		"Check the appropriate box(es) that indicate the patient's risk for abuse.": { 
			"type": "check_collection",
			"options": ["Physical", "Sexual", "Psychological", "Property"]
		},
		"Detail assessments that suggest abuse": "textarea"
	}},
	"Narrative Note": {"fields":{
		"note": {"type": "textarea", "label": false}
	}}
}}


forms.notes = {"legend": "Nursing Notes", "fields":{
	"Date and Time": {"type": "datetime-local", "help": "Example: 03/05/2013 11:30 AM"},
	"Notes": "textarea",
	"Signature": {}
}}


forms.physicians_orders = {"legend": "Physician Orders", "fields": {
	"order": {"multiple":{"duplicate": true}, "label": false, "fields":{
		"Date": "",
		"Time": "",
		"Order": "",
		"Physician": "",
		"Verified by": ""
	}}
}}

forms.history_and_physical = {"legend": "History and Physical", "fields":{
	"Completed On": "",
	"History of Present Condition": {"type": "textarea"},
	"Past Medical History": {"type": "textarea"},
	"Past Surgical History": {"type": "textarea"},
	"Social History": {"type": "textarea"},
	"Regular Medications": {"type": "textarea"},
	"Immunizations": {"type": "textarea"},
	"Allergies": {"type": "textarea"},
	"Vital Signs": {"type": "textarea"},
	"Neuro": {"type": "textarea"},
	"HEENT": {"type": "textarea"},
	"Cardiac": {"type": "textarea"},
	"Respiratory": {"type": "textarea"},
	"GI": {"type": "textarea"},
	"GU": {"type": "textarea"},
	"Skin": {"type": "textarea"},
	"Musculoskeletal": {"type": "textarea"},
	"Plan": {"type": "textarea"},
	"Dictated By": ""
}}


forms.ct_scan = {"legend": "CT Scan", "fields": {
		"Procedure Date": "",
		"Procedure": "",
		"Indication": "",
		"Report": {"type": "textarea"},
		"Impression": "",
		"Dictated By": ""
	}}

forms.medication_administration_reco = {"legend": "Medication", "fields":{
	"n0": {"parsable": false, "label": "Scheduled", "fields":{}},
	"Scheduled": {"multiple":{"duplicate": true}, "label": false, "fields":{
			"Order Date": "",
			"Order Text": "",
			"Scheduled Time": "2400",
			"Has been Administered": {"type": "checkbox"},
			"Reason Not Administered": "",
			"Admin Initials": ""
	}},
	"n1": {"parsable": false, "label": "PRN", "fields":{}},
	"PRN": {"multiple":{"duplicate": true}, "label": false, "fields":{
			"Order Date": "",
			"Order Text": "",
			"Last Admin Time": "2400",
			"Recently Administered": {"type": "checkbox"},
			"Admin Initials": ""
	}},
	"n2": {"parsable": false, "label": "Discontinued", "fields":{}},
	"Discontinued": {"multiple":{"duplicate": true}, "label": false, "fields":{
			"Order Date": "",
			"Order Text": "",
			"Last Admin Time": "",
			"Last Admin Date": "",
			"Discontinued Time": "",
			"Discontinued Date": ""
	}}

}}

forms.labs = {"legend": "Labs", "fields":{	

	"Items": {"multiple":{"duplicate": true}, "label": false, "fields":{
		"Name": "",
		"Label": "",
		"n3": {"parsable": false,"offset": "2","columns": "10", "label": "Sets", "fields":{}},

		"Sets": {"offset": "2","columns": "10", "multiple": {"duplicate": true}, "label": false, "fields":{
				"Date": {},
				"Data": {"type":"tagsEditor", "acceptObject": true}
		}},
		"n2": {"parsable": false,"offset": "2", "columns": "10", "label": "Fields", "fields":{}},
		"Fields": {"offset": "2", "columns": "10", "multiple": {"duplicate": true}, "label": false, "fields":{
				"Name": {},
				"Units": {},
				"Range": {},
				"Normals": {}
		}}
	}}
}}
