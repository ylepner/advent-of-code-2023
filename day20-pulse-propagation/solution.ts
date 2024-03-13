interface ModuleMemory {
  [key: string]: string | { [key: string]: string };
}

interface Module {
  name: string;
  type: string;
  outputs: string[];
  memory: string | ModuleMemory;
}

const modules: { [key: string]: Module } = {};
let broadcastTargets: string[] = [];

export function solveTest(input: string) {
  const lines = input.trim().split('\n').map(line => line.trim());
  let memory;
  for (const line of lines) {
    const [left, right] = line.trim().split(" -> ");
    const outputs = right.split(", ");

    if (left === "broadcaster") {
      broadcastTargets = outputs;
    } else {
      const type = left[0];
      const name = left.slice(1);
      if (type === "%") {
        memory = "off";
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
  const modulesArr = Object.entries(modules);
  for (const [name, module] of Object.entries(modules)) {
    for (const output of module.outputs) {
      if (modules.hasOwnProperty(output)) {
        const test = modules[output].type;
        if (modules[output].type === "&") {
          (modules[output].memory as ModuleMemory)[name] = "lo";
        }
      }
    }

    let lo = 0;
    let hi = 0;

    for (let _ = 0; _ < 1; _++) {
      lo++;
      const q: [string, string, string][] = broadcastTargets.map(target => ["broadcaster", target, "lo"]);

      while (q.length > 0) {
        const [origin, target, pulse] = q.shift()!;

        if (pulse === "lo") {
          lo++;
        } else {
          hi++;
        }

        if (!(target in modules)) {
          continue;
        }

        const module = modules[target];

        if (module.type === "%") {
          if (pulse === "lo") {
            module.memory = (module.memory === "off") ? "on" : "off";
            const outgoing = (module.memory === "on") ? "hi" : "lo";
            for (const x of module.outputs) {
              q.push([module.name, x, outgoing]);
            }
          }
        } else {
          (module.memory as ModuleMemory)[origin] = pulse;
          const outgoing = Object.values(module.memory as ModuleMemory).every(x => x === "hi") ? "lo" : "hi";
          for (const x of module.outputs) {
            q.push([module.name, x, outgoing]);
          }
        }
      }
    }
    return lo * hi;
  }
}
