import { ImageFileProperties, ImageUploader } from './image.util';
import { MyHelper } from './helper';
import * as fs from 'fs';
import * as path from 'path';

export enum PrestaShopImageType {
  PRODUCT = 'p',
  CATEGORY = 'c',
  SHIPPING = 's',
}

export const PrestaShopImageEnum = {
    // Cart thumbnail image
    PS_CART: new ImageFileProperties('-cart_default', 80, 80),
    // HomePage image
    PS_HOME: new ImageFileProperties('-home_default', 250, 250),
    // Small image
    PS_SMALL: new ImageFileProperties('-small_default', 98, 98),
    // Medium image
    PS_MEDIUM: new ImageFileProperties('-medium_default', 125, 125),
    // Large image
    PS_LARGE: new ImageFileProperties('-large_default', 458, 458),
    // Category image
    PS_CATEGORY: new ImageFileProperties('-category_default', 800, 210),
    // Thickbox image
    PS_THICKBOX: new ImageFileProperties('-thickbox_default', 800, 80),
};

export class PrestaShopImageUploader {
    protected defaultOptions = {
        savePath: 'assets/img',
        appDir: '/home/raymund/Work/small-scripts/04-sharp-test',
    };

    protected productImageTypes = [PrestaShopImageEnum.PS_CART, PrestaShopImageEnum.PS_HOME, PrestaShopImageEnum.PS_SMALL, PrestaShopImageEnum.PS_MEDIUM, PrestaShopImageEnum.PS_LARGE];
    protected categoryImageTypes = [PrestaShopImageEnum.PS_CATEGORY];

    public readonly options;

    protected readonly imageUploader: ImageUploader;

    constructor() {
        this.imageUploader = new ImageUploader();
        this.options = this.defaultOptions;
    }

    public async uploadImage(img: string | Buffer, imageType: PrestaShopImageType) {
        // If path given, load the image into buffer
        if (typeof img === 'string') {
            if (fs.existsSync(img)) {
                img = fs.readFileSync(img);
            } else {
                throw new Error('Bad argument: [img]');
            }
        }

        const imageId = this.createImageId(img);
        const imagePath = this.createPath(imageType, imageId);

        if (imagePath.length > 0) {
            switch (imageType) {
                case PrestaShopImageType.CATEGORY: {
                    for (const imageProperty of this.categoryImageTypes) {
                        const imageName = this.generateImageName(imageProperty, imageId);
                        const resizedImage = await this.imageUploader.resizeImage(img, imageProperty, imagePath, imageName);
                        await this.imageUploader.saveFile(resizedImage, path.join(imagePath, imageName));
                    }
                    return await this.imageUploader.saveFile(img, path.join(imagePath, `${imageId}.jpeg`));
                }
                case PrestaShopImageType.PRODUCT: {
                    for (const imageProperty of this.productImageTypes) {
                        const imageName = this.generateImageName(imageProperty, imageId);
                        const resizedImage = await this.imageUploader.resizeImage(img, imageProperty, imagePath, imageName);
                        await this.imageUploader.saveFile(resizedImage, path.join(imagePath, imageName));
                    }
                    return await this.imageUploader.saveFile(img, path.join(imagePath, `${imageId}.jpeg`));
                }
                case PrestaShopImageType.SHIPPING: {
                    break;
                }
                default: {
                    throw new Error(`imageType ${imageType} not implemented!`);
                }
            }
        }
    }

    /**
     * TODO: generate real ID
     *
     * @protected
     * @param {Buffer} img
     * @returns {number}
     * @memberof PrestaShopImageUploader
     */
    protected createImageId(img: Buffer): number {
        return 1234;
    }

    /**
     * Create PrestaShop like image name
     *
     * @protected
     * @param {ImageFileProperties} imageFile
     * @param {number} imageId
     * @returns {string}
     * @memberof PrestaShopImageUploader
     */
    protected generateImageName(imageFile: ImageFileProperties, imageId: number): string {
        return `${imageId}${imageFile.slug}.jpeg`;
    }

    /**
     * Create PrestaShop like directory structure
     *
     * @protected
     * @param {PrestaShopImageType} imageType
     * @param {number} imageId
     * @returns {string}
     * @memberof PrestaShopImageUploader
     */
    protected createPath(imageType: PrestaShopImageType, imageId: number): string {
        switch (imageType) {
          case PrestaShopImageType.CATEGORY: {
            const categoryPath = path.join(this.options.appDir, this.options.savePath, PrestaShopImageType.CATEGORY);
            if (!fs.existsSync(categoryPath)) {
              MyHelper.mkDirByPathSync(categoryPath);
            }
            return categoryPath;
          }
          case PrestaShopImageType.PRODUCT: {
            const imageIdString = imageId + '';
            const imageDirs = imageIdString.split('');
            const productPath = path.join(this.options.appDir, this.options.savePath, PrestaShopImageType.PRODUCT, ...imageDirs);
            if (!fs.existsSync(productPath)) {
              MyHelper.mkDirByPathSync(productPath);
            }
            return productPath;
          }
          case PrestaShopImageType.SHIPPING: {
            break;
          }
          default: {
            throw new Error(`imageType ${imageType} not implemented!`);
          }
        }

        return '';
    }
}