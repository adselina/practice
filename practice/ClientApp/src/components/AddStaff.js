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
exports.AddStaff = void 0;
var React = require("react");
var FetchStaff_1 = require("./FetchStaff");
var AddStaff = /** @class */ (function (_super) {
    __extends(AddStaff, _super);
    function AddStaff(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            title: window.location.pathname.split("/").pop(), loading: true, postsList: [], companyList: [], empData: new FetchStaff_1.StaffData
        };
        fetch('api/post')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ postsList: data });
        });
        fetch('api/company')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ companyList: data });
        });
        var empid = _this.props.match.params["empid"];
        if (_this.state.title == "addstaff") {
            _this.state = { title: "create", loading: false, postsList: [], companyList: [], empData: new FetchStaff_1.StaffData };
        }
        else
            (fetch('api/staff/edit/' + empid)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ title: "edit", loading: false, empData: data });
            }));
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        return _this;
    }
    AddStaff.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm(this.state.postsList, this.state.companyList);
        return React.createElement("div", null,
            React.createElement("h2", null, "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438"),
            React.createElement("hr", null),
            contents);
    };
    // This will handle the submit form event.  
    AddStaff.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.empData.id) {
            fetch('api/staff/edit', {
                method: 'PUT',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/database?type=Сотрудники");
            });
        }
        // POST request for Add employee.  
        else {
            fetch('api/staff/create', {
                method: 'POST',
                body: data,
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/database?type=Сотрудники");
            });
        }
    };
    // This will handle Cancel button click event.  
    AddStaff.prototype.handleCancel = function (e) {
        e.preventDefault();
        this.props.history.push("/database?type=Сотрудники");
    };
    AddStaff.prototype.onlyNumbers = function (e) {
        var re = /[0-9]+/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    };
    ;
    // Returns the HTML Form to the render() method.  
    AddStaff.prototype.renderCreateForm = function (postsList, companyList) {
        var _this = this;
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "id", value: this.state.empData.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "name" }, "\u0424\u0418\u041E"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "name", defaultValue: this.state.empData.name, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "dateOfBirth" }, "\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { type: "date", name: "dateOfBirth", defaultValue: this.state.empData.dateOfBirth.toString().split('T')[0], required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: " dateOfHire" }, "\u0414\u0430\u0442\u0430 \u043F\u0440\u0438\u043D\u044F\u0442\u0438\u044F \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { type: "date", name: "dateOfHire", defaultValue: this.state.empData.dateOfHire.toString().split('T')[0], required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "contact" }, "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", minLength: 11, maxLength: 11, type: "text", onKeyPress: function (e) { return _this.onlyNumbers(e); }, name: "contact", defaultValue: this.state.empData.contact, required: true }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "post" }, "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "post", defaultValue: this.state.empData.post, required: true },
                        React.createElement("option", { value: "" }, "-- \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C --"),
                        postsList.map(function (post) {
                            return React.createElement("option", { key: post.id, value: post.postname }, post.postname);
                        })))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "company" }, "\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "company", defaultValue: this.state.empData.company, required: true },
                        React.createElement("option", { value: "" }, "-- \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B--"),
                        companyList.map(function (comp) {
                            return React.createElement("option", { key: comp.id, value: comp.techObjectName }, comp.techObjectName);
                        })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "\u041E\u0442\u043C\u0435\u043D\u0430"))));
    };
    return AddStaff;
}(React.Component));
exports.AddStaff = AddStaff;
//# sourceMappingURL=AddStaff.js.map