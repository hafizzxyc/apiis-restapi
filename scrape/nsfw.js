const axios = require('axios');
const cheerio = require('cheerio');

async function pornhubSearch(query) {
const response = await axios.get(`https://www.pornhub.com/video/search?search=${query}`)
const $ = cheerio.load(response.data)
const videos = []

$('li.videoBox').each((index, element) => {
const video = {}
video.title = $(element).find('img').attr("alt");
video.duration = $(element).find('.duration').text()
video.views = $(element).find('.views').text()
video.rating = $(element).find('.value').text()
const link = "https://www.pornhub.com" + $(element).find('.title > a').attr('href')
video.thumbnail = $(element).find('img').attr('data-mediabook')
if (!link.includes('javascript:void(0)')) {
video.link = link
videos.push(video)
}
});

return videos;
}

async function pornhubDl(url) {
try {
const response = await axios.get(url);
const html = response.data;
const getSubstring = (startPattern, endPattern) => {
const startIndex = html.search(startPattern);
return html.substring(startIndex, html.indexOf(endPattern, startIndex));
};
const metaPayload = getSubstring(/var flashvars_\d{1,} = /, ';\n');
const res = JSON.parse(metaPayload.substring(metaPayload.indexOf('{')))
const video = res.mediaDefinitions.map(media => ({
format: media.format,
quality: media.quality,
vidurl: media.videoUrl
}));
return video
} catch (error) {
console.error('Error fetching or parsing data:', error);
return null;
}
}

async function searchHentai(search) {
return new Promise((resolve, reject) => {
axios.get("https://hentai.tv/?s=" + search).then(async ({ data }) => {
let $ = cheerio.load(data)
let result = {}
let res = []
result.coder = 'rem-comp'
result.result = res
result.warning = "It is strictly forbidden to reupload this code, copyright © 2022 by rem-comp"

$('div.flex > div.crsl-slde').each(function (a, b) {
let _thumbnail = $(b).find('img').attr('src')
let _title = $(b).find('a').text().trim()
let _views = $(b).find('p').text().trim()
let _url = $(b).find('a').attr('href')
let hasil = { thumbnail: _thumbnail, title: _title, views: _views, url: _url }
res.push(hasil)
})
resolve(result)
}).catch(err => {
console.log(err)
})
})
}

async function xvideosdl(url) {
return new Promise((resolve, reject) => {
fetch(`${url}`, { method: 'get' })
.then(res => res.text())
.then(res => {
let $ = cheerio.load(res, { xmlMode: false });
const title = $("meta[property='og:title']").attr("content")
const keyword = $("meta[name='keywords']").attr("content")
const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views"
const vote = $("div.rate-infos > span.rating-total-txt").text()
const likes = $("span.rating-good-nbr").text()
const dislikes = $("span.rating-bad-nbr").text()
const thumb = $("meta[property='og:image']").attr("content")
const url = $("#html5video > #html5video_base > div > a").attr("href")
resolve({ title, url, keyword, views, vote, likes, dislikes, thumb })
})
})
}

async function xvideosSearch(url) {
return new Promise(async (resolve) => {
await axios.request(`https://www.xvideos.com/?k=${url}&p=${Math.floor(Math.random() * 9) + 1}`, { method: "get" }).then(async result => {
let $ = cheerio.load(result.data, { xmlMod3: false });
let title = [];
let duration = [];
let quality = [];
let url = [];
let thumb = [];
let hasil = [];

$("div.mozaique > div > div.thumb-under > p.title").each(function (a, b) {
title.push($(this).find("a").attr("title"));
duration.push($(this).find("span.duration").text());
url.push("https://www.xvideos.com" + $(this).find("a").attr("href"));
});
$("div.mozaique > div > div.thumb-under").each(function (a, b) {
quality.push($(this).find("span.video-hd-mark").text());
});
$("div.mozaique > div > div > div.thumb > a").each(function (a, b) {
thumb.push($(this).find("img").attr("data-src"));
});
for (let i = 0; i < title.length; i++) {
hasil.push({
title: title[i],
duration: duration[i],
quality: quality[i],
thumb: thumb[i],
url: url[i]
});
}
resolve(hasil);
});
});
};

async function xvideosdl(url) {
try {
const { data } = await axios.get(url);

    const $ = cheerio.load(data, { xmlMode: false });

    const title = $("meta[property='og:title']").attr("content");
    const keyword = $("meta[name='keywords']").attr("content");
    const views = $("div#video-tabs > div > div > div > div > strong.mobile-hide").text() + " views";
    const vote = $("div.rate-infos > span.rating-total-txt").text();
    const likes = $("span.rating-good-nbr").text();
    const dislikes = $("span.rating-bad-nbr").text();
    const thumb = $("meta[property='og:image']").attr("content");
    const videoUrl = $("#html5video > #html5video_base > div > a").attr("href");

    return { title, url: videoUrl, keyword, views, vote, likes, dislikes, thumb };
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}


async function xvideosSearch(url) {
return new Promise(async (resolve) => {
await axios.request(`https://www.xvideos.com/?k=${url}&p=${Math.floor(Math.random() * 9) + 1}`, { method: "get" }).then(async result => {
let $ = cheerio.load(result.data, { xmlMod3: false });
let title = [];
let duration = [];
let quality = [];
let url = [];
let thumb = [];
let hasil = [];

$("div.mozaique > div > div.thumb-under > p.title").each(function (a, b) {
title.push($(this).find("a").attr("title"));
duration.push($(this).find("span.duration").text());
url.push("https://www.xvideos.com" + $(this).find("a").attr("href"));
});
$("div.mozaique > div > div.thumb-under").each(function (a, b) {
quality.push($(this).find("span.video-hd-mark").text());
});
$("div.mozaique > div > div > div.thumb > a").each(function (a, b) {
thumb.push($(this).find("img").attr("data-src"));
});
for (let i = 0; i < title.length; i++) {
hasil.push({
title: title[i],
duration: duration[i],
quality: quality[i],
thumb: thumb[i],
url: url[i]
});
}
resolve(hasil);
});
});
};

async function doodstreamSearch(query) {
  let res = await fetch(`https://doodapi.com/api/search/videos?key=13527p8pcv54of4yjeryk&search_term=${query}`)
  let result = await res.json()
  return result
}

async function doodstreamInfo(query) {
  let res = await fetch(`https://doodapi.com/api/file/info?key=13527p8pcv54of4yjeryk&file_code=${query}`)
  let result = await res.json()
  return result
}

async function doodstreamFolders(query) {
  let res = await fetch(`https://doodapi.com/api/folder/list?key=13527p8pcv54of4yjeryk&code=${query}`)
  let result = await res.json()
  return result
}

async function doodstreamFiles(query) {
  let res = await fetch(`https://doodapi.com/api/file/list?key=13527p8pcv54of4yjeryk&fld_id=${query}`)
  let result = await res.json()
  return result
}

module.exports = { pornhubSearch, pornhubDl, searchHentai, xvideosSearch, xvideosdl, doodstreamSearch, doodstreamInfo, doodstreamFolders, doodstreamFiles }