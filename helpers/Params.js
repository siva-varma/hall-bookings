module.exports = {
    getParams: (req, matchedPath) => {
        let path = req.path;
        let queryString = req.queryString;
        let sMatchedPath = matchedPath.split('/');
        let sPath = path.split('/');
        let result = {};
        for (let i=0; i<sMatchedPath.length; i++) {
            if (sMatchedPath[i].startsWith('<') && sMatchedPath[i].endsWith('>')) {
                result[sMatchedPath[i].slice(1, -1)] = sPath[i];
            }
        }

        if(queryString) {
            let splittedString = queryString.split('&');
            for (const param of splittedString) {
                let splitted = param.split('=');
                if (splitted.length > 1) {
                    result[splitted[0]] = splitted[1];
                }
            }
        }
        
        return result;
    }
}