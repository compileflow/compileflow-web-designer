CompileFlowUtils = {};

CompileFlowUtils.getParamFromUrl = function (name, defaultStr) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        if (defaultStr !== undefined) {
            return defaultStr;
        } else {
            return '';
        }
    }
};

CompileFlowUtils.toBpmXml = function (xml) {
    console.log("originXml:" + xml)

    if (undefined === xml || '' === xml) {
        return xml;
    }

    var protocol = '<?xml version="1.0" encoding="UTF-8" ?>';

    var bpmXmlObj = $('<bpm></bpm>');

    $(xml).find('mxCell').each(function (i) {
        var nodeObj = $(this);
        var id = nodeObj.attr('id');
        var value = nodeObj.attr('value');
        if ('0' === id) {
            return true;
        }
        if ('1' === id) {
        }

        var bpmNodeObj = $('<autoTask></autoTask>');
        bpmNodeObj.attr('id', id);
        bpmNodeObj.attr('name', value);
        bpmXmlObj.append(bpmNodeObj);
    });
    return protocol + bpmXmlObj.html();
};

CompileFlowUtils.globalVarsToStr = function (data) {
    if (!data) {
        return '';
    }
    return encodeURI(JSON.stringify(data));
};
CompileFlowUtils.strToGlobalVars = function (str) {
    if ('' === str) {
        return [];
    }
    return JSON.parse(decodeURI(str));
};


CompileFlowUtils.Ajax = {
    get: function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                    callback(xhr.responseText);
                }
            }
        };
        xhr.send();
    },

    post: function (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                    callback(xhr.responseText);
                }
            }
        };
        xhr.send(data);
    }
};


