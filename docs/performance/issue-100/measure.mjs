import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import zlib from 'node:zlib';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer-core';
import {launch} from 'chrome-launcher';

const [root, dest, label] = process.argv.slice(2);
fs.mkdirSync(dest, {recursive:true});
const server = http.createServer((req,res) => {
  let file = path.join(root,decodeURIComponent(new URL(req.url,'http://localhost').pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file=path.join(file,'index.html');
  if (!fs.existsSync(file)) {res.writeHead(404);res.end();return;}
  const type = {'.html':'text/html','.js':'application/javascript','.css':'text/css','.woff2':'font/woff2','.svg':'image/svg+xml','.json':'application/json'}[path.extname(file)];
  if(type) res.setHeader('Content-Type',type);
  const body=fs.readFileSync(file);
  if (/gzip/.test(req.headers['accept-encoding']||'')) {res.setHeader('Content-Encoding','gzip');res.end(zlib.gzipSync(body));}
  else res.end(body);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`;
let chrome;
try {
  chrome=await launch({chromePath:'/usr/bin/google-chrome',chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage']});
  const browser=await puppeteer.connect({browserURL:`http://localhost:${chrome.port}`});
  const results=[];
  for(const route of ['/', '/spoergsmaal/parforhold/', '/spil/']) {
    const name=route==='/'?'home':route.split('/').filter(Boolean).join('-');
    const html=fs.readFileSync(path.join(root,route,'index.html'),'utf8');
    const scripts=[...new Set([...html.matchAll(/<script\b[^>]*\bsrc="([^"?]+\.js)"[^>]*>/g)].map(m=>m[1]).filter(s=>s.startsWith('/_next/')))];
    const chunks=scripts.map(src=>({src,gzip:zlib.gzipSync(fs.readFileSync(path.join(root,src))).length}));
    const page=await browser.newPage();
    await page.setViewport({width:390,height:844,deviceScaleFactor:1,isMobile:true,hasTouch:true});
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    await page.goto(origin+route,{waitUntil:'networkidle0'});
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:path.join(dest,`${label}-${name}-390.png`),fullPage:true});
    await page.close();
    const runs=[];
    for(let i=0;i<3;i++) {
      const result=await lighthouse(origin+route,{port:chrome.port,onlyCategories:['performance'],logLevel:'error',output:'json',enableErrorReporting:false});
      const lhr=result.lhr;
      fs.writeFileSync(path.join(dest,`${label}-${name}-lh-${i+1}.json`),JSON.stringify(lhr));
      runs.push({lcp:lhr.audits['largest-contentful-paint'].numericValue,tbt:lhr.audits['total-blocking-time'].numericValue,score:lhr.categories.performance.score,settings:lhr.configSettings.throttling});
    }
    results.push({route,html:Buffer.byteLength(html),jsGzip:chunks.reduce((s,c)=>s+c.gzip,0),chunks,errors,runs});
    console.log(label,route,JSON.stringify(results.at(-1)));
  }
  fs.writeFileSync(path.join(dest,`${label}-metrics.json`),JSON.stringify(results,null,2));
  await browser.disconnect();
} finally {
  if(chrome) await chrome.kill();
  await new Promise(r=>server.close(r));
}
