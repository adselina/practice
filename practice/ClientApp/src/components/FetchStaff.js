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
exports.StaffData = exports.FetchStaff = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var SerchStaff_1 = require("./SerchStaff");
var FetchStaff = /** @class */ (function (_super) {
    __extends(FetchStaff, _super);
    function FetchStaff(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { searchList: [], stafflist: [], loading: true, };
        if (_this.state.stafflist.length == 0) {
            fetch('api/staff')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ searchList: data, stafflist: data, loading: false });
            });
        }
        // This binding is necessary to make "this" work in the callback  
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.handleEdit = _this.handleEdit.bind(_this);
        return _this;
    }
    FetchStaff.prototype.render = function () {
        var _this = this;
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderStaffTable(this.state.searchList);
        return (React.createElement("div", null,
            React.createElement("h1", null, "\u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u0438"),
            React.createElement("div", null,
                React.createElement(react_router_dom_1.Link, { to: "/addstaff" }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C..."),
                React.createElement(SerchStaff_1.SerchStaff, { Search: function (type, value) { return _this.ChangeSerch(type, value); }, Remove: function () { return _this.RemoveSearch(); } })),
            contents));
    };
    FetchStaff.prototype.ChangeSerch = function (type, value) {
        var _this = this;
        console.log(type, value);
        this.setState({ loading: true });
        fetch("api/staff/" + type + "-" + value)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ searchList: data, loading: false });
        });
    };
    FetchStaff.prototype.RemoveSearch = function () {
        this.setState({ searchList: this.state.stafflist });
    };
    // Handle Delete request for an employee
    FetchStaff.prototype.handleDelete = function (id) {
        var _this = this;
        if (!window.confirm("Вы действительно хотите удалить запись о данном сотруднике? " + id))
            return;
        else {
            fetch('api/staff/' + id, {
                method: 'delete'
            }).then(function (data) {
                _this.setState({
                    searchList: _this.state.stafflist.filter(function (rec) {
                        return (rec.id != id);
                    })
                });
            });
        }
    };
    FetchStaff.prototype.handleEdit = function (id) {
        this.props.history.push("/staff/edit/" + id);
    };
    // Returns the HTML table to the render() method.  
    FetchStaff.prototype.renderStaffTable = function (stf) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", { style: { textAlign: 'center' } },
                    React.createElement("th", null),
                    React.createElement("th", null, "\u0424\u0418\u041E"),
                    React.createElement("th", null, "\u041C\u0435\u0441\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u044B"),
                    React.createElement("th", { style: { width: '17%' } }, "\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C"),
                    React.createElement("th", { style: { width: '18%' } }, "\u0414\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F"),
                    React.createElement("th", { style: { width: '18%' } }, "\u0414\u0430\u0442\u0430 \u043D\u0430\u0439\u043C\u0430"),
                    React.createElement("th", null, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"))),
            React.createElement("tbody", null, stf.map(function (e) {
                return React.createElement("tr", { style: { textAlign: 'center' }, key: e.id },
                    React.createElement("td", null),
                    React.createElement("td", null, e.name),
                    React.createElement("td", null, e.company),
                    React.createElement("td", null, e.post),
                    React.createElement("td", null, e.dateOfBirth.toString().split('T')[0]),
                    React.createElement("td", null, e.dateOfHire.toString().split('T')[0]),
                    React.createElement("td", null, e.contact),
                    React.createElement("td", null,
                        React.createElement(react_router_dom_1.Link, { to: "/staff/edit/" + e.id }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleDelete(e.id); } },
                            React.createElement(react_router_dom_1.Link, { to: "/database?type=Сотрудники" }, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C"))));
            })));
    };
    return FetchStaff;
}(React.Component));
exports.FetchStaff = FetchStaff;
var StaffData = /** @class */ (function () {
    function StaffData() {
        this.id = 0;
        this.name = "";
        this.company = "";
        this.post = "";
        this.dateOfBirth = new Date(Date.now());
        this.dateOfHire = new Date(Date.now());
        this.contact = "";
    }
    return StaffData;
}());
exports.StaffData = StaffData;
//# sourceMappingURL=FetchStaff.js.map