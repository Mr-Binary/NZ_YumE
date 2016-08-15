import {IApp} from "../models/dataModels/IApp";
import {IStateService} from "../models/serviceModels/IStateService";
import {ITemplatingService} from "../models/serviceModels/ITemplatingService";
import {ISystemService} from "../models/serviceModels/ISystemService";
import {IActionService} from "../models/serviceModels/IActionService";
import {application} from "../../application/application";
import {StateService} from "../services/StateService";
import {TemplatingService} from "../services/TemplatingService";
import {SystemService} from "../services/SystemService";
import {ActionService} from "../services/ActionService";

export class emulator{
    _app:IApp;
    _stateService:IStateService;
    _templatingService:ITemplatingService;
    _systemService:ISystemService;
    _actionService:IActionService;

    /**
     * [constructor description]
     * @method constructor
     * @return {[type]}    [description]
     */
    constructor() {
        this._app = new application();
        this._stateService = new StateService(this._app);
        this._templatingService = new TemplatingService(this._stateService);
        this._systemService = new SystemService(this._templatingService,this._stateService);
        this._actionService = new ActionService(this._systemService);
        this._app.injectActionService(this._actionService);
        this._app.startAddingPages();
    }

    /**
     * [startEmulator description]
     * @method startEmulator
     * @return {[type]}      [description]
     */
    startEmulator(){
        this._systemService.showSplashScreen();
        setTimeout(this._systemService.hideSplashScreen,3900);
    }

    /**
     * [startRenderApp description]
     * @method startRenderApp
     * @return {[type]}       [description]
     */
    startRenderApp(){
        this._systemService.renderAllPages();
        this._systemService.goStartPage();
    }
}

let es = new emulator();
es.startEmulator();
es.startRenderApp();
