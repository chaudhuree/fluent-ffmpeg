/**
 * This library abstracts the complex command-line usage of ffmpeg into a fluent, easy to use node.js module. In order to be able to use this module, make sure you have ffmpeg installed on your system (including all necessary encoding libraries like libmp3lame or libx264).
 * https://www.ffmpeg.org/
 */
(function () {
    var ffmpeg = require('fluent-ffmpeg');

    var args = process.argv.slice(2);

    function baseName(str) {
        var base = new String(str).substring(str.lastIndexOf('/') + 1);
        if (base.lastIndexOf(".") != -1) {
            base = base.substring(0, base.lastIndexOf("."));
        }

        return base;
    }

    args.forEach(function (val, index, array) {
        var filename = val;

        var basename = baseName(filename);

        // Convert to 1280x720 resolution
        ffmpeg(filename)
            .output(basename + "-1280x720.mp4")
            .videoCodec('libx264')
            .noAudio()
            .size('1280x720')
            .output(basename + "-1920x1080.mp4")
            .videoCodec('libx264')
            .noAudio()
            .size('1920x1080')
            .on('error', function (err) {
                console.error('Error:', err);
            })
            .on('progress', function (progress) {
                console.log('Converting to 1280x720... frames: ' + progress.frames);
            })
            .on('end', function () {
                console.log('Finished processing 1280x720');
            })
            .run();

        // Convert to 1920x1080 resolution
        // ffmpeg(filename)
        //     .output(basename + "-1920x1080.mp4")
        //     .videoCodec('libx264')
        //     .noAudio()
        //     .size('1920x1080')
        //     .on('error', function (err) {
        //         console.error('Error:', err);
        //     })
        //     .on('progress', function (progress) {
        //         console.log('Converting to 1920x1080... frames: ' + progress.frames);
        //     })
        //     .on('end', function () {
        //         console.log('Finished processing 1920x1080');
        //     })
        //     .run();
    });
})();
