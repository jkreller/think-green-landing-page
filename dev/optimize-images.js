const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const directory = 'public/images';

(async () => {
    const files = await imagemin(
        [`${directory}/*.{jpg,png}`],
        {
            destination: directory,
            plugins: [imageminWebp({
                quality: 100,
                lossless: true
            })]
        }
    );

    console.log(files);
})();