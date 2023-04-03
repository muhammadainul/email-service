const validateEmail = function (email) {
    const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    for (let i of email) {
        const valid = regex.test(i);
        if (!valid) return valid;
    }
   
};

module.exports = { validateEmail }