import OpenAI from "openai";

export const aiExtractSkills = async (rawText) => {
  if (!process.env.OPENAI_API_KEY) return null; // not configured
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `Extract only technical skills from the resume text.
Return a JSON array of lowercase skill strings (no commentary).
Text:
"""${rawText.slice(0, 12000)}"""`;

  const resp = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
  });

  const content = resp.choices[0].message.content || "[]";
  try {
    const parsed = JSON.parse(content);
    // keep only strings & lowercase unique
    return [...new Set(parsed.filter(x => typeof x === "string").map(s => s.toLowerCase()))];
  } catch {
    return null;
  }
};

// import OpenAI from "openai";

// export const aiExtractSkills = async (rawText) => {
//   if (!process.env.OPENAI_API_KEY) {
//     console.warn("OpenAI API key not configured, skipping AI extraction");
//     return [];
//   }
//   const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

//   const prompt = `Extract only technical skills (programming languages, frameworks, tools, databases, etc.) from the resume text. 
// Return a JSON array of lowercase skill strings, no commentary or non-technical skills. Examples: ["javascript", "python", "aws"]. 
// Focus on skills like ${MASTER_SKILLS.join(
//     ", "
//   )}. Ignore soft skills or vague terms like "communication" or "leadership".
// Text (first 12000 chars):
// """${rawText.slice(0, 12000)}"""`;

//   const maxRetries = 3;
//   let attempt = 0;

//   while (attempt < maxRetries) {
//     try {
//       const resp = await client.chat.completions.create({
//         model: "gpt-4o-mini",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0,
//       });

//       console.log("OpenAI response:", resp.choices[0].message.content);
//       const content = resp.choices[0].message.content || "[]";
//       const parsed = JSON.parse(content);
//       const skills = [
//         ...new Set(
//           parsed
//             .filter((x) => typeof x === "string")
//             .map((s) => s.toLowerCase())
//         ),
//       ];
//       console.log("AI parsed skills:", skills);
//       return skills;
//     } catch (error) {
//       console.error(
//         `AI extraction attempt ${attempt + 1} failed:`,
//         error.message
//       );
//       attempt++;
//       if (attempt === maxRetries) {
//         console.error("AI extraction failed after retries");
//         return [];
//       }
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//     }
//   }
// };
// // export const aiExtractSkills = async (rawText) => {
// //   if (!process.env.OPENAI_API_KEY) {
// //     console.warn("OpenAI API key not configured, skipping AI extraction");
// //     return [];
// //   }
// //   const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// //   const prompt = `Extract only technical skills (programming languages, frameworks, tools, databases, etc.) from the resume text.
// // Return a JSON array of lowercase skill strings, no commentary or non-technical skills. Examples: ["javascript", "python", "aws"].
// // Text:
// // """${rawText.slice(0, 12000)}"""`;

// //   const maxRetries = 3;
// //   for (let attempt = 1; attempt <= maxRetries; attempt++) {
// //     try {
// //       const resp = await client.chat.completions.create({
// //         model: "gpt-4o-mini",
// //         messages: [{ role: "user", content: prompt }],
// //         temperature: 0,
// //       });

// //       let content = resp.choices[0].message.content || "[]";
// //       let parsed = [];
// //       try {
// //         parsed = JSON.parse(content);
// //       } catch (err) {
// //         console.warn("AI returned invalid JSON, falling back to []", content);
// //         parsed = [];
// //       }

// //       return [
// //         ...new Set(
// //           parsed
// //             .filter((x) => typeof x === "string")
// //             .map((s) => s.toLowerCase())
// //         ),
// //       ];
// //     } catch (error) {
// //       console.error(`AI extraction attempt ${attempt} failed:`, error.message);
// //       if (attempt === maxRetries) return [];
// //       await new Promise((r) => setTimeout(r, 1000));
// //     }
// //   }
// //   return [];
// // };
