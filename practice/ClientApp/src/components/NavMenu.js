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
exports.NavMenu = void 0;
var React = require("react");
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var react_router_dom_1 = require("react-router-dom");
require("./NavMenu.css");
var NavMenu = /** @class */ (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu(props) {
        var _this = _super.call(this, props) || this;
        _this.toggleNavbar = _this.toggleNavbar.bind(_this);
        _this.state = {
            collapsed: true
        };
        return _this;
    }
    NavMenu.prototype.toggleNavbar = function () {
        this.setState({
            collapsed: !this.state
        });
    };
    NavMenu.prototype.render = function () {
        return (React.createElement("header", null,
            React.createElement(reactstrap_1.Navbar, { className: "navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3", light: true },
                React.createElement(reactstrap_1.Container, null,
                    React.createElement(reactstrap_1.NavbarBrand, { tag: react_router_dom_1.Link, to: "/" }, "\u041D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440"),
                    React.createElement(reactstrap_1.NavbarToggler, { onClick: this.toggleNavbar, className: "mr-2" }),
                    React.createElement(reactstrap_1.Collapse, { className: "d-sm-inline-flex flex-sm-row-reverse", isOpen: !this.state, navbar: true },
                        React.createElement("ul", { className: "navbar-nav flex-grow" },
                            React.createElement(reactstrap_1.NavItem, null,
                                React.createElement(reactstrap_1.NavLink, { tag: react_router_dom_1.Link, className: "text-dark", to: "/" }, "\u0413\u043B\u0430\u0432\u043D\u0430\u044F")),
                            React.createElement(reactstrap_1.NavItem, null,
                                React.createElement(reactstrap_1.NavLink, { tag: react_router_dom_1.Link, className: "text-dark", to: "/database" }, "\u0414\u0430\u043D\u043D\u044B\u0435"))))))));
    };
    NavMenu.displayName = NavMenu.name;
    return NavMenu;
}(react_1.Component));
exports.NavMenu = NavMenu;
//# sourceMappingURL=NavMenu.js.map