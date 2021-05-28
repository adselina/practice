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
exports.EnterpriseData = exports.FetchEnterprise = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var FetchEnterprise = /** @class */ (function (_super) {
    __extends(FetchEnterprise, _super);
    function FetchEnterprise(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { entList: [], loading: true };
        fetch('api/enterprise')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ entList: data, loading: false });
        });
        _this.handleDelete = _this.handleDelete.bind(_this);
        return _this;
        //this.handleEdit = this.handleEdit.bind(this);
    }
    FetchEnterprise.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderEnterpriseTable(this.state.entList);
        return React.createElement("div", null,
            React.createElement("h1", null, "\u041F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u044F"),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addenterprise" }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C...")),
            contents);
    };
    // Handle Delete request for an employee  
    FetchEnterprise.prototype.handleDelete = function (id) {
        var _this = this;
        if (!window.confirm("Вы действительно хотите удалить данные об предприятии?"))
            return;
        else {
            fetch('api/enterprise/' + id, {
                method: 'delete'
            }).then(function (data) {
                _this.setState({
                    entList: _this.state.entList.filter(function (rec) {
                        return (rec.id != id);
                    })
                });
            });
        }
    };
    FetchEnterprise.prototype.handleEdit = function (id) {
        this.props.history.push("/enterprise/edit/" + id);
    };
    // Returns the HTML table to the render() method.  
    FetchEnterprise.prototype.renderEnterpriseTable = function (ent) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F"),
                    React.createElement("th", null, "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C"),
                    React.createElement("th", null, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"),
                    React.createElement("th", null, "\u041F\u043E\u0447\u0442\u0430"),
                    React.createElement("th", null, "\u0418\u041D\u041D"),
                    React.createElement("th", null, "\u041E\u0413\u0420\u041D"))),
            React.createElement("tbody", null, ent.map(function (e) {
                return React.createElement("tr", { key: e.id },
                    React.createElement("td", null),
                    React.createElement("td", null, e.name),
                    React.createElement("td", null, e.head),
                    React.createElement("td", null, e.contact),
                    React.createElement("td", null, e.email),
                    React.createElement("td", null, e.inn),
                    React.createElement("td", null, e.ogrn),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleEdit(e.id); } }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                        "  |",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleDelete(e.id); } }, "\u0423\u0434\u0430\u043B\u0438\u0442\u044C")));
            })));
    };
    return FetchEnterprise;
}(React.Component));
exports.FetchEnterprise = FetchEnterprise;
var EnterpriseData = /** @class */ (function () {
    function EnterpriseData() {
        this.id = 0;
        this.name = "";
        this.head = "";
        this.contact = "";
        this.email = "";
        this.inn = "";
        this.ogrn = "";
    }
    return EnterpriseData;
}());
exports.EnterpriseData = EnterpriseData;
//# sourceMappingURL=FetchEnterprise.js.map