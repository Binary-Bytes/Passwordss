const pwEl = document.getElementById("pw");
const copyEl = document.getElementById("copy");
const lenEl = document.getElementById("len");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const saveBTN = document.getElementById("savePw");
const copyPW = document.getElementById("copyPw");
const searchPW = document.getElementById("searchPw");
const deleteBTN = document.getElementById("delete");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#&()_+=";

function getPass(name) {
    var pass = window.localStorage.getItem(name.toString());

    if (pass == undefined || pass == null) {
        return 'Password Not Found :|'
    }

    var bytes = CryptoJS.AES.decrypt(pass.toString(), 'Pass');
    var decryptedPw = bytes.toString(CryptoJS.enc.Utf8);

    var bytesTwo = CryptoJS.AES.decrypt(decryptedPw.toString(), 'Pass');
    var decryptedPwTwo = bytesTwo.toString(CryptoJS.enc.Utf8);

    var bytesThree = CryptoJS.AES.decrypt(decryptedPwTwo.toString(), 'Pass');
    var decryptedPwThree = bytesThree.toString(CryptoJS.enc.Utf8);

    var bytesFour = CryptoJS.AES.decrypt(decryptedPwThree.toString(), 'Pass');
    var decryptedPwFour = bytesFour.toString(CryptoJS.enc.Utf8);

    if (decryptedPwFour !== undefined && decryptedPwFour !== null) {
        return decryptedPwFour;
    } else {
        return 'Password Not Found :|'
    }
}

function getLowercase() {
    return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
    return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
    return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
    return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword() {
    const len = lenEl.value;

    let password = "";

    if (upperEl.checked) {
        password += getUppercase();
    }

    if (lowerEl.checked) {
        password += getLowercase();
    }

    if (numberEl.checked) {
        password += getNumber();
    }

    if (symbolEl.checked) {
        password += getSymbol();
    }

    for (let i = password.length; i < len; i++) {
        const x = generateX();
        password += x;
    }

    pwEl.innerText = password;
}

function generateX() {
    const xs = [];
    if (upperEl.checked) {
        xs.push(getUppercase());
    }

    if (lowerEl.checked) {
        xs.push(getLowercase());
    }

    if (numberEl.checked) {
        xs.push(getNumber());
    }

    if (symbolEl.checked) {
        xs.push(getSymbol());
    }

    if (xs.length === 0) return "";

    return xs[Math.floor(Math.random() * xs.length)];
}

function savePw() {
    change();

    var name = document.getElementById("pwName").value;
    var pass = document.getElementById("pw");

    name.toString()
    name.toLowerCase()

    pass.innerText.toString()

    if (name != null && name != '' && name != ' ') {
        if (pass.innerText !== 'Password' && pass.innerText !== 'Generate A Password First !!') {
            var encryptedPw = CryptoJS.AES.encrypt(pass.innerText, 'Pass');
            var encryptedPwTwo = CryptoJS.AES.encrypt(encryptedPw.toString(), 'Pass');
            var encryptedPwThree = CryptoJS.AES.encrypt(encryptedPwTwo.toString(), 'Pass');
            var encryptedPwFour = CryptoJS.AES.encrypt(encryptedPwThree.toString(), 'Pass');

            window.localStorage.setItem(name, encryptedPwFour);
            pass.innerText = 'Password Saved :D';
        } else {
            pass.innerText = 'Generate A Password First !!';

            setTimeout(function() {
                pass.innerText = 'Password';
            }, 5000);
        }
    } else {
        pass.innerText = 'Enter Password Name !!';
    }

    document.getElementById("pwName").value = '';

    setTimeout(function() {
        pass.innerText = 'Password';
    }, 2000);
}

function searchPass() {
    var name = document.getElementById("name").value;
    var insert = document.getElementById("password");

    name.toString()
    name.toLowerCase()

    insert.innerText = getPass(name);
    document.getElementById("name").value = '';

    if (insert.innerText == 'Password Not Found :|') {
        setTimeout(function() {
            insert.innerText = 'Search Password';
        }, 2000);
    }
    if (insert.innerText !== 'Password Not Found :|') {
        setTimeout(function() {
            insert.innerText = 'Search Password';
        }, 5000);
    }
}

function deletePw() {
    var name = document.getElementById("deletePw").value;
    var status = document.getElementById("pwStatus");
    var pass = window.localStorage.getItem(name);

    if (pass != null && pass != undefined) {
        window.localStorage.removeItem(name);
        status.innerText = 'Password Deleted :D';
    } else {
        status.innerText = 'Password Not Found :|';
    }

    setTimeout(function() {
        document.getElementById("deletePw").value = '';
        status.innerText = 'Delete Password';
    }, 2000);
}

generateEl.addEventListener("click", generatePassword);
saveBTN.addEventListener("click", savePw)
searchPW.addEventListener("click", searchPass)
deleteBTN.addEventListener("click", deletePw);

copyEl.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = pwEl.innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
});

copyPW.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    const password = document.getElementById("password").innerText;

    if (!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
});

function change() {
    var value = document.getElementById("len").value;
    value.toString();

    len = parseInt(value);

    if (len > 15) {
        document.getElementById("len").value = '15';
    } else if (len < 4) {
        document.getElementById("len").value = '4';
    }
}