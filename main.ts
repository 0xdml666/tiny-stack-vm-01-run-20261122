import{readFileSync,readdirSync,mkdirSync,writeFileSync}from"node:fs";
const T=new Uint8Array(84);
for(const[i,v]of[[1,17],[2,65],[3,4],[4,6],[5,10],[6,11],[7,15],[16,9],[17,9],[18,9],[19,9],[20,9],[21,9],[22,9],[23,5],[24,9],[25,9],[26,9],[27,5],[28,9],[29,9],[30,9],[32,9],[33,9],[34,9],[48,32],[49,36],[50,36],[51,32],[64,5],[65,8],[80,4],[81,4],[82,1],[83,4]])T[i]=v;
function run(P:Uint8Array,I:Uint8Array):{o:Uint8Array,e:number}{
 const s=new Int32Array(256),c=new Int32Array(64),m=new Int32Array(256),o=new Uint8Array(65536);
 let sp=0,cp=0,ol=0,ip=0,pc=0,st=0;
 const fin=(e:number)=>({o:o.slice(0,ol),e});
 for(;;){
  if(st===1e6)return fin(10);
  if(pc<0||pc>=P.length)return fin(9);
  const b=P[pc],k=T[b];
  if(b&&b!==52&&!k)return fin(5);
  const im=k>>4;
  if(pc+im>=P.length)return fin(9);
  st++;
  const pp=(k>>2)&3,pu=k&3;
  if(sp<pp)return fin(2);
  if(sp-pp+pu>256)return fin(3);
  const nx=pc+1+im;pc=nx;
  switch(b){
   case 0:return fin(0);
   case 1:s[sp++]=(P[nx-1]<<24)>>24;break;
   case 2:s[sp++]=P[nx-4]|P[nx-3]<<8|P[nx-2]<<16|P[nx-1]<<24;break;
   case 3:sp--;break;
   case 4:s[sp]=s[sp-1];sp++;break;
   case 5:{const t=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=t;break;}
   case 6:s[sp]=s[sp-2];sp++;break;
   case 7:{const a=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=a;break;}
   case 23:s[sp-1]=(-s[sp-1])|0;break;
   case 27:s[sp-1]=~s[sp-1];break;
   case 48:case 49:case 50:{
    const r=((P[nx-2]|P[nx-1]<<8)<<16)>>16;
    let t=b===48;
    if(b!==48){const v=s[--sp];t=b===49?v===0:v!==0;}
    if(t)pc=nx+r;
    break;}
   case 51:
    if(cp===64)return fin(7);
    c[cp++]=nx;pc=P[nx-2]|P[nx-1]<<8;break;
   case 52:
    if(!cp)return fin(8);
    pc=c[--cp];break;
   case 64:{
    const a=s[sp-1];
    if(a<0||a>255)return fin(6);
    s[sp-1]=m[a];break;}
   case 65:{
    const a=s[sp-1],v=s[sp-2];
    if(a<0||a>255)return fin(6);
    sp-=2;m[a]=v;break;}
   case 80:{
    const t=String(s[sp-1]);
    if(ol+t.length>65536)return fin(11);
    sp--;
    for(let i=0;i<t.length;i++)o[ol++]=t.charCodeAt(i);
    break;}
   case 81:
    if(ol+1>65536)return fin(11);
    o[ol++]=s[--sp]&255;break;
   case 82:s[sp++]=ip<I.length?I[ip++]:-1;break;
   case 83:return fin(s[--sp]&255);
   default:{
    const y=s[sp-1],x=s[sp-2];
    if(y===0&&(b===19||b===20||b===21||b===22))return fin(4);
    let r:number;
    if(b===16)r=(x+y)|0;
    else if(b===17)r=(x-y)|0;
    else if(b===18)r=Math.imul(x,y);
    else if(b===19)r=x===-2147483648&&y===-1?x:(x/y)|0;
    else if(b===20)r=y===-1?0:(x%y)|0;
    else if(b===21)r=Math.floor((x>>>0)/(y>>>0))|0;
    else if(b===22)r=((x>>>0)%(y>>>0))|0;
    else if(b===24)r=x&y;
    else if(b===25)r=x|y;
    else if(b===26)r=x^y;
    else if(b===28)r=x<<(y&31);
    else if(b===29)r=x>>(y&31);
    else if(b===30)r=(x>>>(y&31))|0;
    else if(b===32)r=x===y?1:0;
    else if(b===33)r=x<y?1:0;
    else r=(x>>>0)<(y>>>0)?1:0;
    sp-=2;s[sp++]=r;}
  }
 }
}
const D=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
const W=(id:string,o:Uint8Array,e:number)=>{mkdirSync(O+"/"+id,{recursive:true});writeFileSync(O+"/"+id+"/stdout.bin",o);writeFileSync(O+"/"+id+"/exit.txt",e+"\n");};
for(const id of readdirSync(D).sort()){
 try{
  const r=run(new Uint8Array(readFileSync(D+"/"+id+"/program.bin")),new Uint8Array(readFileSync(D+"/"+id+"/input.bin")));
  W(id,r.o,r.e);
 }catch{
  try{W(id,new Uint8Array(0),1);}catch{}
 }
}
