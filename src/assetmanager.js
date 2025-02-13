class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = {};
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);

        for (let i = 0; i < this.downloadQueue.length; i++) {
            const path = this.downloadQueue[i];
            const extension = path.split('.').pop().toLowerCase();

            if (extension === "png" || extension === "jpg" || extension === "jpeg" || extension === "gif") {
                // For images, use the Image object
                const img = new Image();
                img.addEventListener("load", () => {
                    console.log("Loaded image " + img.src);
                    this.successCount++;
                    if (this.isDone()) callback();
                });
                img.addEventListener("error", () => {
                    console.log("Error loading image " + img.src);
                    this.errorCount++;
                    if (this.isDone()) callback();
                });
                img.src = path;
                this.cache[path] = img;
            } else if (extension === "mp3" || extension === "ogg" || extension === "wav") {
                // For audio files, use the Audio object
                const audio = new Audio(path);
                audio.addEventListener("canplaythrough", () => {
                    console.log("Loaded audio " + path);
                    this.successCount++;
                    if (this.isDone()) callback();
                });
                audio.addEventListener("error", () => {
                    console.log("Error loading audio " + path);
                    this.errorCount++;
                    if (this.isDone()) callback();
                });
                this.cache[path] = audio;
            } else {
                console.log("Unsupported asset type: " + path);
                this.errorCount++;
            }
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
};
