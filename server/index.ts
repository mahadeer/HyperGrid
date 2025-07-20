import { serve } from "bun";
import { existsSync } from "fs";
import { PORT, PUBLIC_FOLDER } from './config';
import { getCurrentDir } from './utils';

console.log("Playground server starting...");

serve({
  port: PORT,
  async fetch(request) {
    const url = new URL(request.url);
    let filePath = getCurrentDir`/${PUBLIC_FOLDER}/${url.pathname}`;
    // If the path is just '/', serve index.html
    if (url.pathname === '/') {
      filePath = getCurrentDir`${PUBLIC_FOLDER}/index.html`;
    } else if (url.pathname.startsWith('/dist/')) {
      // Serve files from the dist directory
      filePath = getCurrentDir`${url.pathname}`;
    }

    if (existsSync(filePath)) {
      const file = Bun.file(filePath);
      return new Response(file);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Playground server listening on http://localhost:${PORT}`);
