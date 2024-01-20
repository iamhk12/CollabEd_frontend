import "./index.scss";
import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../../Toolbar";
import html2pdf from "html2pdf.js";
import { editDoc, getCurrentDoc } from "../../API/Firestore";

import { deleteDocument } from "../../API/Firestore";
import { io } from "socket.io-client";

import { FaArrowLeft } from "react-icons/fa";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import { limit } from "firebase/firestore";

// import { Quill} from "react-quill";
// import { firestore } from "../../firebaseConfig";

export default function EditDoc({ handleEdit, id }: functionInterface) {
  const quillRef = useRef<any>(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [isTextToSpeechActive, setIsTextToSpeechActive] = useState(false);

  const toggleTextToSpeech = () => {
    setIsTextToSpeechActive((prev) => !prev);
    if (!isTextToSpeechActive) {
      const utterance = new SpeechSynthesisUtterance(value);
      utterance.onend = () => {
        setIsTextToSpeechActive(false); // Reset when speech is done
      };
      speechSynthesis.speak(utterance);
    } else {
      speechSynthesis.cancel();
    }
  };
  const [currentDocument, setCurrentDocument] = useState({
    title: "",
    value: "",
  });


  let debounceTimeout: any;

  const Changehandler = (e: any) => {
    setValue(e);

    // socket?.emit('send-changes');

    // // Set a new timeout to emit changes after a specific delay (e.g., 500 milliseconds)
    // debounceTimeout = setTimeout(() => {

    // }, 3000); // Adjust the delay as needed
  };

  // const [isSaving, setIsSaving] = useState("");

  // function  DeleteDoc(){

  //   await deleteDoc(doc(firestore, "docs", id));

  //   }

  function editDocument() {
    const payload = {
      value,
      title,
    };
    editDoc(payload, id);
  }

  //-------------------------onclick for delete doc

  const DeleteDoc = () => {
    // alert("Hey! Document is going to get deleted")
    // confirm("Hey! Do you want to delete this document?");

    if (confirm("Hey! Do you want to delete this document?") == true) {
      deleteDocument(id);
      // window.location.reload()
      handleEdit();
    } else {
      alert("Delete cancelled!");
      // console.log("Document not deleted")
    }
  };

  //-------------------------------------------------------- Setting up new values for the current document.
  const getCurrentDocument = () => {
    getCurrentDoc(id, setCurrentDocument);
  };
  //------------------------------------------------------
  useEffect(() => {
    const debounced = setTimeout(() => {
      editDocument();
    }, 1000);
    return () => clearTimeout(debounced);
  }, [value, title]);

  // Update your existing useEffect hook
  useEffect(() => {
    getCurrentDocument();
    quillRef.current.focus();
    // Additional dependencies if needed
  }, [isTextToSpeechActive]);

  function saveTodoc() {
    const content = value;

    var opt = {
      margin: 1,
      filename: title+"_doc",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, backgroundColor: "#ffffff" },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pdfOptions: { textColor: "#000000" },
    };
  

    html2pdf().from(content).set(opt).save();

    // Old monolithic-style usage:
    html2pdf(content, opt);
  }
  // function saveTodoc() {
  //   const content = "Title" + title + "\n" + value + "\n";

  //   const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  //   saveAs(blob, "testfile1.txt");
  // }

  // Commented code
  // function Export2Word(element: string, filename: string = ''): void {
  //   const preHtml: string = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  //   const postHtml: string = "</body></html>";
  //   const html: string = preHtml + document.getElementById(element).innerHTML + postHtml;
  //   // const html: string =  document.getElementById(element).innerHTML

  //   const blob: Blob = new Blob(['\ufeff', html], {
  //     type: 'application/msword'
  //   });
  //   // Specify link url
  //   const url: string = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
  //   // Specify file name
  //   filename = filename ? filename + '.doc' : 'document.doc';
  //   // Create download link element
  //   const downloadLink: HTMLAnchorElement = document.createElement("a");
  //   document.body.appendChild(downloadLink);

  //   // (window.navigator as any).msSaveOrOpenBlob(blob, filename);

  //   const nav = (window.navigator as any);
  //   if (nav.msSaveOrOpenBlob) {
  //     nav.msSaveOrOpenBlob(blob, filename);
  //   }else {
  //     // Create a link to the file
  //     downloadLink.href = url;
  //     // Setting the file name
  //     downloadLink.download = filename;
  //     //triggering the function
  //     downloadLink.click();
  //   }
  //   document.body.removeChild(downloadLink);
  //   // (window.navigator as any).msSaveOrOpenBlob(blob, filename);

  // }

  // (function() {
  //   var mousePos:any;

  //   document.onmousemove = handleMouseMove;
  //   setInterval(getMousePosition, 100); // setInterval repeats every X ms

  //   function handleMouseMove(event:any) {
  //       var dot, eventDoc, doc, body, pageX, pageY;

  //       event = event || window.event; // IE-ism

  //       // If pageX/Y aren't available and clientX/Y are,
  //       // calculate pageX/Y - logic taken from jQuery.
  //       // (This is to support old IE)
  //       if (event.pageX == null && event.clientX != null) {
  //           eventDoc = (event.target && event.target.ownerDocument) || document;
  //           doc = eventDoc.documentElement;
  //           body = eventDoc.body;

  //           event.pageX = event.clientX +
  //             (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
  //             (doc && doc.clientLeft || body && body.clientLeft || 0);
  //           event.pageY = event.clientY +
  //             (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
  //             (doc && doc.clientTop  || body && body.clientTop  || 0 );
  //       }

  //       mousePos = {
  //           x: event.pageX,
  //           y: event.pageY
  //       };
  //   }
  //   function getMousePosition() {
  //       var pos = mousePos;
  //       if (!pos) {
  //           // We haven't seen any movement yet
  //       }
  //       else {
  //           // Use pos.x and pos.y
  //       }
  //   }
  // })();

  useEffect(() => {
    setTitle(()=>{
     
      return currentDocument.title
    });
    setValue(currentDocument.value);
  }, [currentDocument]);

  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket == null) return;

    const handler = () => {
      console.log("receive-changes");
      getCurrentDocument();
      // quillRef.current.focus()
    };

    socket.on("receive-changes", handler);
    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket]);

  useEffect(() => {
    if (socket == null) return;

    const handler = (delta: any, oldDelta: any, source: any) => {
      if (source !== "user") return;
      console.log("Hello");
      socket.emit("send-changes", delta);
    };
  }, [socket, value]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="edit-container">
        <FaArrowLeft onClick={handleEdit} size={30} className="back-react-icon" />

        <input
          onChange={(event) => {
            setTitle(event?.target.value);
          }}
          value={title}
          className="title-input"
          placeholder="Untitled"
        />
        <div className="title-buttons">
          <button onClick={saveTodoc}>Download Doc</button>
          {/* <button onClick={Export2Word('exportContent','word-content.docx')}>Export as .doc</button>  */}

          <button onClick={DeleteDoc}>Delete Doc</button>
        </div>
        <div className="quill-container">
          <EditorToolbar />
          <button onClick={toggleTextToSpeech}>
            {isTextToSpeechActive
              ? "Stop Text-to-Speech"
              : "Start Text-to-Speech"}
          </button>
          <ReactQuill
            className="react-quill"
            theme="snow"
            onBlur={() => {
              setTimeout(() => {
                socket?.emit("send-changes");
              }, 1000);
            }}
            ref={quillRef}
            value={value}
            onChange={Changehandler}
            modules={modules}
            formats={formats}
            id="exportContent"
          />
        </div>
      </div>
    </div>
  );
}
