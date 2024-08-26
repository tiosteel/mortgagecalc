import ControllerExtension from 'sap/ui/core/mvc/ControllerExtension';
import ExtensionAPI from 'sap/fe/templates/ObjectPage/ExtensionAPI';
import Context from 'sap/ui/model/Context';

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