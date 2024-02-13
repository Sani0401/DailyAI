import express from "express";
import { OpenAI } from "openai";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";

const openAi = new OpenAI({
  apiKey: "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",
});
const supabaseUrl = 'https://xvyuhmoyjeezlxmuwxec.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2eXVobW95amVlemx4bXV3eGVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1OTYxODUsImV4cCI6MjAyMzE3MjE4NX0.CJWm8qoFbGAkonnUupDlj-F3JbVcwT6tw2Sm5XNz8eo"
const supabase = createClient(supabaseUrl, supabaseKey)

async function addData(data) {



  try{
    const content = data.tdata.replace(/\n/g, " ");
    console.log(content);
  
    const result = await openAi.embeddings.create({
      input: content,
      model: "text-embedding-ada-002",
    });
    const embedding = result.data[0].embedding;
  
    const {error} = await supabase.from("documents").insert({
      content ,
      embedding
    })
    if( error){
      return -1;
    }
    return 1;
  }
  catch(error){
    console.log(error);
    return -1;
  }


  
}

export default addData;
