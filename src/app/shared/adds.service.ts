export class AddsService {
private addsImgPath = [
    'https://souqcms.s3-eu-west-1.amazonaws.com/cms/boxes/img/desktop/L_1580028741_Winterfestival-mweb-Home-en.jpg',
    'https://souqcms.s3-eu-west-1.amazonaws.com/cms/boxes/img/desktop/L_1580028904_Winterfestival-mweb-Supermarket-en.jpg',
    'https://souqcms.s3-eu-west-1.amazonaws.com/cms/boxes/img/desktop/L_1580028741_Winterfestival-mweb-fashion-en.jpg',
    'https://souqcms.s3-eu-west-1.amazonaws.com/cms/boxes/img/desktop/L_1580056373_MB-Xiaomi-Note8-en.jpg',
    'https://souqcms.s3-eu-west-1.amazonaws.com/cms/boxes/img/desktop/L_1580028904_Winterfestival-mweb-Home-en.jpg'
    ];

    getAddsImg() {
        return this.addsImgPath;
    }
}
