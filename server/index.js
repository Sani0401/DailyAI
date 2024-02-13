
import express from 'express';
const app = express();
import env from "dotenv"
import adminController from '../server/controller/adminController.js'
import clientController from '../server/controller/clientController.js'
import cors from "cors"
import connect from "../server/config/connectDB.js"

env.config();

const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

await connect();

app.get("/", (req,res) =>{
  res.send("Working")
})


app.use("/api/v1/admin", adminController)
app.use("/api/v1/client", clientController)


app.listen(PORT, () =>{
  console.log(`Listening on port ${PORT}`);
})

































// import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { HuggingFaceInferenceEmbeddings } from "langchain/embeddings/hf";
// import { Chroma } from "@langchain/community/vectorstores/chroma";
// import { createRepo, uploadFile, deleteFiles} from "@huggingface/hub";

// import { HuggingFaceInference } from "langchain/llms/hf";


// // Web Loader
// const loader = new CheerioWebBaseLoader(
//   "https://court.mah.nic.in/courtweb/static_pages/courts/satara.htm"
// );

// // Loading Documents
// const docs = await loader.load();


// // Splitting and creating chunks
// const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 64,
//     chunkOverlap: 1,
//   });
// const output = await splitter.createDocuments([docs[0].pageContent]);
  
// // Extracting the strings from the splits
// const pageContentsArray = output.map(document => document.pageContent);


  
// // Creating embeggings model 
// const embeddings = new HuggingFaceInferenceEmbeddings({
//     apiKey: "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", modelName:"Xenova/all-MiniLM-L6-v2"
// }) 

// // creating the embeddings of the  main content




// // Creating the collection of the Chroma and adding the embeddings to it
// const vectorStore = await Chroma.fromDocuments(output, embeddings, {
//     collectionName: "a-test-collection",
//     url: "http://localhost:8000", 
//     collectionMetadata: {
//       "hnsw:space": "cosine",
//     }, 
//   });
// const data = await vectorStore.collection.peek()
//   console.log();


 

