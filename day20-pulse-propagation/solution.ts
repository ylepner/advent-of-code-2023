interface ModuleMemory {
  [key: string]: string;
}

interface Module {
  name: string;
  type: string;
  outputs: string[];
  memory: string | ModuleMemory;
}

const modules: { [key: string]: Module } = {};
let broadcastTargets: string[] = [];

export function solve(input: string) {
  const lines = input.trim().split('\n').map(line => line.trim());
  let memory;
  for (const line of lines) {
    const [left, right] = line.trim().split(' -> ');
    const outputs = right.split(', ');

    if (left === 'broadcaster') {
      broadcastTargets = outputs;
    } else {
      const type = left[0];
      const name = left.slice(1);
      if (type === '%') {
        memory = 'off';
      } else {
        memory = {};
      }
      modules[name] = {
        name: name,
        memory: memory,
        outputs: outputs,
        type: type,
      };
    }
  }

  const modulesArray: [string, Module][] = Object.entries(modules);
  for (const [num, module] of Object.entries(modulesArray)) {
    for (const output of module[1].outputs) {
      if (modules.hasOwnProperty(output)) {
        if (modules[output].type === '&') {
          (modules[output].memory as ModuleMemory)[module[0]] = 'low';
        }
      }
    }
  }

  let low = 0;
  let high = 0;

  for (let i = 0; i < 1000; i++) {
    low++;
    const q: [string, string, string][] = broadcastTargets.map(target => ['broadcaster', target, 'low']);

    while (q.length > 0) {
      const [origin, target, pulse] = q.shift()!;

      if (pulse === 'low') {
        low++;
      } else {
        high++;
      }

      if (!(target in modules)) {
        continue;
      }

      const module = modules[target];

      if (module.type === '%') {
        if (pulse === 'low') {
          module.memory = (module.memory === 'off') ? 'on' : 'off';
          const outgoing = (module.memory === 'on') ? 'high' : 'low';
          for (const x of module.outputs) {
            q.push([module.name, x, outgoing]);
          }
        }
      } else {
        (module.memory as ModuleMemory)[origin] = pulse;
        const outgoing = Object.values(module.memory as ModuleMemory).every(x => x === 'high') ? 'low' : 'high';
        outgoing;
        for (const x of module.outputs) {
          q.push([module.name, x, outgoing]);
        }
      }
    }
  }
  return low * high;
}
