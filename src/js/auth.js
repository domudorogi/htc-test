function validateInput(element, params) {
    this.element = element;
    this.params = {
        errorClass: 'is-error'
    }

    var params = params ? params : {};

    this.init = function () {
        this.params.errorClass = params.errorClass ? params.errorClass : this.params.errorClass;

        var result = true;
        var input = this.element;
        var inputType = input.type;

        if (input.hasAttribute('required')) {
            if (inputType == 'text') {
                result = this.inputSimpleValidateText(input) ? true : false;
            }

            if (inputType == 'password') {
                result = this.inputSimpleValidateText(input) ? true : false;
            }

            if (inputType == 'checkbox') {
                result = this.inputSimpleValidateCheck(input) ? true : false;
            }
        }

        return result;
    }

    this.inputSimpleValidateText = function (element) {
        var inputValue = element.value;

        if (inputValue !== '') {
            this.removeError(element);
            return true;
        } else {
            this.addError(element);
            return false;
        }
    }

    this.inputSimpleValidateCheck = function (element) {
        var inputValue = element.checked;

        if (inputValue) {
            this.removeError(element);
            return true;
        } else {
            this.addError(element);
            return false;
        }
    }

    this.addError = function (element) {
        element.classList.add(this.params.errorClass);
    }

    this.removeError = function (element) {
        element.classList.remove(this.params.errorClass);
    }
}