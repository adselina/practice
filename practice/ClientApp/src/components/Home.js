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
exports.Home = void 0;
var React = require("react");
var react_1 = require("react");
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Home.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { style: { textAlign: 'center' } },
                React.createElement("h1", null, "\u041D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440"),
                React.createElement("h6", null, "|  \u0441\u043E\u0437\u0434\u0430\u0432\u0430\u0439\u0442\u0435  |  \u043F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0439\u0442\u0435  |  \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0439\u0442\u0435  |  \u0443\u0434\u0430\u043B\u044F\u0439\u0442\u0435  |")),
            React.createElement("p", null, "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0443\u0436\u0435 \u0441\u0435\u0439\u0447\u0430\u0441:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("strong", null, "\u0420\u0443\u043A\u043E\u0432\u043E\u0434\u0441\u0442\u0432\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F"),
                    "."),
                React.createElement("li", null,
                    React.createElement("strong", null, "\u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F"),
                    ".")),
            React.createElement("footer", null,
                React.createElement("div", { style: { position: 'fixed', bottom: '0', marginBottom: '10px' } }, " \u00A9 \u0421\u0435\u043B\u0438\u043D\u0430 \u0410.\u0414. 2021. HSE."))));
    };
    Home.displayName = Home.name;
    return Home;
}(react_1.Component));
exports.Home = Home;
//# sourceMappingURL=Home.js.map