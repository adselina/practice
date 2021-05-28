"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListOfComponents = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var reactstrap_1 = require("reactstrap");
var ListOfComponents = /** @class */ (function (_super) {
    __extends(ListOfComponents, _super);
    function ListOfComponents(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { number_of_components: [], loading: true };
        fetch('api/List')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ number_of_components: data, loading: false });
        });
        return _this;
    }
    ListOfComponents.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderListOfComponents(this.state.number_of_components);
        return (React.createElement("div", null, contents));
    };
    // Returns the HTML table to the render() method.  
    ListOfComponents.prototype.renderListOfComponents = function (comp) {
        var _this = this;
        return (React.createElement(reactstrap_1.ListGroup, null, Object.entries(comp).map(function (_a) {
            var key = _a[0], value = _a[1];
            return React.createElement(reactstrap_1.ListGroupItem, { onClick: function () { return _this.props.setTable(key); }, className: "justify-content-between", tag: react_router_dom_1.Link },
                " ",
                key,
                React.createElement(reactstrap_1.Badge, { pill: true },
                    " ",
                    value,
                    " "));
        })));
    };
    return ListOfComponents;
}(React.Component));
exports.ListOfComponents = ListOfComponents;
//# sourceMappingURL=ListOfComponents.js.map