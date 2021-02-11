var Fixlayer = (function () {
    function Fixlayer() {
        this.title = '信息';
        this.defaultLayerOption = {
            title: '信息',
            yesText: '确定',
            cancelText: '取消',
            onYes: undefined,
            onCancel: undefined,
            promptType: 'input',
            promptPlaceholder: '请输入内容',
            defaultValue: ''
        };
        this.defaultNotifyOption = {
            position: 'top-right',
            time: 5000,
            onHidden: undefined
        };
    }
    Fixlayer.prototype.createNode = function (tagName) {
        var _a;
        var classList = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            classList[_i - 1] = arguments[_i];
        }
        var node = document.createElement(tagName);
        (_a = node.classList).add.apply(_a, classList);
        return node;
    };
    Fixlayer.prototype.alert = function (message, option) {
        if (option === void 0) { option = {}; }
        option = Object.assign({}, this.defaultLayerOption, option);
        var rootNode = this.createNode('div', 'fixlayer');
        var maskNode = this.createNode('div', 'fixlayer-mask');
        var alertNode = this.createNode('div', 'fixlayer-alert');
        var titleNode = this.createNode('div', 'fixlayer-title', 'fixlayer-move');
        titleNode.appendChild(document.createTextNode(option.title));
        var contentNode = this.createNode('div', 'fixlayer-content');
        contentNode.appendChild(document.createTextNode(message));
        var actionNode = this.createNode('div', 'fixlayer-action');
        var okButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-ok');
        okButtonNode.appendChild(document.createTextNode(option.yesText));
        okButtonNode.onclick = function (e) {
            maskNode.classList.add('fixlayer-fadeout');
            alertNode.classList.add('fixlayer-scaleout');
            alertNode.onanimationend = function () {
                document.body.removeChild(rootNode);
            };
            if (option.onYes && typeof option.onYes) {
                option.onYes(e);
            }
        };
        actionNode.appendChild(okButtonNode);
        alertNode.append(titleNode, contentNode, actionNode);
        rootNode.append(maskNode, alertNode);
        document.body.appendChild(rootNode);
        maskNode.classList.add('fixlayer-fadein');
        maskNode.onanimationend = function () {
            maskNode.classList.remove('fixlayer-fadein');
        };
        alertNode.classList.add('fixlayer-scalein');
        alertNode.onanimationend = function () {
            alertNode.classList.remove('fixlayer-scalein');
        };
        return this;
    };
    Fixlayer.prototype.confirm = function (message, option) {
        if (option === void 0) { option = {}; }
        option = Object.assign({}, this.defaultLayerOption, option);
        var rootNode = this.createNode('div', 'fixlayer');
        var maskNode = this.createNode('div', 'fixlayer-mask');
        var confirmNode = this.createNode('div', 'fixlayer-confirm');
        var titleNode = this.createNode('div', 'fixlayer-title');
        titleNode.appendChild(document.createTextNode(option.title));
        var contentNode = this.createNode('div', 'fixlayer-content');
        contentNode.appendChild(document.createTextNode(message));
        var actionNode = this.createNode('div', 'fixlayer-action');
        var okButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-ok');
        okButtonNode.appendChild(document.createTextNode(option.yesText));
        okButtonNode.onclick = function (e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function () {
                document.body.removeChild(rootNode);
            };
            if (option.onYes && typeof option.onYes) {
                option.onYes(e);
            }
        };
        var cancelButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-cancel');
        cancelButtonNode.appendChild(document.createTextNode(option.cancelText));
        cancelButtonNode.onclick = function (e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function () {
                document.body.removeChild(rootNode);
            };
            if (option.onCancel && typeof option.onCancel) {
                option.onCancel(e);
            }
        };
        actionNode.append(okButtonNode, cancelButtonNode);
        confirmNode.append(titleNode, contentNode, actionNode);
        rootNode.append(maskNode, confirmNode);
        document.body.appendChild(rootNode);
        maskNode.classList.add('fixlayer-fadein');
        maskNode.onanimationend = function () {
            maskNode.classList.remove('fixlayer-fadein');
        };
        confirmNode.classList.add('fixlayer-scalein');
        confirmNode.onanimationend = function () {
            confirmNode.classList.remove('fixlayer-scalein');
        };
        return this;
    };
    Fixlayer.prototype.prompt = function (message, option) {
        if (option === void 0) { option = {}; }
        option = Object.assign({}, this.defaultLayerOption, option);
        var rootNode = this.createNode('div', 'fixlayer');
        var maskNode = this.createNode('div', 'fixlayer-mask');
        var confirmNode = this.createNode('div', 'fixlayer-prompt');
        var titleNode = this.createNode('div', 'fixlayer-title');
        titleNode.appendChild(document.createTextNode(option.title));
        var contentNode = this.createNode('div', 'fixlayer-content');
        var formNode = this.createNode(option.promptType, 'fixlayer-input');
        if (option.promptType === 'input') {
            formNode.setAttribute('type', 'text');
        }
        formNode.setAttribute('placeholder', option.promptPlaceholder);
        formNode.setAttribute('value', option.defaultValue);
        if (message) {
            var msgNode = this.createNode('div');
            msgNode.style.marginBottom = '8px';
            msgNode.appendChild(document.createTextNode(message));
            contentNode.appendChild(msgNode);
        }
        contentNode.appendChild(formNode);
        var actionNode = this.createNode('div', 'fixlayer-action');
        var okButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-ok');
        okButtonNode.appendChild(document.createTextNode(option.yesText));
        okButtonNode.onclick = function (e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function () {
                document.body.removeChild(rootNode);
            };
            if (option.onYes && typeof option.onYes) {
                option.onYes(e, formNode.value);
            }
        };
        var cancelButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-cancel');
        cancelButtonNode.appendChild(document.createTextNode(option.cancelText));
        cancelButtonNode.onclick = function (e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function () {
                document.body.removeChild(rootNode);
            };
            if (option.onCancel && typeof option.onCancel) {
                option.onCancel(e);
            }
        };
        actionNode.append(okButtonNode, cancelButtonNode);
        confirmNode.append(titleNode, contentNode, actionNode);
        rootNode.append(maskNode, confirmNode);
        document.body.appendChild(rootNode);
        maskNode.classList.add('fixlayer-fadein');
        maskNode.onanimationend = function () {
            maskNode.classList.remove('fixlayer-fadein');
        };
        confirmNode.classList.add('fixlayer-scalein');
        confirmNode.onanimationend = function () {
            confirmNode.classList.remove('fixlayer-scalein');
        };
        return this;
    };
    Fixlayer.prototype.notify = function (message, type, option) {
        var _this = this;
        if (type === void 0) { type = 'message'; }
        if (option === void 0) { option = {}; }
        option = Object.assign({}, this.defaultNotifyOption, option);
        var msgNode = this.createNode('div', 'fixlayer-notify', 'fixlayer-notify-' + type);
        var spanNode = this.createNode('span');
        spanNode.appendChild(document.createTextNode(message));
        msgNode.appendChild(spanNode);
        msgNode.onclick = function () {
            _this.closeNotify(msgNode, option.onHidden, option.position);
        };
        var container = document.querySelector('.fixlayer-notifier');
        if (!container) {
            var rootNode = this.createNode('div', 'fixlayer-notifier', 'fixlayer-notify-' + option.position);
            rootNode.appendChild(msgNode);
            document.body.appendChild(rootNode);
        }
        else {
            container.appendChild(msgNode);
        }
        if (option.time > 0) {
            setTimeout(function () {
                _this.closeNotify(msgNode, option.onHidden, option.position);
            }, option.time);
        }
        msgNode.classList.add('fixlayer-' + option.position + '-in');
        msgNode.onanimationend = function () {
            msgNode.classList.remove('fixlayer-' + option.position + '-in');
        };
    };
    Fixlayer.prototype.message = function (message, option) {
        if (option === void 0) { option = {}; }
        this.notify(message, 'message', option);
    };
    Fixlayer.prototype.success = function (message, option) {
        if (option === void 0) { option = {}; }
        this.notify(message, 'success', option);
    };
    Fixlayer.prototype.error = function (message, option) {
        if (option === void 0) { option = {}; }
        this.notify(message, 'error', option);
    };
    Fixlayer.prototype.warning = function (message, option) {
        if (option === void 0) { option = {}; }
        this.notify(message, 'warning', option);
    };
    Fixlayer.prototype.closeNotify = function (elNode, callback, position) {
        elNode.classList.add('fixlayer-' + position + '-out');
        elNode.onanimationend = function () {
            if (typeof callback === 'function') {
                callback();
            }
            elNode.remove();
        };
    };
    return Fixlayer;
}());
var FixlayerJSContruct = new Fixlayer();
if (typeof module !== "undefined" && module.exports) {
    module.exports = FixlayerJSContruct;
}
if (typeof define === "function") {
    define(function () {
        return FixlayerJSContruct;
    });
}
if (!window.fixlayer) {
    window.fixlayer = FixlayerJSContruct;
}
if (typeof exports !== "undefined") {
    exports.default = FixlayerJSContruct;
}

//# sourceMappingURL=fixlayer.js.map
