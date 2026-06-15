import{useState}from'react'
  interface Link{id:string;orig:string;short:string;clicks:number;date:string}
  const uid=()=>Math.random().toString(36).slice(2,7)
  const D="lnk.dev"
  const DEF:Link[]=[
    {id:uid(),orig:"https://github.com/9bzero",short:D+"/github",clicks:142,date:"2025-06-01"},
    {id:uid(),orig:"https://github.com/9bzero/task-manager",short:D+"/taskapp",clicks:87,date:"2025-06-05"},
    {id:uid(),orig:"https://github.com/9bzero/algo-vis",short:D+"/algovis",clicks:56,date:"2025-06-10"},
  ]
  export default function App(){
    const[url,setUrl]=useState("")
    const[alias,setAlias]=useState("")
    const[links,setLinks]=useState<Link[]>(DEF)
    const[err,setErr]=useState("")
    const[copied,setCopied]=useState("")
    const shorten=()=>{
      if(!url.trim()){setErr("Enter a URL");return}
      try{new URL(url)}catch{setErr("Enter a valid URL (include https://)");return}
      const sh=alias.trim()?D+"/"+alias.trim():D+"/"+uid()
      if(links.some(l=>l.short===sh)){setErr("Alias taken");return}
      setLinks(l=>[{id:uid(),orig:url,short:sh,clicks:0,date:new Date().toISOString().slice(0,10)},...l])
      setUrl("");setAlias("");setErr("")
    }
    const copy=(id:string,sh:string)=>{navigator.clipboard.writeText("https://"+sh);setCopied(id);setTimeout(()=>setCopied(""),2000)}
    const total=links.reduce((s,l)=>s+l.clicks,0)
    return(
      <div style={{minHeight:"100vh",background:"#0f172a",fontFamily:"Inter,system-ui,sans-serif",color:"#e2e8f0",padding:"2rem"}}>
        <div style={{maxWidth:780,margin:"0 auto"}}>
          <h1 style={{fontWeight:800,fontSize:"1.75rem",textAlign:"center",marginBottom:"2rem",color:"#f8fafc"}}>🔗 URL Shortener</h1>
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:12,padding:"1.5rem",marginBottom:"1.5rem"}}>
            <div style={{display:"flex",gap:"0.75rem",marginBottom:"0.75rem"}}>
              <input value={url} onChange={e=>{setUrl(e.target.value);setErr("")}} placeholder="https://your-long-url.com/..." style={{flex:1,background:"#0f172a",border:"1px solid #334155",borderRadius:8,padding:"0.7rem 1rem",color:"#e2e8f0",outline:"none",fontSize:"0.9rem"}}/>
              <button onClick={shorten} style={{padding:"0.7rem 1.75rem",background:"#0ea5e9",color:"#fff",border:"none",borderRadius:8,cursor:"pointer",fontWeight:700}}>Shorten</button>
            </div>
            <div style={{display:"flex",gap:"0.75rem",alignItems:"center"}}>
              <span style={{color:"#475569",fontSize:"0.8rem",whiteSpace:"nowrap"}}>{D}/</span>
              <input value={alias} onChange={e=>setAlias(e.target.value)} placeholder="custom-alias (optional)" style={{flex:1,background:"#0f172a",border:"1px solid #334155",borderRadius:6,padding:"0.5rem 0.75rem",color:"#e2e8f0",outline:"none",fontSize:"0.85rem"}}/>
            </div>
            {err&&<div style={{color:"#f87171",fontSize:"0.8rem",marginTop:"0.5rem"}}>{"⚠ "+err}</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1rem",marginBottom:"1.5rem"}}>
            {[{label:"Links",val:links.length,c:"#38bdf8"},{label:"Clicks",val:total,c:"#22c55e"},{label:"Avg",val:links.length?Math.round(total/links.length):0,c:"#f59e0b"}].map(x=>(
              <div key={x.label} style={{background:"#111827",border:"1px solid #1e293b",borderRadius:10,padding:"1rem",textAlign:"center"}}>
                <div style={{fontSize:"1.5rem",fontWeight:800,color:x.c}}>{x.val}</div>
                <div style={{color:"#94a3b8",fontSize:"0.75rem"}}>{x.label}</div>
              </div>
            ))}
          </div>
          <div style={{background:"#111827",border:"1px solid #1e293b",borderRadius:12,overflow:"hidden"}}>
            {links.map(l=>(
              <div key={l.id} style={{padding:"1rem 1.25rem",borderBottom:"1px solid #0f172a",display:"flex",gap:"1rem",alignItems:"center"}}>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"#38bdf8",fontFamily:"monospace",fontWeight:600,fontSize:"0.9rem"}}>{l.short}</div>
                  <div style={{color:"#475569",fontSize:"0.75rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{l.orig}</div>
                </div>
                <div style={{color:"#22c55e",fontWeight:700,fontSize:"0.9rem",minWidth:40,textAlign:"center"}}>{l.clicks}</div>
                <div style={{color:"#475569",fontSize:"0.75rem",minWidth:80}}>{l.date}</div>
                <button onClick={()=>copy(l.id,l.short)} style={{padding:"0.3rem 0.75rem",background:copied===l.id?"#166534":"#1e293b",color:copied===l.id?"#86efac":"#94a3b8",border:"1px solid #334155",borderRadius:6,cursor:"pointer",fontSize:"0.75rem"}}>{copied===l.id?"✓":"Copy"}</button>
                <button onClick={()=>setLinks(ls=>ls.filter(x=>x.id!==l.id))} style={{background:"none",border:"none",color:"#475569",cursor:"pointer",fontSize:"1rem"}}>×</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }