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
exports.ManufactureData = exports.FetchManufacture = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var SerchManufacture_1 = require("./SerchManufacture");
var FetchManufacture = /** @class */ (function (_super) {
    __extends(FetchManufacture, _super);
    function FetchManufacture(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { searchList: [], mList: [], loading: true };
        if (_this.state.mList.length == 0) {
            fetch('api/manufacture')
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.setState({ searchList: data, mList: data, loading: false });
            });
            console.log("done");
        }
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.handleEdit = _this.handleEdit.bind(_this);
        return _this;
    }
    FetchManufacture.prototype.render = function () {
        var _this = this;
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderManufactureTable(this.state.searchList);
        return (React.createElement("div", null,
            React.createElement("h1", null, "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0430"),
            React.createElement("div", null,
                React.createElement(react_router_dom_1.Link, { to: "/addmanufacture" }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C..."),
                React.createElement(SerchManufacture_1.SerchManufacture, { Search: function (type, value) { return _this.ChangeSerch(type, value); }, Remove: function () { return _this.RemoveSearch(); } })),
            contents));
    };
    FetchManufacture.prototype.ChangeSerch = function (type, value) {
        var _this = this;
        console.log(type, value);
        this.setState({ loading: true });
        fetch("api/manufacture/" + type + "-" + value)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ searchList: data, loading: false });
        });
    };
    FetchManufacture.prototype.RemoveSearch = function () {
        this.setState({ searchList: this.state.mList });
    };
    // Handle Delete request for an employee  
    FetchManufacture.prototype.handleDelete = function (id) {
        var _this = this;
        if (!window.confirm("Вы действительно хотите удалить данные об предприятии?"))
            return;
        else {
            fetch('api/manufacture/' + id, {
                method: 'delete'
            }).then(function (data) {
                _this.setState({
                    searchList: _this.state.mList.filter(function (rec) {
                        return (rec.id != id);
                    })
                });
            });
        }
    };
    FetchManufacture.prototype.handleEdit = function (id) {
        this.props.history.push("/manufacture/edit/" + id);
    };
    // Returns the HTML table to the render() method.  
    FetchManufacture.prototype.renderManufactureTable = function (ent) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", { style: { textAlign: 'center' } },
                    React.createElement("th", null),
                    React.createElement("th", null, "\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E"),
                    React.createElement("th", null, "\u0412\u0438\u0434"),
                    React.createElement("th", null, "\u041F\u0440\u0435\u0434\u043F\u0440\u0438\u044F\u0442\u0438\u0435"),
                    React.createElement("th", null, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D"),
                    React.createElement("th", null, "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C"),
                    React.createElement("th", null, "\u041A\u043E\u043B-\u0432\u043E \u0441\u043E\u043E\u0440\u0443\u0436\u0435\u043D\u0438\u0439"),
                    React.createElement("th", null, "\u041A\u043E\u043B-\u0432\u043E \u0442\u0435\u0445.\u043E\u0431\u044A\u0435\u043A\u0442\u043E\u0432"))),
            React.createElement("tbody", null, ent.map(function (e) {
                return React.createElement("tr", { style: { textAlign: 'center' }, key: e.id },
                    React.createElement("td", null),
                    React.createElement("td", null, e.name),
                    React.createElement("td", null, e.type),
                    React.createElement("td", null, e.enterprise),
                    React.createElement("td", null, e.contact),
                    React.createElement("td", null, e.head),
                    React.createElement("td", null, e.c_building),
                    React.createElement("td", null, e.c_techobj),
                    React.createElement("td", null,
                        React.createElement(react_router_dom_1.Link, { to: "/manufacture/edit/" + e.id }, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C"),
                        React.createElement("div", { className: "action", onClick: function (id) { return _this.handleDelete(e.id); } },
                            React.createElement(react_router_dom_1.Link, { to: "/database?type=Производство" }, " \u0423\u0434\u0430\u043B\u0438\u0442\u044C"))));
            })));
    };
    return FetchManufacture;
}(React.Component));
exports.FetchManufacture = FetchManufacture;
var ManufactureData = /** @class */ (function () {
    function ManufactureData() {
        this.id = 0;
        this.name = "";
        this.head = "-";
        this.enterprise = "";
        this.contact = "";
        this.email = "";
        this.type = "";
        this.c_building = 0;
        this.c_techobj = 0;
    }
    return ManufactureData;
}());
exports.ManufactureData = ManufactureData;
//# sourceMappingURL=FetchManufacture.js.map