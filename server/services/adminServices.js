import express from "express";
import { OpenAI } from "openai";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'
dotenv.config();
const openAi = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY 

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
