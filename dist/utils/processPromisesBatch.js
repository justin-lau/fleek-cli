"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processPromisesBatch = void 0;
const processPromisesBatch = async (items, fn, batchSize = 10) => {
    let results = [];
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize > items.length ? items.length : i + batchSize);
        const batchResults = await Promise.all(batch.map((item) => fn(item)));
        results = [...results, ...batchResults];
    }
    return results;
};
exports.processPromisesBatch = processPromisesBatch;
//# sourceMappingURL=processPromisesBatch.js.map