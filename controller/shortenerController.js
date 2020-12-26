const validator = require('validator');
const UrlModel = require('../models/urlmodel');


const AddUrl = async(req, res) => {

    const urlData = req.body;
    console.log(urlData.url);
    console.log(typeof urlData);

    // check url is provided or not
    if (!urlData.url) return res.status(400).json({
        message: 'url not provided'
    });

    // check url is valid 
    if (!validator.isURL(urlData.url, {
            require_protocol: true
        })) return res.status(400).json({
        message: 'invalid url'
    });

    try {

        let newURL = new UrlModel({
            url: urlData.url,
            shortid: urlData.shortid
        });
        await newURL.save();
        return res.status(201).json({
            shortid: newURL.shortid,
            newURL
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'fail'
        })

    }

}


const RedirectUrl = async(req, res) => {

    const shortId = req.params.shortid;

    if (!shortId) return res.status(400).json({
        message: 'id not provided'
    });

    try {
        const URL = await UrlModel.findOne({ shortid: shortId });
        if (!URL) return res.status(400).json({
            message: 'invalid url id'
        })
        return res.redirect(URL.url);
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'fail'
        })
    }



}

module.exports = { AddUrl, RedirectUrl }