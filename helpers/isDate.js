const isDate = (value) => {
    if (!value) return false;

    const date = new Date(value);
    return !isNaN(date.getTime());
}

module.exports = {
    isDate
};