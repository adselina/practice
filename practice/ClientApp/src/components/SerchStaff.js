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
exports.SerchStaff = void 0;
var React = require("react");
var SerchStaff = /** @class */ (function (_super) {
    __extends(SerchStaff, _super);
    function SerchStaff(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            title: "d", loading: false, fieldList: [], selectedFild: "", selectedValue: ""
        };
        _this.handleSearch = _this.handleSearch.bind(_this);
        return _this;
    }
    SerchStaff.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderSerchForm();
        return React.createElement("div", null, contents);
    };
    //private handleFind(event: any) {
    //    event.preventDefault();
    //    const data = new FormData(event.target);
    //}
    //public handleSelect(value: any) {
    //    this.setState({ selectedFild: value })
    //}
    //public handleChange(value: any) {
    //    this.setState({ selectedValue: value })
    //}
    SerchStaff.prototype.handleSearch = function (event) {
        event.preventDefault();
        //console.log(event.target.field.value, event.target.value.value);
        this.props.Search(event.target.field.value, event.target.value.value);
    };
    SerchStaff.prototype.renderSerchForm = function () {
        var _this = this;
        return (React.createElement("form", { onSubmit: this.handleSearch },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-5" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "field", required: true },
                        React.createElement("option", { value: "" }, "-- \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440 \u0434\u043B\u044F \u043F\u043E\u0438\u0441\u043A\u0430--"),
                        React.createElement("option", { value: "Fullname" }, "\u0424\u0418\u041E"),
                        React.createElement("option", { value: "Postname" }, "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C"),
                        React.createElement("option", { value: "TechObjectName" }, "\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B"))),
                React.createElement("input", { className: "form-control col-md-5", type: "text", name: "value", required: true }),
                React.createElement("button", { type: "submit", className: "btn btn-primary col ml-2" }, "\u041F\u043E\u0438\u0441\u043A..."),
                React.createElement("button", { type: "button", className: "btn btn-outline-primary col ml-2", onClick: function () { return _this.props.Remove(); } }, "X"))));
    };
    return SerchStaff;
}(React.Component));
exports.SerchStaff = SerchStaff;
//# sourceMappingURL=SerchStaff.js.map