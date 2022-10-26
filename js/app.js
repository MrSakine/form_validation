function emailValidation() {
    const form = document.getElementById("form");
    const reset = document.querySelector('.reset_btn');
    const email = form.email;
    const confirm_email = form.email_confirm;
    const bodyElements = document.querySelector('#form > table > tbody');
    const error_message = bodyElements.querySelector('tr:nth-child(3)');
    const error_message_border = error_message.querySelector('td:nth-child(2) > input');
    const errorNode = createNode("p", "Emails do not match", "error");
    const successNode = createNode("p", "Form submitted successfully", "success");
    const node = createNode("span", "Emails do not match", "error-sm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        if (email.value !== confirm_email.value) {
            replaceNode(form, successNode, errorNode);
        } else {
            replaceNode(form, errorNode, successNode);
        }
    });

    confirm_email.addEventListener("keyup", function() {
        let isDisplayed = isErrorMessageAlreadyDisplayed(bodyElements, node);

        if (this.value !== email.value) {
            if (!isDisplayed) {
                bodyElements.insertBefore(node, error_message.nextSibling.nextSibling);
                error_message_border.classList.add("input-error");
            }
        } else {
            error_message_border.classList.remove("input-error");
            bodyElements.removeChild(node);
        }
    });

    reset.addEventListener("click", resetFormData);
    reset.email = email;
    reset.confirm_email = confirm_email;
}

function isErrorMessageAlreadyDisplayed(elements, node) {
    displayed = false;

    elements.childNodes.forEach((el) => {
        if (el === node) {
            displayed = true;
        }
    });

    return displayed;
}

function createNode(el, text, cls) {
    const node = document.createElement(el);
    const message = document.createTextNode(text);
    node.setAttribute("class", cls);
    node.appendChild(message);

    return node;
}

function replaceNode(parentEl, oldEl, newEl) {
    let i = parentEl.childNodes.length;
    const childNodes = parentEl.childNodes;

    if (childNodes[i] == oldEl) {
        parentEl.removeChild(oldEl);
        parentEl.appendChild(newEl);
    } else {
        parentEl.appendChild(newEl);
    }

    setTimeout(() => { parentEl.removeChild(newEl) }, 1500);
}

function resetFormData(e) {
    e.currentTarget.email.value = '';
    e.currentTarget.confirm_email.value = '';
}

window.addEventListener("load", emailValidation);