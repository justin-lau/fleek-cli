"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOnProgress = void 0;
const uploadOnProgress = (progressBar) => {
    return ({ loadedSize, totalSize, }) => {
        if (loadedSize === 0) {
            progressBar.start(totalSize ?? loadedSize, loadedSize);
        }
        else if (loadedSize === totalSize) {
            progressBar.update(loadedSize);
            progressBar.stop();
        }
        else {
            progressBar.update(loadedSize);
        }
    };
};
exports.uploadOnProgress = uploadOnProgress;
//# sourceMappingURL=uploadOnProgress.js.map