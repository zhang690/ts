"use strict";
var DataHelper = /** @class */ (function () {
    function DataHelper(plKey, primaryKey) {
        this.plKey = plKey;
        this.primaryKey = primaryKey;
    }
    // 读取数据
    DataHelper.prototype.readData = function () {
        var arrStr = localStorage.getItem(this.plKey);
        var arr = [];
        if (arrStr !== null) {
            arr = JSON.parse(arrStr);
            return arr;
        }
        return arr;
    };
    // 保存数据
    DataHelper.prototype.saveData = function (arr) {
        var arrStr = JSON.stringify(arr);
        localStorage.setItem(this.plKey, arrStr);
    };
    // 追加数据
    DataHelper.prototype.addData = function (content) {
        var arr = this.readData();
        var obj = {
            content: content,
        };
        var newId = arr.length > 0 ? arr[arr.length - 1][this.primaryKey] + 1 : 1;
        obj[this.primaryKey] = newId;
        arr.push(obj);
        this.saveData(arr);
        return newId;
    };
    // 删除数据
    DataHelper.prototype.delData = function (id) {
        var _this = this;
        var arr = this.readData();
        var index = arr.findIndex(function (ele) {
            return ele[_this.primaryKey] == id;
        });
        if (index > -1) {
            arr.splice(index, 1);
            this.saveData(arr);
            return true;
        }
        else {
            return false;
        }
    };
    return DataHelper;
}());
