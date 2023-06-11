var genFont = function generate(fontNameHash, fontName, res)
{
    var express = require('express');
    var router = express.Router();
    const { exec, execSync, spawn } = require('child_process');

    var ImageTracer = require('./public/javascript/imagetracer_v1.2.1');

    var fs = require('fs');
    var gracefulFs = require('graceful-fs')
    gracefulFs.gracefulify(fs)

    var svg2ttf = require('svg2ttf');

    var svgicons2svgfont = require('svgicons2svgfont');

    var shelljs = require('shelljs');

    var fontStream = new svgicons2svgfont({
        fontName: fontName
    })

    var PNG = require('pngjs').PNG;

    var dir_name = 'FONT/' + fontNameHash
    // var dir_name = +new Date()

    var img_dir = `./${dir_name}`
    if (!fs.existsSync(img_dir)){
        fs.mkdirSync(img_dir)
    }

    var svg_dir = img_dir + '/svg'
    if (!fs.existsSync(svg_dir)){
        fs.mkdirSync(svg_dir)
    }

    var svg_fonts_dir = img_dir + '/svg_fonts'
    if (!fs.existsSync(svg_fonts_dir)){
        fs.mkdirSync(svg_fonts_dir)
    }

    var ttf_dir = img_dir + '/ttf_fonts'
    if (!fs.existsSync(ttf_dir)){
        fs.mkdirSync(ttf_dir)
    }

    var files = fs.readdirSync(`./${dir_name}/img`);

    // var option = {    
    //         'ltres' : 1,
    //         'qtres' : 1,
    //         'strokewidth' : 0.5,
    //         'pathomit' : 8,
    //         'blurradius' : 0,
    //         'blurdelta' : 10 
    //     };
    var option = {
        // Tracing
        corsenabled : false,
        pathomit:0,
        ltres:0.5,
        qtres:0.5,
        rightangleenhance : true,
        
        // Color quantization
        colorsampling : 2,
        numberofcolors : 16,
        mincolorratio : 0,
        colorquantcycles : 3,
        
        // Layering method
        layering : 0,
        
        // SVG rendering
        strokewidth : 1,
        linefilter : false,
        scale : 1,
        roundcoords:2,
        viewbox : false,
        desc : false,
        lcpr : 0,
        qcpr : 0,
        
        // Blur
        blurradius : 100,
        blurdelta : 200,

        pal : [{r:0,g:0,b:0,a:255},{r:255,g:255,b:255,a:255}]
    }

    option.pal = [{r:0,g:0,b:0,a:255},{r:255,g:255,b:255,a:255}];
    // option.linefilter=true;

    var sources = [];
    var fileName = [];

    for(var i=0; i<files.length; i++) {
        fileName[i] = files[i].slice(0, files[i].indexOf('.'));
        sources[i] = '0x' + fileName[i];
        // 숫자, 영어
        // if (files[i].length === 14){
        //     console.log(files[i])
        //     sources[i] = '0x' + (files[i].substring(9, 10).charCodeAt(0).toString(16));
        //     fileName[i] = files[i].substring(9, 10);
        // }

    }
    console.log('svg 제작 시작');
      // png to svg
      for(var i=0; i<files.length; i++) {
            let j = i;

            var data = fs.readFileSync(__dirname+`/${dir_name}/img/`+fileName[j]+'.png');

            var png = PNG.sync.read(data);

            var myImageData = {width:png.width, height:png.height, data:png.data};
            // var options = {ltres:option.ltres, strokewidth:option.strokewidth, qtres:option.qtres, pathomit:option.pathomit, blurradius:option.blurradius, blurdelta:option.blurdelta};

            // options.pal = [{r:0,g:0,b:0,a:255},{r:255,g:255,b:255,a:255}];
            // options.linefilter=true;
            
            // var svgstring = ImageTracer.imagedataToSVG( myImageData, options);
            var svgstring = ImageTracer.imagedataToSVG( myImageData, option);

            fs.writeFileSync(`./${dir_name}/svg/` + fileName[j] + '.svg', svgstring);
    }
    var fssss = fs.createWriteStream( `./${dir_name}/svg_fonts/font_ss.svg`)
    fontStream.pipe(fssss)
    fssss.on('finish',function() {
        console.log('fontsvg to ttf 시작');
        var ttf = svg2ttf(fs.readFileSync( `./${dir_name}/svg_fonts/font_ss.svg`, 'utf8'), {});
        fs.writeFileSync(`./${dir_name}/ttf_fonts/${fontNameHash}.ttf`, new Buffer.from(ttf.buffer));
        console.log('ttf to woff 시작');
        shelljs.exec(`ttf2woff ./${dir_name}/ttf_fonts/${fontNameHash}.ttf ./${dir_name}/ttf_fonts/${fontNameHash}.woff`);
        console.log('ttf to woff 종료');
        res.end();
    })
    fssss.on('error',function(err) {
        console.log(err);
    });
    console.log('svg to fontsvg 시작');
    for (var i=0; i < sources.length; i++) {
        
        let glyph1 = fs.createReadStream(`./${dir_name}/svg/` + fileName[i] + '.svg');
        glyph1.metadata = {
            unicode: [String.fromCharCode((sources[i]).toString(10))],
            name: 'uni' + sources[i]
        };
        
        fontStream.write(glyph1);
    }
    fontStream.end();
}

// genFont('29e673c549e444e1c8b695ceda6b9cab2c2bb758', '에라토스테네스의', null);
module.exports = genFont;