const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync(__dirname+'/static/app.js','utf8');
const helper=source.slice(source.indexOf('function ignoreWeeklyExportElement('),source.indexOf('async function weeklyImageBlob('));
const ctx={};vm.createContext(ctx);vm.runInContext(helper,ctx);
function node(tag,parent){return {tagName:tag,parent,contains(other){for(let n=other;n;n=n.parent)if(n===this)return true;return false;},closest(selector){for(let n=this;n;n=n.parent)if(n.tagName.toLowerCase()===selector)return n;return null;}};}
const html=node('HTML'),head=node('HEAD',html),link=node('LINK',head),meta=node('META',head),body=node('BODY',html),copy=node('DIV',body),table=node('TABLE',copy),sidebar=node('ASIDE',body),style=node('STYLE',body);
for(const el of [html,head,link,meta,body,copy,table,style])assert.equal(ctx.ignoreWeeklyExportElement(el,copy),false,'Preserve '+el.tagName);
assert.equal(ctx.ignoreWeeklyExportElement(sidebar,copy),true);
assert(source.includes('ignoreElements:el=>ignoreWeeklyExportElement(el,copy)'));
console.log('Exportação semanal: estilos, ancestrais e conteúdo preservados; sidebar excluída.');
