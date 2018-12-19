import {
  bootstrapViewer,
  getBpmnJS
} from 'bpmn-js/test/helper';

import BpmnJS from 'bpmn-js';

import AddExporterModule from '..';

var diagramXML = require('./diagram.bpmn');


describe('add-exporter', function() {

  describe('should serialize exporter values', function() {

    beforeEach(bootstrapViewer(diagramXML, {
      additionalModules: [
        AddExporterModule
      ],
      exporter: {
        name: 'foo',
        version: '100.1-bar'
      }
    }));


    it('works', function(done) {

      // given
      var bpmnJS = getBpmnJS();

      // when
      bpmnJS.saveXML(function(err, xml) {

        expect(xml).to.contain('exporter="foo"');
        expect(xml).to.contain('exporterVersion="100.1-bar"');

        done(err);
      });
    });

  });


  describe('should throw on invalid configuration', function() {

    it('exporter config missing', function() {

      expect(function() {

        new BpmnJS({
          additionalModules: [
            AddExporterModule
          ]
        });

      }).to.throw('config.exporter = { name, version } not configured');
    });


    it('exporter config invalid props', function() {

      expect(function() {

        new BpmnJS({
          additionalModules: [
            AddExporterModule
          ],
          exporter: {}
        });

      }).to.throw('config.exporter = { name, version } missing required props');
    });

  });

});