CompileFlowCodec = {};

CompileFlowCodec.bpmToGraphModel = function (bpm) {
    var bpmObj = $(bpm).children(":first").parent();


    // var attrObj = {};
    // attrObj['cfCode'] = bpmObj.attr('code');
    // attrObj['cfName'] = bpmObj.attr('name');
    // attrObj['cfType'] = bpmObj.attr('type');
    // attrObj['cfDescription'] = bpmObj.attr('description');

    //bpmStr += CompileFlowCodec.buildNodeWithAttr('mxGraphModel', attrObj, false);

    var bpmStr = '<mxGraphModel><root><mxCell id="10000"/><mxCell id="10001" parent="10000"/>';

    bpmObj.children().each(function (i) {
        bpmStr += CompileFlowCodec.buildCellVertex($(this));
    });

    bpmStr += '</root></mxGraphModel>';


    console.log(bpmStr);
    return bpmStr;
};

CompileFlowCodec.recurseBpmNode = function (bpmNodeObj) {
    var bpmNode = bpmNodeObj[0].attributes;

    $(bpmNode).each(function (i) {
        //console.log($(this)[0].nodeName + '======' + $(this)[0].nodeValue);
    });

    if (bpmNode.length > 0) {
        $(bpmNode).children().each(function (i) {
            CompileFlowCodec.recurseBpmNode($(this));
        })
    } else {
        return false;
    }
};

CompileFlowCodec.buildCellVertex = function (bpmNodeObj) {
    var nodeName = bpmNodeObj[0].nodeName;
    if ('VAR' === nodeName) {
        return '';
    }

    var id = bpmNodeObj.attr('id');
    var g = bpmNodeObj.attr('g');
    var array = g.split(',');

    //获取节点模版
    var template = CompileFlowCodec.getNodeTemplate(bpmNodeObj);

    //替换模版变量
    template = template.replace('${id}', id);
    if ('NOTE' === nodeName) {
        template = template.replace('${value}', bpmNodeObj.attr('comment'));
    } else {
        template = template.replace('${value}', bpmNodeObj.attr('name'));
    }
    template = template.replace('${x}', array[0]);
    template = template.replace('${y}', array[1]);
    template = template.replace('${width}', array[2]);
    template = template.replace('${height}', array[3]);

    //画线
    bpmNodeObj.children('transition').each(function (i) {
        template += CompileFlowCodec.buildCellEdg(id, $(this));
    });

    return template;
};

CompileFlowCodec.buildCellEdg = function (from, transitionObj) {
    var to = transitionObj.attr('to');

    var template = '<mxCell edge="1" parent="10001" source="${from}" target="${to}">\n' +
        '            <mxGeometry relative="1" as="geometry"/>\n' +
        '        </mxCell>';
    template = template.replace('${from}', from);
    template = template.replace('${to}', to);
    return template;
};

CompileFlowCodec.parseG = function (gStr) {
    var array = gStr.split(",");
    var g = {};
    g.x = array[0];
    g.y = array[1];
    g.width = array[2];
    g.height = array[3];
    return g;
};

CompileFlowCodec.getNodeTemplate = function (bpmNodeObj) {
    var nodeName = bpmNodeObj[0].nodeName;
    var template;
    if ('START' === nodeName || 'END' === nodeName) {
        template = '<mxCell id="${id}" value="${value}" vertex="1" parent="10001" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#CDAA7D;">' +
            '            <mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>' +
            '        </mxCell>';
    }
    else if ('DECISION' === nodeName) {
        template = '<mxCell id="${id}" value="${value}" vertex="1" parent="10001" style="rhombus;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FF8247;">' +
            '            <mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>' +
            '        </mxCell>';
    } else if ('LOOPPROCESS' === nodeName) {
        template = '<mxCell id="${id}" value="${value}" vertex="1" parent="10001" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E0FFFF;">' +
            '            <mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>' +
            '        </mxCell>';
    }
    else {
        template = '<mxCell id="${id}" value="${value}" vertex="1" parent="10001" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#5F9EA0;">' +
            '            <mxGeometry x="${x}" y="${y}" width="${width}" height="${height}" as="geometry"/>' +
            '        </mxCell>';
    }
    return template;
};

CompileFlowCodec.buildNodeWithAttr = function (nodeName, attrs, withEnd) {
    var nodeStr = '<' + nodeName;

    if (!CompileFlowCodec.objIsEmpty(attrs)) {
        for (var key in attrs) {
            var value = attrs[key];
            if (value && value !== '') {
                nodeStr += ' ' + CompileFlowCodec.buildAttrKv(key, value);
            }
        }
    }

    if (withEnd) {
        nodeStr += '/>';
    } else {
        nodeStr += '>';
    }
    return nodeStr;
};

CompileFlowCodec.buildAttrKv = function (key, value) {
    return key + '="' + value + '"';
};

CompileFlowCodec.objIsEmpty = function (obj) {
    if (!obj) {
        return true;
    }
    for (key in obj) {
        return false;
    }
    return true;
};

CompileFlowCodec.graphModelToBpm = function () {

};


