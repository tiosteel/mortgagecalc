import ControllerExtension from 'sap/ui/core/mvc/ControllerExtension';

/**
 * @namespace mortgagecalc.mortgageform.ext.conroller.ObjectPageExtension
 */
export default class ObjectPageExtension extends ControllerExtension<ExtensionAPI> {

    static overrides = {
        editFlow: {
			onBeforeSave(this: ObjectPageExtension) {
                const extenstionAPI = this.base.getExtensionAPI();
				const oContext = extenstionAPI.getBindingContext() as Context;
                oContext.getModel().attachEventOnce('dataReceived', () => {
                    extenstionAPI.refresh();
                });
			}
		}
    }
}