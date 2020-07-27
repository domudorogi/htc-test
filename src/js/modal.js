function Modal(element, params) {
    this.element = element;
    this.params = {
        backgroundColor: 'rgba(51,51,51,.8)',
        timerClose: 200,
        classActive: 'show'
    }

    var modal = document.querySelectorAll(this.element);
    var params = params || {};

    this.init = function () {
        this.params.backgroundColor = params.backgroundColor ? params.backgroundColor : this.params.backgroundColor;
        this.params.timerClose = params.timerClose ? params.timerClose : this.params.timerClose;
        this.params.classActive = params.classActive ? params.classActive : this.params.classActive;

        for (var i = 0; i < modal.length; i++) {
            var modalItem = modal[i];
            var modalButton = document.querySelector('[data-modal="' + modalItem.id + '"]');

            if (modalButton) {
                modalButton.addEventListener('click', this.delegate(
                    function (e) {
                        var modalId = e.target.dataset.modal;

                        e.preventDefault();
                        if (modalId.length) {
                            this.show(modalId);
                        }
                    }, this
                ));
                modalItem.addEventListener('click', this.delegate(
                    function (e) {
                        var modalId = e.target.id;

                        if (modalId.length) {
                            if (e.target !== e.currentTarget) return;
                            this.close(modalId);
                        }
                    }, this
                ));
            }
        }
    }

    this.show = function (elementId) {
        var modalCurrent = document.getElementById(elementId);

        this.changeBackgroundColor(elementId, this.params.backgroundColor);
        modalCurrent.style.display = 'block';
        modalCurrent.classList.add(this.params.classActive);
    }

    this.close = function (elementId) {
        var modalCurrent = document.getElementById(elementId);

        modalCurrent.classList.remove(this.params.classActive);
        setTimeout(function () {
            modalCurrent.style.display = 'none';
        }, this.params.timerClose);
    }

    this.changeBackgroundColor = function (elementId, backgroundColor) {
        var modalCurrent = document.getElementById(elementId);

        modalCurrent.style.backgroundColor = backgroundColor;
    }

    // Забрал из инета :'(
    this.delegate = function (func, thisObject) {
        if (!func || !thisObject)
            return func;

        return function () {
            var cur = null;
            var proxyContext = this;
            var res = func.apply(thisObject, arguments);
            proxyContext = cur;
            return res;
        }
    }
}