import { serve } from "bun";
import { join } from "path";
import { existsSync, readFileSync } from "fs";

console.log("Bun server starting...");

const getCurrentDir = (strings: TemplateStringsArray, ...values: any[]) => {
  const filePath = strings.reduce((result, string, i) => {
    return result + string + (values[i] || '');
  }, '');
  return join(process.cwd(), filePath);
};

serve({
  port: 3000,
  async fetch(request) {
    const url = new URL(request.url);
    let filePath = getCurrentDir`/playground/${url.pathname}`;
    // If the path is just '/', serve index.html
    if (url.pathname === '/') {
      filePath = getCurrentDir`playground/index.html`;
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

console.log("Bun server listening on http://localhost:3000");
