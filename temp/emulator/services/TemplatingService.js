///<reference path="../ui/types/jquery.d.ts" />
"use strict";
var TemplatingService = (function () {
    /**
     * Constructs the service state
     * @method constructor
     * @param  {IStateService} stateService - provides the service state
     * @return {[type]}                     - returns service template
     */
    function TemplatingService(stateService) {
        this._stateService = stateService;
    }
    TemplatingService.prototype.createPage = function (page) {
        var _this = this;
        var outDiv = this.createLayout();
        var _loop_1 = function(element1) {
            var row = this_1.createjQueryItem("div", undefined, "row", undefined);
            var element = element1;
            switch (element.type) {
                case "button":
                    var temp = this_1.createjQueryItem("button", [{ key: "id", value: element.name }], "btn btn-primary btn-lg btn-block", //btn-block
                    element.define);
                    if (element.targetElementID) {
                        $(".emulator").on('click', "#" + element.name, function () {
                            var targetText = $("#" + element.targetElementID).val();
                            _this._stateService.emulatorCentralCallBack(element, targetText);
                        });
                    }
                    else {
                        $(".emulator").on('click', "#" + element.name, function () {
                            _this._stateService.emulatorCentralCallBack(element);
                        });
                    }
                    if ($(".btn", outDiv).length) {
                        buttons = $(".btn", outDiv);
                        var width = 12 / (buttons.length + 1);
                        buttons.after(temp);
                        buttons = $(".btn", outDiv); //to capture new button too
                        buttons.removeClass("btn-block");
                        buttons.addClass("col-sm-" + width);
                    }
                    else {
                        row.append(temp);
                    }
                    break;
                case "text":
                    var temp1 = this_1.createjQueryItem("p", [{ key: "id", value: element.name }], undefined, element.define);
                    row.append(temp1);
                    break;
                case "image":
                    var temp2 = this_1.createjQueryItem("img", [{ key: "id", value: element.name }, { key: "src", value: element.define }], "img-fluid");
                    row.append(temp2);
                    break;
                case "input":
                    var temp3 = this_1.createjQueryItem("div", undefined, "form-group");
                    var label = this_1.createjQueryItem("label", [{ key: "for", value: element.name }], "sr-only", element.define);
                    temp3.append(label);
                    var input = this_1.createjQueryItem("input", [{ key: "type", value: "text" }, { key: "id", value: element.name }, { key: "for", value: element.name }, { key: "placeholder", value: element.define }], "form-control", element.define);
                    temp3.append(input);
                    row.append(temp3);
                    break;
                case "list":
                    var listGroup = this_1.createjQueryItem("div", undefined, "list-group");
                    var listItemsData = (element.define);
                    var _loop_2 = function(item) {
                        var a = this_1.createjQueryItem("a", undefined, "list-group-item list-group-item-action");
                        $(".emulator").on('click', "#" + element.name, function () {
                            _this._stateService.emulatorCentralCallBack(element, item.url);
                        });
                        var h5 = this_1.createjQueryItem("h5", undefined, "list-group-item-heading", item.title);
                        var p = this_1.createjQueryItem("p", undefined, "list-group-item-text", item.description);
                        a.append(h5);
                        a.append(p);
                        listGroup.append(a);
                    };
                    for (var _i = 0, listItemsData_1 = listItemsData; _i < listItemsData_1.length; _i++) {
                        var item = listItemsData_1[_i];
                        _loop_2(item);
                    }
                    row.append(listGroup);
                    break;
            }
            outDiv.append(row);
        };
        var this_1 = this;
        var buttons;
        for (var _a = 0, _b = page.rawLayout; _a < _b.length; _a++) {
            var element1 = _b[_a];
            _loop_1(element1);
        }
        return outDiv;
    };
    TemplatingService.prototype.createPagesAndSave = function () {
        for (var _i = 0, _a = this._stateService.getPages(); _i < _a.length; _i++) {
            var page = _a[_i];
            page.afterRenderLayout = this.createPage(page);
        }
    };
    TemplatingService.prototype.createLayout = function () {
        return this.createjQueryItem('div', undefined, "container-fluid");
    };
    TemplatingService.prototype.removeElementFromDOM = function (className) {
        $(className).remove();
    };
    TemplatingService.prototype.createjQueryItem = function (type, attrs, styleClasses, text) {
        var domElement = $(document.createElement(type));
        if (styleClasses) {
            domElement.addClass(styleClasses);
        }
        if (attrs) {
            for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
                var item = attrs_1[_i];
                domElement.attr(item.key, item.value);
            }
        }
        if (text) {
            domElement.html(text);
        }
        return domElement;
    };
    return TemplatingService;
}());
exports.TemplatingService = TemplatingService;
//# sourceMappingURL=TemplatingService.js.map