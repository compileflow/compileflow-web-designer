CompileFlowApi = {};

CompileFlowApi.loadXml = function (editor, xmlId) {
    CompileFlowUtils.Ajax.get('data/demo_bpm.xml', function (bpm) {
        var graphModel = CompileFlowCodec.bpmToGraphModel(bpm);
        var doc = mxUtils.parseXml(graphModel);
        editor.graph.importGraphModel(doc.documentElement);
    });
};

CompileFlowApi.changeXml = function (id, xml) {
    //console.log(id);
    //console.log(xml);
};