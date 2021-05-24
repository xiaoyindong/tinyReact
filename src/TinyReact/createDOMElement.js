import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";

export default function createDOMElement(virtualDOM) {
    let newElement = null;
    if (virtualDOM.type === 'text') {
        // 文本节点 使用createTextNode创建
        newElement = document.createTextNode(virtualDOM.props.textContent);
    } else {
        // 元素节点 使用 createElement 创建
        newElement = document.createElement(virtualDOM.type);
        updateNodeElement(newElement, virtualDOM);
    }
    // 添加虚拟DOM属性
    newElement._virtualDOM = virtualDOM;
    // 递归创建子节点
    virtualDOM.children.forEach(child => {
        mountElement(child, newElement);
    })
    return newElement;
}