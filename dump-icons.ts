import * as fs from "fs";
import * as Icons from "hugeicons-react";

const allIcons = Object.keys(Icons).join("\n");
fs.writeFileSync("all-icons.txt", allIcons);
console.log("Done writing icons.");
