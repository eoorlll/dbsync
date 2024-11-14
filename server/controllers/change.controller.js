import fs from 'node:fs';
import { errorHandler } from "./../utils/error.js";

export const change = (req, res, next) => {
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