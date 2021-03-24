CompileFlowApi = {};

CompileFlowApi.loadXml = function (editor, xmlId) {
    CompileFlowUtils.Ajax.get('data/demo2.xml', function (bpm) {

        //console.log('bpm:' + bpm);

        var graphModel = CompileFlowCodec.bpmToGraphModel(bpm);
        //console.log('graphModel:' + graphModel);

        var doc = mxUtils.parseXml(graphModel);
        editor.graph.importGraphModel(doc.documentElement);
    });
};

CompileFlowApi.changeXml = function (id, xml) {
    //console.log(id);
    //console.log(xml);
};
