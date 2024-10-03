const {
  pornhubSearch,
  pornhubDl,
  searchHentai,
  xvideosdl,
  xvideosSearch, 
  doodstreamSearch,
  doodstreamInfo, 
  doodstreamFolders,
  doodstreamFiles
} = require("./scrape/nsfw");
/*
Hasil gabut ama tmn :v
*/
module.exports = async (req, res) => {
  try {
    switch (req.path) {
      case "/pornhubsearch":{
          const query = req.query.query
          if (!query) return res.json({ message: "Masukkan query" });
          const result = await pornhubSearch(query);
          res.json({ status: 200, result });
        }
        break;

      case "/pornhubdl":{
          const query = req.query.link
          if (!query) return res.json({ message: "Masukkan link" });
          const result = await pornhubDl(query);
          res.json({ status: 200, result });
        }
        break;

      case "/hentaisearch":{
          const query = req.query.query
          if (!query) return res.json({ message: "Masukkan query" });
          const result = await searchHentai(query);
          res.json({ status: 200, result });
        }
        break;

      case "/xvideossearch":{
          const query = req.query.query
          if (!query) return res.json({ message: "Masukkan query" });
          const result = await xvideosSearch(query);
          res.json({ status: 200, result });
        }
        break;

      case "/xvideosdl":{
          const query = req.query.link
          if (!query) return res.json({ message: "Masukkan link" });
          const result = await xvideosdl(query);
          res.json({ status: 200, result });
        }
        break;
        
      case "/":{
          res.status(200).json({ status: 200, message: "Ai lopiu😂"});
        }
        break;

      default: {
       res.json({ status: 404, message: "Not Found" });
      }
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: 500, message: "Terjadi kesalahan pada server" });
  }
};