import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import pug from 'pug';

const app = express();
const port = 3000;
let server: any;

app.get('/', (req: Request, res: Response) => {
  const html = fs.readFileSync(path.resolve(__dirname, 'auction.html'), 'utf8');
  const script = fs.readFileSync(path.resolve(__dirname, 'script.js'), 'utf8');

  const compiledFunction = pug.compileFile(path.resolve(__dirname, 'bid.pug'));
  const bidHtml = compiledFunction({ bidValue: '$23,100' });

  res.send(`
    <!doctype html>
    <html lang="en">
      ${html}
      <script>
      ${script}
      </script>
      ${bidHtml}
    </html>
  `);
});

export const mockServer = {
  start: () => {
    server = app.listen(port, () => {
      console.log(`Mock server listening at http://localhost:${port}`);
    });
  },
  stop: () => {
    server.close();
  },
};
