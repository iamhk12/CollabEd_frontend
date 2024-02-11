import "./index.scss"
import {getDocuments} from "../../API/Firestore"
import {useEffect,useState} from "react"
import LastSeen from "../../LastScene";


type OpenDocType={
  openDoc:(id:string,value:string,title:string)=>void;
  searchQuery : String;
  reloadCounter : any
}

export default function DocsList({openDoc, searchQuery, reloadCounter}:OpenDocType){

  const [docs,setDocs]=useState([{title:'',userName:"",value:"", id:""}])

  const getDocs=async()=>{

    await getDocuments(setDocs)
    console.log("getting docs::::")
  }

  useEffect(()=>{
    getDocs();
  },[reloadCounter])
  return(
    <div className="docs-main">
      {docs.filter((data)=>{
        if(searchQuery != ""){
          return data.title.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
      }).map((doc)=>{
        console.log(doc,":::doc")
        if(doc.title){
          return(
            <div className="doc-card" onClick={()=>openDoc(doc.id,doc.value,doc.title)}>
              <p className="doc-content" dangerouslySetInnerHTML={{__html:doc.value.substring(0,200)}}></p>
              <p className="doc-title">{doc.title}</p>
              {/* <LastSeen/> */}
            </div>
          )
        }else{
          return <></>
        }
      })}
    </div>
  )
}