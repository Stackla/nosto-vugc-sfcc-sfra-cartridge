var CatalogMgr = require('dw/catalog/CatalogMgr');
var File = require('dw/io/File');
var FileWriter = require('dw/io/FileWriter');
var ProductMgr = require('dw/catalog/ProductMgr');
var Status = require('dw/system/Status');
var URLUtils = require('dw/web/URLUtils');
var XMLIndentingStreamWriter = require('dw/io/XMLIndentingStreamWriter');

var FileHelper = require('~/cartridge/scripts/file/FileHelper');
var StepUtil = require('~/cartridge/scripts/util/StepUtil');

var STATUS = {
    FILE_EXIST: 'FILE_ALREADY_EXISTS',
    NO_DATA: 'NO_DATA_TO_EXPORT'
};

/**
 * Get products for the product feed
 *
 * @param {string} productsList Product IDs. All product variations from the site catalog will be returned if no pids are specified.
 *
 * @returns {Array} Products
 *
 */
function getProducts(productsList) {
    var products = [];

    if (!empty(productsList)) {
        products = productsList.split(',').map(function (productID) {
            return ProductMgr.getProduct(productID);
        });
    } else {
        var productsIter = ProductMgr.queryAllSiteProductsSorted();
        while (productsIter.hasNext()) {
            var prodObj = productsIter.next();
            products.push(prodObj);
        }
    }

    products = products.filter(function (productObj) {
        return !empty(productObj) && !productObj.isMaster() && !productObj.isProductSet() && !productObj.isVariationGroup();
    });

    return products;
}

/**
 * Build Stackla product feed
 *
 * @param {string} targetFolder Target folder
 * @param {string} filename File name
 * @param {string} productsList Product IDs (optional)
 *
 * @returns {Status} Status
 */
function writeToFile(targetFolder, filename, productsList) {
    var file = new File(targetFolder + File.SEPARATOR + filename + '.xml');
    var products = getProducts(productsList);

    if (products.length) {
        var fileWriter = new FileWriter(file, 'UTF-8');
        var xsw = new XMLIndentingStreamWriter(fileWriter);

        xsw.writeStartDocument('UTF-8', '1.0');
        xsw.writeStartElement('rss');
        xsw.writeStartElement('channel');

        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            var imageUrl = 'n/a';

            if (!empty(product.getImages('large'))) {
                imageUrl = product.getImages('large').get(0).absURL.toString();
            } else if (!empty(product.getImages('medium'))) {
                imageUrl = product.getImages('medium').get(0).absURL.toString();
            } else if (!empty(product.getImages('small'))) {
                imageUrl = product.getImages('small').get(0).absURL.toString();
            }

            xsw.writeStartElement('item');

            xsw.writeStartElement('id');
            xsw.writeCharacters(product.ID.substring(0, 50));
            xsw.writeEndElement();

            xsw.writeStartElement('title');
            xsw.writeCharacters(product.name.substring(0, 150));
            xsw.writeEndElement();

            xsw.writeStartElement('description');
            xsw.writeCharacters((product.shortDescription || product.longDescription || product.pageDescription || 'n/a').toString().substring(0, 1024));
            xsw.writeEndElement();

            xsw.writeStartElement('link');
            xsw.writeCharacters(URLUtils.abs('Product-Show', 'pid', product.ID).toString().substring(0, 250));
            xsw.writeEndElement();

            xsw.writeStartElement('image_link');
            xsw.writeCharacters(imageUrl ? imageUrl.substring(0, 250) : 'n/a');
            xsw.writeEndElement();

            xsw.writeStartElement('availability');
            xsw.writeCharacters(product.getAvailabilityModel().isInStock() ? 'in stock' : 'out of stock');
            xsw.writeEndElement();

            xsw.writeStartElement('price');
            xsw.writeCharacters(product.getPriceModel().price.decimalValue > 0 ? product.getPriceModel().price.decimalValue : '0.00');
            xsw.writeEndElement();

            xsw.writeEndElement();
        }

        xsw.writeEndElement();
        xsw.writeEndElement();
        xsw.writeEndDocument();

        xsw.close();
        fileWriter.close();
    } else {
        return new Status(Status.OK, STATUS.NO_DATA, 'There are no products to export.');
    }

    return new Status(Status.OK, 'OK', 'Write to file successful.');
}

/**
 * Stackla Product Feed Export
 *
 * @returns {Status} Status
 */
exports.Run = function () {
    var args = arguments[0];
    var catalogPath = CatalogMgr.getSiteCatalog().ID;
    var targetFolder = StepUtil.replacePathPlaceholders(File.CATALOGS + File.SEPARATOR + catalogPath + File.SEPARATOR + args.TargetFolder);
    var filename = StepUtil.replacePathPlaceholders(args.Filename);

    // OverwriteExportFile option
    var OverwriteExportFile = args.OverwriteExportFile;
    if (OverwriteExportFile !== true && FileHelper.isFileExists(targetFolder, filename)) {
        return new Status(Status.OK, STATUS.FILE_EXIST, 'The file already exists and the OverwriteExportFile is not set to active. Abort...');
    }

    // Create target directory
    FileHelper.createDirectory(targetFolder);

    // Create product feed xml file
    try {
        writeToFile(targetFolder, filename, args.Products);
    } catch (e) {
        return new Status(Status.ERROR, 'ERROR', e);
    }

    return new Status(Status.OK, 'OK', 'Export successful.');
};
