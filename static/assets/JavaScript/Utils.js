"use strict";
class Utils {
    /**
     * Looks whether an object is iterable or not. Also looks if its null.
     * @param obj
     * @return {boolean}
     */
    static isIterable(obj) {
        if(obj==null) {
            return false
        }
        console.log("hello");
        return typeof obj[Symbol.iterator] === 'function';
    }
}