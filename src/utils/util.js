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
function removeByValue(arr, val) {

    for(let i=0; i<arr.length; i++) {

        if(arr[i] == val) {

            arr.splice(i, 1);

            break;

        }

    }

}
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
    isEmptyObject: isEmptyObject,
    removeByValue: removeByValue
};

module.exports = Models;