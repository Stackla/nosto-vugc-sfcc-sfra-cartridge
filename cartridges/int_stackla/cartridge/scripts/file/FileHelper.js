var File = require('dw/io/File');

/**
 * Check if a file with the given {filename} in the given {directoryPath} exists or not
 *
 * @param {string} directoryPath Directory path
 * @param {string} filename File name
 *
 * @returns {boolean} Boolean
 */
var isFileExists = function (directoryPath, filename) {
    var file = new File(directoryPath + File.SEPARATOR + filename);
    return file.exists();
};

/**
 * Create the given {directoryPath} recursively if it does not exists
 *
 * @param {string} directoryPath Directory path
 *
 * @returns {dw/io/File} The created directory instance
 */
var createDirectory = function (directoryPath) {
    var directory = new File(directoryPath);

    if (!directory.exists() && !directory.mkdirs()) {
        throw new Error('Cannot create the directory ' + directoryPath);
    }

    return directory;
};

module.exports.createDirectory = createDirectory;
module.exports.isFileExists = isFileExists;
