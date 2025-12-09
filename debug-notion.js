const { Client } = require("@notionhq/client");

const notion = new Client({ auth: "secret_123" });

console.log("Client instance created.");
console.log("databases keys:", Object.keys(notion.databases));
console.log("databases.query type:", typeof notion.databases.query);
console.log("databases.retrieve type:", typeof notion.databases.retrieve);
