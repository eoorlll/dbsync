import fs from 'node:fs';
import { errorHandler } from "../utils/error.js";

export const getUpdated = (req, res, next) => {
    const fileName  = './data/MOCK_DATA.json';
    const sinceLastUpdate = req.query.time;

    if (
        !sinceLastUpdate ||
        sinceLastUpdate === ""
      ) {
        next(errorHandler(400, "Last update time is required"));
    }

    const lastUpdateTimestamp = Date.now() - sinceLastUpdate;

    let items;

    try {
        items = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    } catch (err) {
        next(errorHandler(500, 'Failed to read file contents'));
    }

    items = items.filter((item) => 
        Date.parse(item['modifiedDate']) >= lastUpdateTimestamp
    );

    res.json(items);
};

export const getAll = (req, res, next) => {
    const fileName  = './data/MOCK_DATA.json';
    let items;

    try {
        items = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    } catch (err) {
        next(errorHandler(500, 'Failed to read file contents'));
    }

    res.json(items);
};

export const changeRandom = (req, res, next) => {
    const fileName  = './data/MOCK_DATA.json';
    let items;

    try {
        items = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    } catch (err) {
        next(errorHandler(500, 'Failed to read file contents'));
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    items[randomIndex].modifiedDate = new Date().toISOString();

    fs.writeFile(fileName, JSON.stringify(items), function writeJSON(err) {
        if (err) next(errorHandler(500, err));
    });

    res.json({ message: "The data has been modified" });
};