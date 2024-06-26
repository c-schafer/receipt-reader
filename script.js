import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
dotenv.config();

function formSubmitted() {
  //   alert("Form submitted!");
  document.getElementById("preview").style.display = "none";
}

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
        readWithGemini(file);
      };
      reader.readAsDataURL(file);
    }
  });

document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    formSubmitted();
  });

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Converts a File object to a GoogleGenerativeAI.Part object.
async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
}

async function readWithGemini(img) {
  const prompt =
    "List the items of this receipt in one column and the prices in another";

  // const fileInputEl = document.querySelector("input[type=file]");
  // const imageParts = await Promise.all(
  //   [...fileInputEl.files].map(fileToGenerativePart)
  // );
  // const result = await model.generateContent([prompt, ...imageParts]);

  const result = await model.generateContent([
    prompt,
    fileToGenerativePart(img),
  ]);

  const response = await result.response;
  const text = response.text();
  console.log(text);
}
