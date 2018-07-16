import * as path from 'path';
import { PrestaShopImageUploader, PrestaShopImageType } from './prestashop.client';

const appDir = path.join(__dirname, '..');
const prestaShopImageUploader = new PrestaShopImageUploader();

prestaShopImageUploader.uploadImage(path.join(appDir, 'assets', 'img', 'beach.jpeg'), PrestaShopImageType.PRODUCT).then( (data) => {
    console.log(data);
});
prestaShopImageUploader.uploadImage(path.join(appDir, 'assets', 'img', 'beach_2.jpeg'), PrestaShopImageType.CATEGORY).then((data) => {
    console.log(data);
});