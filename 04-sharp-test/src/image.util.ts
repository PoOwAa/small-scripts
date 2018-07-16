import * as sharp from 'sharp';

export class ImageFileProperties {
    constructor(public readonly slug, public readonly x, public readonly y) { }
}

export class ImageUploader {
    constructor() {}

    /**
     *
     *
     * @param {Buffer} img
     * @param {string} destination
     * @returns
     * @memberof SharpUtil
     */
    public async saveFile(img: Buffer, destination: string) {
        return await sharp(img).toFile(destination);
    }

    /**
     *
     *
     * @param {Buffer} image
     * @param {ImageFileProperties} size
     * @param {string} destDirPath
     * @param {string} name
     * @returns
     * @memberof SharpUtil
     */
    public async resizeImage(image: Buffer, size: ImageFileProperties, destDirPath: string, name: string) {
        return await sharp(image)
            // Végső kép méret
            .resize(size.x, size.y)
            // A teljes képet használja fel
            .max()
            // Húzza szét ha szükséges
            .ignoreAspectRatio()
            .jpeg({
                quality: 80,
            })
            .toBuffer();
    }
}