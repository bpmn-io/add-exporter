import {
  bootstrapViewer,
  getBpmnJS
} from 'bpmn-js/test/helper';

import BpmnJS from 'bpmn-js';
import DmnJS from 'dmn-js';

import AddExporter from '../add-exporter';

import AddExporterModule from '..';

var bpmnXML = require('./process.bpmn');
var dmnXML = require('./decision.dmn');


describe('add-exporter', function() {

  describe('should extend BpmnJS instance', function() {

    beforeEach(bootstrapViewer(bpmnXML, {
      additionalModules: [
        AddExporterModule
      ],
      exporter: {
        name: 'foo',
        version: 'bar'
      }
    }));


    it('serializing exporter value', function(done) {

      // given
      var bpmnJS = getBpmnJS();

      // when
      bpmnJS.saveXML(function(err, xml) {

        expect(xml).to.contain('exporter="foo"');
        expect(xml).to.contain('exporterVersion="bar"');

        done(err);
      });
    });

  });


  it('should extend existing instance via helper', function(done) {

    // given
    var dmnJS = new DmnJS();

    // when
    AddExporter({ name: 'foo', version: 'bar' }, dmnJS);

    // then
    dmnJS.importXML(dmnXML, function() {

      dmnJS.saveXML(function(err, xml) {

        expect(xml).to.contain('exporter="foo"');
        expect(xml).to.contain('exporterVersion="bar"');

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