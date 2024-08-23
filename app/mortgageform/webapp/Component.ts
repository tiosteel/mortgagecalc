import BaseComponent from "sap/fe/core/AppComponent";
import oDataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace mortgagecalc.mortgageform
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json"
	};

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
	public init() : void {
        const oModel : oDataModel | undefined = this.getModel();

        oModel?.attachDataRequested(() => {
            oModel?.attachDataReceived(this.refreshModel);
        });

        super.init();
	};

    public refreshModel() : void {
        const oModel : oDataModel | undefined = this.getModel();

        oModel?.detachDataReceived(this.refreshModel);
        oModel?.refresh();
    }
}