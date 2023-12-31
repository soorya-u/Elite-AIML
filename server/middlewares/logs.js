const { logs } = require("../models/logs");

async function handleLogs(req, res, next) {
  const osRegex = /(Windows|Macintosh|iPhone|iPad|Android|Linux)\b/i;
  const browserRegex = /(Chrome|Firefox|Safari|Edge|MSIE|Trident)\b/i;

  const userAgent = req.headers["user-agent"];

  const osMatch = userAgent.match(osRegex);
  const browserMatch = userAgent.match(browserRegex);

  let platform;

  try {
    platform = req.headers["sec-ch-ua-platform"].slice(1, -1);
  } catch (e) {
    platform = "Unknown Platform";
  }

  const logData = {
    origin: req.headers.origin,
    path: req.path,
    method: req.method,
    os: osMatch ? osMatch[0] : "Unknown OS",
    browser: browserMatch ? browserMatch[0] : "Unknown Browser",
    platform: platform,
  };
  await logs.create(logData);

  next();
}

module.exports = { handleLogs };
