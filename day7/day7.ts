import * as fs from 'fs';

const input = fs.readFileSync('./test.txt', 'utf-8').trim();

function solve(input) {
    const sizes = { '/': 0 }; // map of path to size
    const paths = ['/']; // stack of paths we're in
    const lines = input.split('\n');
    for (let i = 1; i < lines.length; i++) {
        const [, cmd, dir] = lines[i].split(' ');
        if (cmd === 'ls') {
            for (i++; i < lines.length; i++) {
                const parts = lines[i].split(' ');
                if (parts[0] === '$') {
                    i--;
                    break;
                }
                if (parts[0] !== 'dir') { 
                    for (const path of paths) {  // add size to all paths we're in
                        sizes[path] = (sizes[path] ?? 0) + Number.parseInt(parts[0]);
                    }
                }
            }
        } else {
        if (dir === '..') {
            paths.pop();
        } else {
            paths.push(`${paths.at(-1)}${dir}/`);
        }
        }
    }
    console.log(sizes);

  console.log(
    Object.values(sizes)
      .filter((size) => size <= 100000)
      .reduce((acc, size) => acc + size)
  );

  console.log(
    Math.min(
      ...Object.values(sizes).filter((size) => size >= sizes['/'] - 40000000)
    )
  );
}
solve(input);