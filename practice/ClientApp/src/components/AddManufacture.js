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
exports.AddManufacture = void 0;
var React = require("react");
var FetchManufacture_1 = require("./FetchManufacture");
var AddManufacture = /** @class */ (function (_super) {
    __extends(AddManufacture, _super);
    function AddManufacture(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            title: window.location.pathname.split("/").pop(), loading: true, staffList: [], typeList: [], enterpriseList: [], mData: new FetchManufacture_1.ManufactureData
        };
        //Всех сотрудников
        fetch('api/staff')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ staffList: data });
        });
        //Все виды производств
        fetch('api/manufacturetype')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ typeList: data });
        });
        //Все предприятия
        fetch('api/allenterprise')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ enterpriseList: data });
        });
        console.log(_this.state.enterpriseList);
        var empid = _this.props.match.params["empid"];
        if (_this.state.title == "addmanufacture") {
            _this.state = { title: "create", loading: false, staffList: [], enterpriseList: [], typeList: [], mData: new FetchManufacture_1.ManufactureData };
        }
        else
            (fetch('api/manufacture/edit/' + empid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "edit", loading: false, mData: data });
            }));
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddManufacture.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm(this.state.staffList, this.state.typeList, this.state.enterpriseList);
        return React.createElement("div", null,
            React.createElement("h2", null, "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430"),
            React.createElement("hr", null),
            contents);
    };
    // This will handle the submit form event.  
    AddManufacture.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.mData.id) {
            fetch('api/manufacture/edit', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/database?type=Производства");
            });
        }
        // POST request for Add employee.  
        else {
            fetch('api/manufacture/create', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/database?type=Производства");
            });
        }
    };
    // This will handle Cancel button click event.  
    AddManufacture.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/database?type=Производства");
    };
    AddManufacture.prototype.onlyNumbers = function (e) {
        var re = /[0-9]+/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };
    ;
    // Returns the HTML Form to the render() method.  
    AddManufacture.prototype.renderCreateForm = function (staffList, typeList, entList) {
        var _this = this;
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "id", value: this.state.mData.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "name" }, "\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435"),
                React.createElement("div", { className: "col-md-5" },
                    React.createElement("input", { className: "form-control", type: "text", name: "name", defaultValue: this.state.mData.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "head" }, "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C"),
                React.createElement("div", { className: "col-md-5" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "head", defaultValue: this.state.mData.head, required: true },
                        React.createElement("option", { value: "" }, "-- \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0430 --"),
                        staffList.map(function (staff) {
                            return React.createElement("option", { key: staff.id, value: staff.name }, staff.name);
                        })))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "type" }, "\u0412\u0438\u0434 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430"),
                React.createElement("div", { className: "col-md-5" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "type", defaultValue: this.state.mData.type, required: true },
                        React.createElement("option", { value: "" }, "-- \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0438\u0434 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430 --"),
                        typeList.map(function (typ) {
                            return React.createElement("option", { key: typ.id, value: typ.manufactureTypeName }, typ.manufactureTypeName);
                        })))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "enterprise" }, "\u041F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u0435"),
                React.createElement("div", { className: "col-md-5" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "enterprise", defaultValue: this.state.mData.enterprise, required: true },
                        React.createElement("option", { value: "" }, "-- \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u043C\u0443 \u043F\u0440\u0435\u043D\u0430\u0434\u043B\u0435\u0436\u0438\u0442 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E --"),
                        entList.map(function (ent) {
                            return React.createElement("option", { key: ent.id, value: ent.enterpriseNameS }, ent.enterpriseNameS);
                        })))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "contact" }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"),
                React.createElement("div", { className: "col-md-5" },
                    React.createElement("input", { className: "form-control", minLength: 11, maxLength: 11, type: "text", name: "contact", onKeyPress: function (e) { return _this.onlyNumbers(e); }, defaultValue: this.state.mData.contact, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "email" }, "\u041F\u043E\u0447\u0442\u0430"),
                React.createElement("div", { className: "col-md-5" },
                    React.createElement("input", { className: "form-control", type: "text", name: "email", defaultValue: this.state.mData.email, required: true }))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "\u041E\u0442\u043C\u0435\u043D\u0430"))));
    };
    return AddManufacture;
}(React.Component));
exports.AddManufacture = AddManufacture;
//# sourceMappingURL=AddManufacture.js.map