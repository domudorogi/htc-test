function Tab(element, params) {
    this.element = element;
    this.params = {
        classActive: 'is-active',
        classTabNav: 'tabs__link',
        classTabPane: 'tabs__pane'
    };

    var tabs = document.querySelectorAll(this.element);
    var params = params || {};

    this.init = function () {
        this.params.classActive = params.classActive ? params.classActive : this.params.classActive;
        this.params.classTabNav = params.classTabNav ? params.classTabNav : this.params.classTabNav;
        this.params.classTabPane = params.classTabPane ? params.classTabPane : this.params.classTabPane;

        for (var i = 0; i < tabs.length; i++) {
            var tabsItem = document.getElementById(tabs[i].id);
            var tabNav = tabsItem.querySelectorAll('.' + this.params.classTabNav);

            for (var j = 0; j < tabNav.length; j++) {
                var tabsLink = tabNav[j];

                tabsLink.addEventListener('click', this.delegate(
                    function (e) {
                        e.preventDefault();
                        var linkCurrent = e.target;
                        var linkParentId = linkCurrent.closest(this.element).id;
                        var linkId = linkCurrent.getAttribute('href').replace(/#/gi, '');

                        if (!linkCurrent.classList.contains(this.params.classActive)) {
                            this.removeActiveClass(linkParentId, this.params.classTabNav);
                            linkCurrent.classList.add(this.params.classActive);
                            this.showTab(linkId, linkParentId);
                        }
                    }, this
                ));
            }
        }
    }

    this.showTab = function (tabId, tabParentId) {
        var tab = document.getElementById(tabId);

        if (!tab.classList.contains(this.params.classActive)) {
            this.removeActiveClass(tabParentId, this.params.classTabPane);
            tab.classList.add(this.params.classActive);
        }
    }

    this.removeActiveClass = function (elementParentId, elementClass) {
        var elementParent = document.getElementById(elementParentId);
        var element = elementParent.querySelectorAll('.' + elementClass);

        for (var i = 0; i < element.length; i++) {
            element[i].classList.remove(this.params.classActive);
        }
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