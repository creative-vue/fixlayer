interface layerParams {
    title?: string;
    yesText?: string;
    onYes?: Function;
    cancelText?: string;
    onCancel?: Function;
    promptType?: 'input' | 'textarea';
    promptPlaceholder?: string;
    defaultValue?: string;
}

interface notifyParams {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    time?: number;
    onHidden?: Function;
}

class Fixlayer {
    title: string = '信息';

    defaultLayerOption: layerParams = {
        title: '信息',
        yesText: '确定',
        cancelText: '取消',
        onYes: undefined,
        onCancel: undefined,
        promptType: 'input',
        promptPlaceholder: '请输入内容',
        defaultValue: ''
    };

    defaultNotifyOption: notifyParams = {
        position: 'top-right',
        time: 5000,
        onHidden: undefined
    }

    createNode(tagName: string, ...classList: string[]) {
        const node = document.createElement(tagName);
        node.classList.add(...classList);
        return node;
    }

    alert(message: string, option: layerParams = {}) {
        option = (<any>Object).assign({}, this.defaultLayerOption, option);

        const rootNode = this.createNode('div', 'fixlayer');
        const maskNode = this.createNode('div', 'fixlayer-mask');
        const alertNode = this.createNode('div', 'fixlayer-alert');
        const titleNode = this.createNode('div', 'fixlayer-title', 'fixlayer-move');
        titleNode.appendChild(document.createTextNode(option.title));

        const contentNode = this.createNode('div', 'fixlayer-content');
        contentNode.appendChild(document.createTextNode(message));

        const actionNode = this.createNode('div', 'fixlayer-action');
        const okButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-ok');
        okButtonNode.appendChild(document.createTextNode(option.yesText));
        okButtonNode.onclick = function(e) {
            maskNode.classList.add('fixlayer-fadeout');
            alertNode.classList.add('fixlayer-scaleout');
            alertNode.onanimationend = function() {
                document.body.removeChild(rootNode);
            }
            if (option.onYes && typeof option.onYes) {
                option.onYes(e);
            }
        };

        actionNode.appendChild(okButtonNode);
        alertNode.append(titleNode, contentNode, actionNode);
        rootNode.append(maskNode, alertNode);

        document.body.appendChild(rootNode);

        // 进入动画
        maskNode.classList.add('fixlayer-fadein');
        maskNode.onanimationend = function() {
            maskNode.classList.remove('fixlayer-fadein');
        };
        alertNode.classList.add('fixlayer-scalein');
        alertNode.onanimationend = function() {
            alertNode.classList.remove('fixlayer-scalein');
        };

        return this;
    }

    confirm(message: string, option: layerParams = {}) {
        option = (<any>Object).assign({}, this.defaultLayerOption, option);

        const rootNode = this.createNode('div', 'fixlayer');
        const maskNode = this.createNode('div', 'fixlayer-mask');
        const confirmNode = this.createNode('div', 'fixlayer-confirm');
        const titleNode = this.createNode('div', 'fixlayer-title');
        titleNode.appendChild(document.createTextNode(option.title));

        const contentNode = this.createNode('div', 'fixlayer-content');
        contentNode.appendChild(document.createTextNode(message));

        const actionNode = this.createNode('div', 'fixlayer-action');
        const okButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-ok');
        okButtonNode.appendChild(document.createTextNode(option.yesText));
        okButtonNode.onclick = function(e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function() {
                document.body.removeChild(rootNode);
            }
            if (option.onYes && typeof option.onYes) {
                option.onYes(e);
            }
        };
        const cancelButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-cancel');
        cancelButtonNode.appendChild(document.createTextNode(option.cancelText));
        cancelButtonNode.onclick = function(e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function() {
                document.body.removeChild(rootNode);
            }
            if (option.onCancel && typeof option.onCancel) {
                option.onCancel(e);
            }
        };

        actionNode.append(okButtonNode, cancelButtonNode);
        confirmNode.append(titleNode, contentNode, actionNode);
        rootNode.append(maskNode, confirmNode);

        document.body.appendChild(rootNode);

        // 进入动画
        maskNode.classList.add('fixlayer-fadein');
        maskNode.onanimationend = function() {
            maskNode.classList.remove('fixlayer-fadein');
        };
        confirmNode.classList.add('fixlayer-scalein');
        confirmNode.onanimationend = function() {
            confirmNode.classList.remove('fixlayer-scalein');
        };

        return this;
    }

    prompt(message: string, option: layerParams = {}) {
        option = (<any>Object).assign({}, this.defaultLayerOption, option);

        const rootNode = this.createNode('div', 'fixlayer');
        const maskNode = this.createNode('div', 'fixlayer-mask');
        const confirmNode = this.createNode('div', 'fixlayer-prompt');
        const titleNode = this.createNode('div', 'fixlayer-title');
        titleNode.appendChild(document.createTextNode(option.title));

        const contentNode = this.createNode('div', 'fixlayer-content');
        const formNode = this.createNode(option.promptType, 'fixlayer-input');
        if (option.promptType === 'input') {
            formNode.setAttribute('type', 'text');
        }
        formNode.setAttribute('placeholder', option.promptPlaceholder);
        formNode.setAttribute('value', option.defaultValue);
        if (message) {
            const msgNode = this.createNode('div');
            msgNode.style.marginBottom = '8px';
            msgNode.appendChild(document.createTextNode(message));
            contentNode.appendChild(msgNode);
        }
        contentNode.appendChild(formNode);

        const actionNode = this.createNode('div', 'fixlayer-action');
        const okButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-ok');
        okButtonNode.appendChild(document.createTextNode(option.yesText));
        okButtonNode.onclick = function(e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function() {
                document.body.removeChild(rootNode);
            }

            if (option.onYes && typeof option.onYes) {
                option.onYes(e, (formNode as HTMLInputElement).value);
            }
        };
        const cancelButtonNode = this.createNode('button', 'fixlayer-button', 'fixlayer-cancel');
        cancelButtonNode.appendChild(document.createTextNode(option.cancelText));
        cancelButtonNode.onclick = function(e) {
            maskNode.classList.add('fixlayer-fadeout');
            confirmNode.classList.add('fixlayer-scaleout');
            confirmNode.onanimationend = function() {
                document.body.removeChild(rootNode);
            }
            if (option.onCancel && typeof option.onCancel) {
                option.onCancel(e);
            }
        };

        actionNode.append(okButtonNode, cancelButtonNode);
        confirmNode.append(titleNode, contentNode, actionNode);
        rootNode.append(maskNode, confirmNode);

        document.body.appendChild(rootNode);

        // 进入动画
        maskNode.classList.add('fixlayer-fadein');
        maskNode.onanimationend = function() {
            maskNode.classList.remove('fixlayer-fadein');
        };
        confirmNode.classList.add('fixlayer-scalein');
        confirmNode.onanimationend = function() {
            confirmNode.classList.remove('fixlayer-scalein');
        };

        return this;
    }

    // notify
    notify(message: string, type: string = 'message', option: notifyParams = {}) {
        option = (<any>Object).assign({}, this.defaultNotifyOption, option);

        const msgNode = this.createNode('div', 'fixlayer-notify', 'fixlayer-notify-' + type);
        const spanNode = this.createNode('span');
        spanNode.appendChild(document.createTextNode(message));
        msgNode.appendChild(spanNode);
        msgNode.onclick = () => {
            this.closeNotify(msgNode, option.onHidden, option.position);
        };

        const container = document.querySelector('.fixlayer-notifier');

        if (!container) {
            const rootNode = this.createNode('div', 'fixlayer-notifier', 'fixlayer-notify-' + option.position);
            rootNode.appendChild(msgNode);
            document.body.appendChild(rootNode);
        } else {
            container.appendChild(msgNode);
        }

        if (option.time > 0) {
            setTimeout(() => {
                this.closeNotify(msgNode, option.onHidden, option.position);
            }, option.time);
        }
        msgNode.classList.add('fixlayer-' + option.position + '-in');
        msgNode.onanimationend = function() {
            msgNode.classList.remove('fixlayer-' + option.position + '-in');
        };
    }
    message(message: string, option: notifyParams = {}) {
        this.notify(message, 'message', option);
    }
    success(message: string, option: notifyParams = {}) {
        this.notify(message, 'success', option);
    }
    error(message: string, option: notifyParams = {}) {
        this.notify(message, 'error', option);
    }
    warning(message: string, option: notifyParams = {}) {
        this.notify(message, 'warning', option);
    }
    // close notify
    closeNotify(elNode: HTMLElement, callback?: Function, position?: string) {
        elNode.classList.add('fixlayer-' + position + '-out');
        elNode.onanimationend = function() {
            if (typeof callback === 'function') {
                callback();
            }
            elNode.remove();
        };
    }
}

const FixlayerJSContruct = new Fixlayer();
// 兼容CommonJs规范
if (typeof module !== "undefined" && module.exports) {
    module.exports = FixlayerJSContruct;
}
// 兼容AMD/CMD规范
// @ts-ignore
if (typeof define === "function") {
    // @ts-ignore
    define(function() {
        return FixlayerJSContruct;
    });
}
// browser
if (!(<any>window).fixlayer) {
    (<any>window).fixlayer = FixlayerJSContruct;
}
// es6
if (typeof exports !== "undefined") {
    // @ts-ignore
    exports.default = FixlayerJSContruct;
}