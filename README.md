# @bpmn-io/add-exporter

[![Build Status](https://travis-ci.com/bpmn-io/add-exporter.svg?branch=master)](https://travis-ci.com/bpmn-io/add-exporter)

Plugs into your favorite [BPMN](https://github.com/bpmn-io/bpmn-js), [DMN](https://github.com/bpmn-io/dmn-js) and [CMMN](https://github.com/bpmn-io/cmmn-js) editor and adds the `exporter` and `exporterVersion` meta-data to saved diagrams.


## Usage

```javascript
import BpmnModeler from 'bpmn-js/lib/Modeler';

import AddExporter from '@bpmn-io/add-exporter';


// extend the BPMN editor with the exporter module
var modeler = new BpmnModeler({
  exporter: {
    name: 'my-tool',
    version: '120-beta.100'
  },
  additionalModules: [
    AddExporter
  ]
});


// see the meta-data appear on save
modeler.saveXML(function(err, xml) {

  xml; // ... <bpmn:Definitions ... exporter="my-tool" exporterVersion="120-beta.100">...
});
```


## License

MIT