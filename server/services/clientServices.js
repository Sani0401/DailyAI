
import { createClient } from "@supabase/supabase-js";
import { oneLine, stripIndent } from "common-tags";

import { OpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";

const openAi = new OpenAI({
  apiKey:"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"
})
const embeddings = new OpenAIEmbeddings();
const supabaseUrl = "https://xvyuhmoyjeezlxmuwxec.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2eXVobW95amVlemx4bXV3eGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1OTYxODUsImV4cCI6MjAyMzE3MjE4NX0.CJWm8qoFbGAkonnUupDlj-F3JbVcwT6tw2Sm5XNz8eo";
const supabase = createClient(supabaseUrl, supabaseKey);
const model = new OpenAI({});
const memory = new BufferMemory();

async function getAnswer(query) {
  const content = query.replace(/\n/g, " ");

    const result = await embeddings.embedQuery(content);



  
  const documents = await supabase.rpc("match_documents", {
    query_embedding: result,
    match_threshold: 0.8,
    match_count: 10,
  });
  console.log(documents);
  var context = "";
  const similarData = documents.data;
  console.log("This is similiar data",similarData);
  similarData.forEach((data) => {
    if (typeof data.content === "string") {
      const words = data.content.split(" ");
      context += words;
    } else {
      console.log("Content is not a string:", data.content);
    }
  });
  

    const  answer = await generate(
      context,
      query,
      
    );
   
    return answer; // Return the answer
  }
export default getAnswer;


async function generate(context, query) {

  const chain = new ConversationChain({ llm: model, memory: memory });
  const res1 = await chain.call({ input:` Yor name is sani, who responds to the ${query} using this ${context}. If you don't have answer respond as currently I am not trained on that data!` });
  console.log({ res1 });

return res1;
 }