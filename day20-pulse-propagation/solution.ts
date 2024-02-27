// % - flip-flop
// initially off
// high pulse => ignore
// low pulse => If it was off, it turns on and sends a high pulse.
// low pulse => If it was on, it turns off and sends a low pulse.

// & Conjunction modules
// initially default to remembering a low pulse for each input
// first updates its memory for the input
// high pulses for all inputs remembered => sends a low pulse
// else => sends a high pulse

// broadcast module
// Receives a pulse => sends the same pulse to all of its destination modules

// button module
// push the button => a single low pulse is sent directly to the broadcaster module

// Never push the button if modules are still processing pulses.

// Pulses are always processed in the order they are sent.

interface Connection {
  name?: string,
  type: ConnectionType,
  toggle?: 'on' | 'off' | null,
  pulse?: 'low' | 'high',
  inputs?: Record<string, 'low' | 'high'>[] | null,
  outputs: string[],
}

interface State {
  highPulses: 0,
  lowPulses: 0,
  allConnections: Connection[];
}

type ConnectionType = 'button' | 'broadcaster' | '%' | '&';

const result: Connection[] = [
  {
    type: 'broadcaster',
    pulse: 'low',
    outputs: ['a', 'b', 'c']
  },
  {
    name: 'a',
    type: '%',
    toggle: 'off',
    outputs: ['b'],
  },
  {
    name: 'b',
    type: '%',
    toggle: 'off',
    outputs: ['c'],
  },
  {
    name: 'c',
    type: '%',
    toggle: 'off',
    outputs: ['inv'],
  },
  {
    name: 'inv',
    type: '&',
    outputs: ['a'],
    inputs: [{ c: 'low' }],
  }
]

let originalConnections: Connection[] = [];

export function solve20(data: string) {
  const modules = convertData(data);
  const state: State = {
    highPulses: 0,
    lowPulses: 0,
    allConnections: modules,
  }
  const test = pushButton(null, state);
}

export function pushButton(previousModuleState: Connection | null, state: State) {
  state.lowPulses += 1;
  const nextModule = state.allConnections.find(module => module.name === 'broadcaster')!;
  nextModule.pulse = 'low';
  state = sentPulse(nextModule, nextModule.pulse, state);
  updateState(nextModule, 'low', state);
}

function sentPulse(currentModule: Connection, pulse: 'low' | 'high', state: State) {
  if (pulse === 'high') {
    state.highPulses += 1
  } else {
    state.lowPulses += 1
  }
  return state;
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

function parseData(data: string) {
  const split = data.trim().split('\n').map(line => line.trim().split('->').map(el => el.trim()));
  return split;
}

function updateState(currentModuleState: Connection, pulse: 'high' | 'low', state: State) {
  let connections;
  let prevPulse;
  let nextState: Partial<Connection> = {};
  if (currentModuleState.name === 'broadcaster') {
    // check all connections
    // result depends on type of connection
    connections = currentModuleState.outputs;
    for (let connection of connections) {
      const find = state.allConnections.find(el => el.name === connection);
      if (find) {
        nextState = find;
        if (nextState.type === '%') {
          state = sentPulse(nextState as Connection, 'low', state);
          updateState(nextState as Connection, 'low', state);
          // if (currentModuleState.pulse === 'low') {
          //   // it turns on and sends a high pulse
          //   // update pulse state
          //   if (find.toggle === 'off') {
          //     nextState.toggle = 'on';
          //     nextState.pulse = 'high';
          //     updateConjunctionModule(state.allConnections, nextState as Connection)
          //     state = sentPulse(nextState as Connection, nextState.pulse, state);
          //     updateState(nextState as Connection, state);
          //   } else {
          //     nextState.toggle = 'off';
          //     nextState.pulse = 'low';
          //     state = sentPulse(nextState as Connection, nextState.pulse, state);
          //     updateState(nextState as Connection, state);
          //   }
          // } else {
          //   continue;
          // }
          // } else if (nextState.type === '&') {
          //   // When a pulse is received, the conjunction module first updates its memory for that input
          //   // if it remembers high pulses for all inputs, it sends a low pulse; otherwise, it sends a high pulse.
          //   const inputs = nextState.inputs!;
          //   const inputsModules = inputs.map(input => state.allConnections.find(el => el.name === input[el.name]))
          //   if (inputsModules.every(input => input!.pulse === 'high')) {
          //     nextState.pulse = 'low';
          //     state.lowPulses += 1;
          //   } else {
          //     nextState.pulse = 'high';
          //     state.highPulses += 1;
          //   }
          // }
        }
      }
    }
  }
  if (currentModuleState.type === '%') {
    if (currentModuleState.pulse === 'low') {
      // it turns on and sends a high pulse
      // update pulse state
      if (currentModuleState.toggle === 'off') {
        nextState.toggle = 'on';
        nextState.pulse = 'high';
        updateConjunctionModule(state.allConnections, nextState as Connection)
        state = sentPulse(nextState as Connection, nextState.pulse, state);
      } else {
        nextState.toggle = 'off';
        nextState.pulse = 'low';
        state = sentPulse(nextState as Connection, nextState.pulse, state);
      }
    }
    updateState(nextState as Connection, nextState.pulse!, state);
  }
  return { nextModule: nextState, state: state };
}

// button => low => broadcast
// broadcast => low => a,b,c
// a, off => a, on => high => b
// b, off => b, on => high => c
// c, off => c, on => high => inv 

function checkForOriginalState(originalConnections: Connection[], currentConnections: Connection[]) {
  return JSON.stringify(originalConnections) === JSON.stringify(currentConnections);
}

function updateConjunctionModule(connections: Connection[], currentFlipFlopModule: Connection) {
  const conjunctionsModules = connections.filter(el => el.type === '&');
  const res = conjunctionsModules.map(module => {
    if (module.inputs) {
      module.inputs.forEach(el => {
        if (el.hasOwnProperty(currentFlipFlopModule.name!)) {
          el[currentFlipFlopModule.name!] = currentFlipFlopModule.pulse as "low" | "high";
        }
      });
    }
  });
  return connections;
}