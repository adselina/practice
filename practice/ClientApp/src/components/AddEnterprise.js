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
exports.AddEnterprise = void 0;
var React = require("react");
var FetchEnterprise_1 = require("./FetchEnterprise");
var AddEnterprise = /** @class */ (function (_super) {
    __extends(AddEnterprise, _super);
    function AddEnterprise(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            title: window.location.pathname.split("/").pop(), loading: true, staffList: [], entData: new FetchEnterprise_1.EnterpriseData
        };
        //Всех сотрудников
        fetch('api/staff')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ staffList: data });
        });
        var empid = _this.props.match.params["empid"];
        if (_this.state.title == "addenterprise") {
            _this.state = { title: "create", loading: false, staffList: [], entData: new FetchEnterprise_1.EnterpriseData };
        }
        else
            (fetch('api/enterprise/edit/' + empid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "edit", loading: false, entData: data });
            }));
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddEnterprise.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm(this.state.staffList);
        return React.createElement("div", null,
            React.createElement("h2", null, "\u041F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u044F"),
            React.createElement("hr", null),
            contents);
    };
    // This will handle the submit form event.  
    AddEnterprise.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.entData.id) {
            fetch('api/enterprise/edit', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/database?type=Предприятия");
            });
        }
        // POST request for Add employee.  
        else {
            fetch('api/enterprise/create', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/database?type=Предприятия");
            });
        }
    };
    // This will handle Cancel button click event.  
    AddEnterprise.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/database?type=Предприятия");
    };
    AddEnterprise.prototype.onlyNumbers = function (e) {
        var re = /[0-9]+/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };
    ;
    // Returns the HTML Form to the render() method.  
    AddEnterprise.prototype.renderCreateForm = function (staffList) {
        var _this = this;
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "id", value: this.state.entData.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "name" }, "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "name", defaultValue: this.state.entData.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "head" }, "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "head", defaultValue: this.state.entData.head, required: true },
                        React.createElement("option", { value: "" }, "-- \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430 --"),
                        staffList.map(function (staff) {
                            return React.createElement("option", { key: staff.id, value: staff.name }, staff.name);
                        })))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "contact" }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", minLength: 11, maxLength: 11, type: "text", name: "contact", onKeyPress: function (e) { return _this.onlyNumbers(e); }, defaultValue: this.state.entData.contact, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "email" }, "\u041F\u043E\u0447\u0442\u0430"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "email", defaultValue: this.state.entData.email, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "inn" }, "\u0418\u041D\u041D (10 \u0446\u0438\u0444\u0440)"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", minLength: 10, maxLength: 10, type: "text", onKeyPress: function (e) { return _this.onlyNumbers(e); }, name: "inn", defaultValue: this.state.entData.inn, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "ogrn" }, "\u041E\u0413\u0420\u041D (13 \u0446\u0438\u0444\u0440)"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", minLength: 13, maxLength: 13, type: "text", onKeyPress: function (e) { return _this.onlyNumbers(e); }, name: "ogrn", defaultValue: this.state.entData.ogrn, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "\u041E\u0442\u043C\u0435\u043D\u0430"))));
    };
    return AddEnterprise;
}(React.Component));
exports.AddEnterprise = AddEnterprise;
//# sourceMappingURL=AddEnterprise.js.map