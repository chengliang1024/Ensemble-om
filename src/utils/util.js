const isNull = function (obj) {
    return isNotNull(obj) ? false : true;
};

const isNotNull = function (obj) {
    if (null != obj && undefined != obj && '' != obj && 'undefined' != obj) {
        return true
    } else {
        return false;
    }
};
function isEmptyObject(obj) {
    for (const key in obj){
        return false;//����false����Ϊ�ն���
    }
    return true;//����true��Ϊ�ն���
}
const nvl = function (source, target) {
    if (isNull(source)) {
        return target;
    }
    return source;
};
const Models = {
    nvl: nvl,
    isNull: isNull,
    isNotNull: isNotNull,
    isEmptyObject: isEmptyObject
};

module.exports = Models;