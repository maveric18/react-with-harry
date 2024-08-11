import React, { useState } from "react";
import "../placeholder.css";

export default function TextForm(props) {
  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleOnClick = () => {
    let newText;
    if (isOn) {
      newText = text.toUpperCase();
      props.showAlert("Converted to Upper Case", "success");
    } else {
      newText = text.toLowerCase();
      props.showAlert("Converted to Lower Case", "success");
    }
    setText(newText);
    setIsOn(!isOn);
  };

  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text cleared", "success");
  };

  const handleSpeakClick = () => {
    const textToSpeech = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    textToSpeech.voice = voices[4];
    speechSynthesis.speak(textToSpeech);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to clipboard", "success");
  };

  const handleExtraSpaceClick = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed", "success");
  };

  const [text, setText] = useState("");
  const [isOn, setIsOn] = useState(true);

  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1 className="mb-4">{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className={`form-control ${props.mode === 'light' ? "light-placeholder" : "dark-placeholder"}`}
            placeholder="Enter your text here"
            style={{
              backgroundColor: props.mode === "light" ? "white" : "#13466e",
              color: props.mode === "light" ? "black" : "white",
            }}
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary" onClick={handleOnClick}>
          {isOn ? "Convert To Uppercase" : "Convert To Lowercase"}
        </button>
        <button disabled={text.length===0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearClick}
        >
          Clear Text
        </button>
        <button disabled={text.length===0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleSpeakClick}
        >
          Speak Text
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopyClick}>
          Copy Text
        </button>
        <button disabled={text.length===0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpaceClick}
        >
          Remove Extra Spaces
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>Your text summary</h1>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words and {text.length} characters
        </p>
        <p>{(0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length).toFixed(2)} Minuts read</p>
        <h3>Preview</h3>
        <p>
          {text.length > 0
            ? text
            : "Nothing to preview"}
        </p>
      </div>
    </>
  );
}
