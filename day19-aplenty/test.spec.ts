import { readFile } from "fs/promises";
import path from "path";
import { parseRatings, parseWorkflows, solve19 } from "./solution";

describe('Day 19, https://adventofcode.com/2023/day/19', () => {
  test('correct parsing of workflows', () => {
    const result = parseWorkflows(workflows);
    console.log(result);
  });
  test('correct parsing of ratings', () => {
    const result = parseRatings(ratings);
    console.log(result);
  });
  test('should return number', () => {
    const result = solve19(data);
    expect(result).toBe(19114);
  })
})

describe('Test big data', () => {
  test('Should return number', async () => {
    const data = await getData();
    const result = solve19(data);
    expect(result).toBe(446517);
  })
})

const data = `
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
`

const workflows = `
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,sA}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}`

const ratings = `
{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}
`
async function getData() {
  const file = path.join(__dirname, 'data.txt');
  const result = await readFile(file, { encoding: 'utf-8' });
  return result;
}