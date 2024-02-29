interface Connection {
  name?: string,
  type: ConnectionType,
  toggle?: 'on' | 'off' | null,
  pulse?: 'low' | 'high' | null,
  inputs?: Record<string, 'low' | 'high'>[] | null,
  outputs: string[],
}

interface State {
  highPulses: 0,
  lowPulses: 0,
  allConnections: Connection[];
}

type ConnectionType = 'button' | 'broadcaster' | '%' | '&';

type PulseType = 'high' | 'low';

type ToggleType = 'off' | 'on';

interface ConjunctionInput {
  module: string,
  pulse: PulseType
};

let originalConnections: Connection[] = [];

export function solve20(data: string) {
  const modules = convertData(data);
  const state: State = {
    highPulses: 0,
    lowPulses: 0,
    allConnections: modules,
  }
}

export function convertData(data: string): Connection[] {
  const dataToConvert = parseData(data);
  let result: Connection[] = dataToConvert.map(line => {
    let name;
    let toggle: 'on' | 'off' | null = null;
    let type = line[0][0].trim() as ConnectionType;
    let inputs: Record<string, 'low' | 'high'>[] = [];
    if (line[0] === 'broadcaster') {
      name = 'broadcaster'
    } else {
      name = line[0].slice(1);
    };
    if (type === '%') {
      toggle = 'off';
    };
    if (type === '&') {
      inputs = [];
    }
    return {
      name: name,
      type: type,
      outputs: line[1].split(',').map(el => el.trim()),
      toggle: toggle ? toggle : null,
      inputs: inputs ? inputs : null,
    };
  });
  result = addInputs(result);
  Object.assign(originalConnections, result);
  return result;
};

function parseData(data: string) {
  const split = data.trim().split('\n').map(line => line.trim().split('->').map(el => el.trim()));
  return split;
}

function addInputs(connections: Connection[]): Connection[] {
  const conjunctionsModules = connections.filter(el => el.type === '&');
  conjunctionsModules.forEach(el => {
    const elementsIncludesModule = connections.filter(connection => connection.outputs.includes(el.name!));
    elementsIncludesModule.forEach(module => {
      let connection = connections.find(connection => connection.name === el.name);
      if (connection && connection.inputs) {
        if (module.name && module.toggle) {
          const inputObject = {
            [module.name]: module.pulse!,
          }
          connection.inputs.push(inputObject);
        }
      }
    })
  })
  return connections;
}

function handleButton() {
  const moduleState: ModuleState = {
    currentModuleName: 'button',
    currentModuleType: 'button',
    outgoingPulse: 'low',
    outputs: ['broadcaster']
  }
  return moduleState;
}

function handleBroadcaster<T extends string>(moduleName: T, getOutputs: (moduleName: T) => string[]) {
  const moduleState: ModuleState = {
    currentModuleName: moduleName,
    currentModuleType: 'broadcaster',
    outgoingPulse: 'low',
    outputs: getOutputs(moduleName),
  }
  return moduleState;
}

function handleFlipFlopModule<T extends string>(moduleName: T, getOutputs: (moduleName: T) => string[], incomingPulse: PulseType, toggle: ToggleType, getOutgoingPulse: (incomingPulse: PulseType, toggle: toggleType) => PulseType) {
  const moduleState: ModuleState = {
    currentModuleName: moduleName,
    currentModuleType: '%',
    outgoingPulse: getOutgoingPulse(incomingPulse, toggle),
    outputs: getOutputs(moduleName),
  }
  return moduleState;
}

// if flip flop change => update conjunction
function updateConjunctionModuleOutput<T extends string>(updatingModule: T, flipFlopModuleName: string, flipFlopModulePulse: PulseType, updateModule: (module: T) => ModuleState) {
  const updatedOutput: ConjunctionInput = {
    module: flipFlopModuleName,
    pulse: flipFlopModulePulse
  }
  const moduleState: ModuleState = updateModule(updatingModule);
  return moduleState;
}

function handleConjunctionModule<T extends string>(moduleName: T, getInputs: (moduleName: T) => ConjunctionInput[], getOutputs: (moduleName: T) => string[], incomingPulse: PulseType, getOutgoingPulse: (moduleName: T) => PulseType) {
  const moduleState: ModuleState = {
    currentModuleName: moduleName,
    currentModuleType: '%',
    outgoingPulse: getOutgoingPulse(moduleName),
    outputs: getOutputs(moduleName),
  }
  return moduleState;
}

interface ModuleState {
  currentModuleType: ConnectionType,
  currentModuleName: string,
  outgoingPulse: PulseType,
  outputs: string[];
}

