// vite.config.ts
import { defineConfig } from "file:///home/projects/sb1-chbxle/node_modules/vite/dist/node/index.js";
import { crx } from "file:///home/projects/sb1-chbxle/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Twitter Feed Scraper",
  version: "1.0",
  description: "Listens to, refreshes, and scrapes Twitter timeline",
  permissions: [
    "tabs",
    "scripting",
    "storage",
    "webNavigation"
  ],
  host_permissions: [
    "https://twitter.com/*",
    "https://x.com/*"
  ],
  background: {
    service_worker: "dist/background.js",
    type: "module"
  },
  content_scripts: [
    {
      matches: [
        "https://twitter.com/*",
        "https://x.com/*"
      ],
      js: ["dist/content.js"]
    }
  ],
  action: {
    default_popup: "popup.html"
  }
};

// vite.config.ts
var vite_config_default = defineConfig({
  plugins: [crx({ manifest: manifest_default })],
  build: {
    rollupOptions: {
      input: {
        background: "src/background.ts",
        content: "src/content.ts",
        popup: "src/popup.ts"
      },
      output: {
        entryFileNames: "dist/[name].js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3Byb2plY3RzL3NiMS1jaGJ4bGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3Byb2plY3RzL3NiMS1jaGJ4bGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvcHJvamVjdHMvc2IxLWNoYnhsZS92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJztcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL21hbmlmZXN0Lmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbY3J4KHsgbWFuaWZlc3QgfSldLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiB7XG4gICAgICAgIGJhY2tncm91bmQ6ICdzcmMvYmFja2dyb3VuZC50cycsXG4gICAgICAgIGNvbnRlbnQ6ICdzcmMvY29udGVudC50cycsXG4gICAgICAgIHBvcHVwOiAnc3JjL3BvcHVwLnRzJ1xuICAgICAgfSxcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Rpc3QvW25hbWVdLmpzJ1xuICAgICAgfVxuICAgIH1cbiAgfVxufSk7IiwgIntcbiAgXCJtYW5pZmVzdF92ZXJzaW9uXCI6IDMsXG4gIFwibmFtZVwiOiBcIlR3aXR0ZXIgRmVlZCBTY3JhcGVyXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiTGlzdGVucyB0bywgcmVmcmVzaGVzLCBhbmQgc2NyYXBlcyBUd2l0dGVyIHRpbWVsaW5lXCIsXG4gIFwicGVybWlzc2lvbnNcIjogW1xuICAgIFwidGFic1wiLFxuICAgIFwic2NyaXB0aW5nXCIsXG4gICAgXCJzdG9yYWdlXCIsXG4gICAgXCJ3ZWJOYXZpZ2F0aW9uXCJcbiAgXSxcbiAgXCJob3N0X3Blcm1pc3Npb25zXCI6IFtcbiAgICBcImh0dHBzOi8vdHdpdHRlci5jb20vKlwiLFxuICAgIFwiaHR0cHM6Ly94LmNvbS8qXCJcbiAgXSxcbiAgXCJiYWNrZ3JvdW5kXCI6IHtcbiAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwiZGlzdC9iYWNrZ3JvdW5kLmpzXCIsXG4gICAgXCJ0eXBlXCI6IFwibW9kdWxlXCJcbiAgfSxcbiAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xuICAgIHtcbiAgICAgIFwibWF0Y2hlc1wiOiBbXG4gICAgICAgIFwiaHR0cHM6Ly90d2l0dGVyLmNvbS8qXCIsXG4gICAgICAgIFwiaHR0cHM6Ly94LmNvbS8qXCJcbiAgICAgIF0sXG4gICAgICBcImpzXCI6IFtcImRpc3QvY29udGVudC5qc1wiXVxuICAgIH1cbiAgXSxcbiAgXCJhY3Rpb25cIjoge1xuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInBvcHVwLmh0bWxcIlxuICB9XG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UCxTQUFTLG9CQUFvQjtBQUMxUixTQUFTLFdBQVc7OztBQ0RwQjtBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUFBLEVBQ2YsYUFBZTtBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxrQkFBb0I7QUFBQSxJQUNsQjtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxZQUFjO0FBQUEsSUFDWixnQkFBa0I7QUFBQSxJQUNsQixNQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsaUJBQW1CO0FBQUEsSUFDakI7QUFBQSxNQUNFLFNBQVc7QUFBQSxRQUNUO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLElBQU0sQ0FBQyxpQkFBaUI7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVU7QUFBQSxJQUNSLGVBQWlCO0FBQUEsRUFDbkI7QUFDRjs7O0FEM0JBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxJQUFJLEVBQUUsMkJBQVMsQ0FBQyxDQUFDO0FBQUEsRUFDM0IsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsWUFBWTtBQUFBLFFBQ1osU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
