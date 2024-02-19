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
  type: connectionType,
  toggle?: 'on' | 'off' | null,
  pulse?: 'low' | 'high',
  connections: string[],
}

type connectionType = 'button' | 'broadcast' | '%' | '&';

const result: Connection[] = [
  {
    type: 'broadcast',
    connections: ['a', 'b', 'c']
  },
  {
    name: 'a',
    type: '%',
    toggle: 'off',
    connections: ['b'],
  },
  {
    name: 'b',
    type: '%',
    toggle: 'off',
    connections: ['c'],
  },
  {
    name: 'c',
    type: '%',
    toggle: 'off',
    connections: ['inv'],
  },
  {
    name: 'inv',
    type: '&',
    connections: ['a'],
  }
]


export function convertData(data: string): Connection[] {
  const dataToConvert = parseData(data);
  const result: Connection[] = dataToConvert.map(line => {
    let name;
    let toggle: 'on' | 'off' | null = null;
    let type = line[0][0].trim() as connectionType;
    if (line[0] === 'broadcaster') {
      name = 'broadcaster'
    } else {
      name = line[0].slice(1);
    };
    if (type === '%') {
      toggle = 'off';
    };
    return {
      name: name,
      type: type,
      connections: line[1].split(','),
      toggle: toggle ? toggle : null,
    };
  });
  return result;
};

function parseData(data: string) {
  const split = data.trim().split('\n').map(line => line.trim().split('->').map(el => el.trim()));
  return split;
}

