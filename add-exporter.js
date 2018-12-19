/**
 * Adds the exporter and exporterVersion meta-data on diagram export.
 *
 * Must provide the values via config.exporter = { name, version }.
 *
 * @param {Object} config
 * @param {EventBus} eventBus
 */
export default function AddExporter(config, eventBus) {

  if (!config) {
    throw new Error('config.exporter = { name, version } not configured');
  }

  var name = config.name,
      version = config.version;

  if (!name || !version) {
    throw new Error('config.exporter = { name, version } missing required props');
  }

  eventBus.on('saveXML.start', function(event) {
    var definitions = event.definitions;

    definitions.exporter = name;
    definitions.exporterVersion = version;
  });

}

AddExporter.$inject = [
  'config.exporter',
  'eventBus'
];