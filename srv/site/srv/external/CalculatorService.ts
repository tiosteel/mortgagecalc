import cds from '@sap/cds';

export default cds.service.impl(async function() {
	const { Contracts } = this.entities;
	const service = await cds.connect.to('calculatorService');

	this.on('*', Contracts, request => {
		return service.tx(request).run(request.query);
	});
});