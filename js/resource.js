pages = {
	medical_admin_record: function() {
		Berry.register({
			type: 'file',
			setup: function() {
				this.$el = this.self.find('input');
				this.$el.off();
				if(this.onchange !== undefined) {
					this.$el.on('change', this.onchange);
				}
				this.$el.on('change', $.proxy(function(){this.trigger('change');},this));
			}
		});
		$('[data-order-text]').on('click', function(e){
			$().berry({legend: 'Confirmation', fields: [
				{label: 'Patient', type: 'file', name:'patient', required: true, help: e.currentTarget.dataset.name},
				{label: 'Prescription', type: 'file', name:'prescription', required: true,help: e.currentTarget.dataset.orderText},
				{label: 'Confirm', value:getNodeIndex(e.currentTarget.parentNode) , type: 'hidden', required: true}
			]}).on('save', function() {
				if(this.validate()) {
					session.medication_administration_record = session.medication_administration_record || {scheduled:[]};
					var position = parseInt(this.toJSON().confirm, 10);
					var length = session.medication_administration_record.scheduled.length;
					if(position > length){
						for(var i=length;i<position;i++)					
							session.medication_administration_record.scheduled[i] = {has_been_administered: false};
					}
					session.medication_administration_record.scheduled[position-1] = {has_been_administered: true};
					store();
					this.trigger('saved');
				}
			})
			.on('saved', function(){load(true)})
			// .on('change:patient', function(item){
			// 	qrcode.callback = function(data){
			// 		console.log(data)
			// 	}
			// 	processFile.call(this.findByID(item.id).$el[0]);
			// })
			.on('change', function(item){
				qrcode.callback = function(data){
					console.log(data)
				}
				processFile.call(this.findByID(item.id).$el[0]);
			})
		})
	}
};