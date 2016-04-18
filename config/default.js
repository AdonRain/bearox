var path = require('path');
const rootPath = path.dirname(__dirname);

module.exports = {
    controllers: path.join(rootPath, 'server/controllers'),
    statics: path.join(rootPath, 'webapp/build'),
    view: path.join(rootPath, 'webapp/view'),
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
};
