import express from "express";
import Links from "../models/Links";
import {LinkWithoutId} from "../types";

const linkRouter = express.Router();

const generateShortUrl = () => {
    const englishAlphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    const length = 6 + Math.floor(Math.random() * 2);
    for (let i = 0; i < length; i++) {
        result += englishAlphabet[Math.floor(Math.random() * englishAlphabet.length)];
    }
    return result;
}

linkRouter.get('/:shortUrl', async (req, res, next) => {

    try {
      const shortUrl = req.params.shortUrl
        const link = await Links.findOne({ shortUrl });
        if (!link) {
            res.sendStatus(404)
            return;
        }
        res.status(301).redirect(link.url)
    } catch (e) {
        next(e);
    }
});
linkRouter.post('/', async (req, res, next) => {

    try {
        if (!req.body.url) {
            res.status(404).send('Url is missing');
            return;
        }

        const generatedShortUrl = generateShortUrl();

        const newLink: LinkWithoutId = {
            url: req.body.url,
            shortUrl: generatedShortUrl,
            shortCodeUrl: `https://localhost:8000/${generatedShortUrl}`
        }

        const link = new Links(newLink);
        await link.save();
        res.send(link)

    } catch (e) {
        next(e);
    }


});


export default linkRouter;