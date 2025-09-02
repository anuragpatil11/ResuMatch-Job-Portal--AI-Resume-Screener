// canonical master skills list (expand as you like)
export const MASTER_SKILLS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node.js",
  "express",
  "mongodb",
  "mongoose",
  "sql",
  "postgresql",
  "mysql",
  "redis",
  "docker",
  "kubernetes",
  "aws",
  "gcp",
  "azure",
  "html",
  "css",
  "tailwind",
  "sass",
  "git",
  "github",
  "jest",
  "cypress",
  "java",
  "spring",
  "python",
  "django",
  "flask",
  "graphql",
  "rest",
  "rabbitmq",
  "kafka",
  "ci/cd",
  "linux",
  "c++",
  "postman",
  "jira",
  "agile",
  "scrum",
  "machine learning",
  "data science",
  "tensorflow",
  "pytorch",
  "nlp",
  "computer vision",
  "devops",
  "seo",
  "content writing",
  "copywriting",
  "digital marketing",
  "salesforce",
  "hubspot",
  "figma",
  "adobe photoshop",
  "adobe illustrator",
  "bootstrap",
  "tailwind",
  "material ui",
  "chakra ui",
  "redux",
  "mobx",
  "zustand",
  "react query",
  "apollo",
  "three.js",
  "unity",
  "unreal engine",
  "swift",
  "kotlin",
  "flutter",
  "react native",
  "ionic",
  "xamarin",
  "blockchain",
  "solidity",
  "web3.js",
  "metamask",
  "truffle",
  "hardhat",
];

export const normalize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9+.#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const extractSkillsRuleBased = (rawText) => {
  const text = normalize(rawText);
  const found = new Set();
  for (const skill of MASTER_SKILLS) {
    const pattern = new RegExp(
      `\\b${skill.replace(/[.+]/g, (x) => `\\${x}`)}\\b`,
      "i"
    );
    if (pattern.test(text)) found.add(skill);
  }
  return Array.from(found);
};

// export const MASTER_SKILLS = [
//   "javascript", "js", "typescript", "ts", "react", "reactjs", "react.js",
//   "next.js", "nextjs", "node.js", "nodejs", "express", "express.js",
//   "mongodb", "mongoose", "sql", "postgresql", "mysql", "redis",
//   "docker", "kubernetes", "aws", "gcp", "azure", "html", "css",
//   "tailwind", "tailwindcss", "sass", "scss", "git", "github", "gitlab",
//   "jest", "cypress", "java", "spring", "python", "django", "flask",
//   "graphql", "rest", "api", "rabbitmq", "kafka", "ci/cd", "linux",
//   "c++", "cpp", "c#", "postman", "jira", "agile", "scrum",
//   "machine learning", "ml", "data science", "tensorflow", "pytorch",
//   "nlp", "natural language processing", "computer vision", "devops",
//   "seo", "content writing", "copywriting", "digital marketing",
//   "salesforce", "hubspot", "figma", "adobe photoshop", "adobe illustrator",
//   "bootstrap", "material ui", "chakra ui", "redux", "mobx", "zustand",
//   "react query", "apollo", "three.js", "unity", "unreal engine",
//   "swift", "kotlin", "flutter", "react native", "ionic", "xamarin",
//   "blockchain", "solidity", "web3.js", "metamask", "truffle", "hardhat",
//   "vite", "prisma", "webpack", "esbuild", "graphql-yoga", "nestjs",
// ];

// export const normalize = (s) =>
//   s
//     .toLowerCase()
//     .replace(/[^a-z0-9+.#]/g, " ")
//     .replace(/\s+/g, " ")
//     .replace(/node\s*js/g, "node.js")
//     .replace(/react\s*js/g, "reactjs")
//     .replace(/next\s*js/g, "nextjs")
//     .replace(/tailwind\s*css/g, "tailwindcss")
//     .replace(/c\s*\+\+/g, "cpp")
//     .replace(/c\s*#/g, "c#")
//     .replace(/machine\s*learning/g, "machine learning")
//     .replace(/natural\s*language\s*processing/g, "nlp")
//     .trim();

// export const extractSkillsRuleBased = (rawText) => {
//   const text = normalize(rawText);
//   console.log("Normalized text sample:", text.slice(0, 100));
//   const found = new Set();
//   const patterns = MASTER_SKILLS.map((skill) => ({
//     skill,
//     regex: new RegExp(`\\b${skill.replace(/[.+]/g, (x) => `\\${x}`)}\\b`, "i"),
//   }));

//   for (const { skill, regex } of patterns) {
//     if (regex.test(text)) found.add(skill);
//   }
//   const skills = Array.from(found);
//   console.log("Rule-based matched skills:", skills);
//   return skills;
// };
