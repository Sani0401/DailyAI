
import { createClient } from "@supabase/supabase-js";
import { oneLine, stripIndent } from "common-tags";

import { OpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from 'dotenv';
dotenv.config();


const openAi = new OpenAI({
openAIApiKey:"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"
})
const embeddings = new OpenAIEmbeddings();
const supabaseUrl = "https://xvyuhmoyjeezlxmuwxec.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2eXVobW95amVlemx4bXV3eGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1OTYxODUsImV4cCI6MjAyMzE3MjE4NX0.CJWm8qoFbGAkonnUupDlj-F3JbVcwT6tw2Sm5XNz8eo";
const supabase = createClient(supabaseUrl, supabaseKey);
const model = new OpenAI({
  
});
const memory = new BufferMemory();
async function getAnswer(query) {
  const content = query.replace(/\n/g, " ");
  const result = await embeddings.embedQuery(content);

  const documents = await supabase.rpc("match_documents", {
    query_embedding: result,
    match_threshold: 0.8,
    match_count: 10,
  });
  
  // Sort documents based on similarity in descending order
  const similarData = documents.data.sort((a, b) => b.similarity - a.similarity);
  
  // Take only the top 3 most similar documents
  const top3SimilarData = similarData.slice(0, 1);
console.log(top3SimilarData);
  var context = "";
  top3SimilarData.forEach((data) => {
    if (typeof data.content === "string") {
      const words = data.content.split(" ");
      context += words;
    } else {
      console.log("Content is not a string:", data.content);
    }
  });
  
  const answer = await generate(context, query);
  return answer; // Return the answer
}

async function generate(context, query) {
  const chain = new ConversationChain({ llm: model, memory: memory });
  const res1 = await chain.call({ input:` Your name is sani , who responds to the ${query} as sanii a task manager using this ${context}.!` });
  
  context = "";
  console.log({ res1 });
  return res1;
}

export default getAnswer;

