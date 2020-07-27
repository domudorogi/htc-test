var tabs = new Tab('.jsTabs');
var modal = new Modal('.jsModal', {
    backgroundColor: 'rgba(51,51,51,.6)'
});
var buttonExit = document.getElementById('userExit');
var userName = document.getElementById('userName');
var userInputName = document.getElementById('userInputName');

// Init
modal.init();
tabs.init();
userFormAuth();

if (getCookie('auth')) {
    changeHeaderAuth(true);
    changeHeaderName(getSmallName(localStorage.getItem('fullName')));
}

buttonExit.addEventListener('click', function (e) {
    e.preventDefault();
    changeHeaderAuth(false);
    delCookie('auth');
});

userName.addEventListener('click', function (e) {
    e.preventDefault();
    userInputName.value = localStorage.getItem('fullName');
    changeButtonDisplay(true);
});

userInputName.addEventListener('focusout', function () {
    changeButtonDisplay(false);
    localStorage.setItem('fullName', this.value);
    changeHeaderName(getSmallName(this.value));
}, true);

function changeButtonDisplay(value) {
    if (value == true) {
        userName.classList.remove('block');
        userName.classList.add('none');
        userInputName.classList.remove('none');
        userInputName.classList.add('block');
    } else {
        userInputName.classList.remove('block');
        userInputName.classList.add('none');
        userName.classList.remove('none');
        userName.classList.add('block');
    }
}

// Form
function userFormAuth() {
    var form = document.getElementById('formAuth');
    var formButton = document.getElementById('formAuthSend');
    var formInput = form.getElementsByTagName('input');
    var formInputName = document.getElementsByName('login');
    var formInputRemember = document.getElementsByName('remember');

    formButton.addEventListener('click', function (e) {
        var validate = false;

        e.preventDefault();
        for (var i = 0; i < formInput.length; i++) {
            var validateForm = new validateInput(formInput[i]);
            var validateFormInput = validateForm.init();

            if (validateFormInput) {
                validate = true;
            } else {
                validate = false;
                break;
            }
        }

        if (validate) {
            if (formInputRemember[0].checked == true) {
                setCookie('auth', 1, {
                    expires: 3600
                });
            }
            localStorage.setItem('fullName', formInputName[0].value);
            validate = false;
            clearFormInput(form);
            changeHeaderAuth(true);
            changeHeaderName(getSmallName(localStorage.getItem('fullName')));
            modal.close('modalAuth');
        }
    });
}

function getSmallName(fullName) {
    var nameArr = fullName.split(' ');
    var name = nameArr.length > 1 ? nameArr[0] + ' ' + nameArr[1].substr(0, 1) + '.' : nameArr[0];
    return name;
}

function changeHeaderAuth(login) {
    var authClass = 'is-authorized';
    var auth = document.getElementById('userAuth');

    if (login == true) {
        auth.classList.add(authClass);
    } else {
        auth.classList.remove(authClass);
    }
}

function changeHeaderName(name) {
    userName.innerHTML = name;
}

function clearFormInput(form) {
    var formInput = form.getElementsByTagName('input');

    for (var i = 0; i < formInput.length; i++) {
        var input = formInput[i];
        var inputType = input.type;

        if (inputType == 'text') {
            input.value = '';
        }

        if (inputType == 'password') {
            input.value = '';
        }

        if (inputType == 'checkbox') {
            input.checked = false;
        }

    }
}

// https://learn.javascript.ru/cookie
function setCookie(name, value, options) {

    var options = options || {};
    var expires = options.expires;
    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (var optionKey in options) {
        updatedCookie += "; " + optionKey;
        var optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}


function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function delCookie(name) {
    setCookie(name, "", {
        expires: -1
    });
}