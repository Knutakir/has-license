'use strict';

const fs = require('fs');
const ghRepoHasLicense = require('gh-repo-has-license');

module.exports = path => new Promise(resolve => {
    if (path.startsWith('https://github.com/') || path.startsWith('http://github.com/')) {
        if (path.startsWith('http://github.com/')) {
            // Force https connection
            // eslint-disable-next-line no-param-reassign
            path = `${path.substr(0, 4)}s${path.substr(4)}`;
        }

        // Check if the license file exists at the GitHub repository
        ghRepoHasLicense(path).then(result => {
            resolve(result);
        });
    } else {
        // Check if the license file exists with `fs.access()`
        fs.access(`${path}/license`, 'utf8', err => {
            if (err) {
                resolve(false);
            }

            resolve(true);
        });
    }
});
