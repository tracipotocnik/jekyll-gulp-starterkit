// Paths
//
// Jekyll wipes out all files on recreation.
// We don’t want to recreate all assets on every Jekyll build
// though. That’s why assets are served from a different
// folder on the development build. BrowserSync watches only
// the asset files.
var src               = 'app';
var build             = 'build';
var development       = build + '/development';
var production        = build + '/production';

// Assets
var srcAssets         = src + '/_assets';
var developmentAssets = build + '/assets';
var productionAssets  = build + '/production/assets';


module.exports = {

  // BrowserSync
  browsersync: {
    development: {
      server: {
        baseDir: [development, build, src]
      },
      port: 9999,
      // Watched files in the dev build. BS reloads
      // website on change.
      files: [
        developmentAssets + '/css/*.css',
        developmentAssets + '/js/*.js',
        developmentAssets + '/images/**',
        developmentAssets + '/fonts/*'
      ],
      notify: false
    },
    production: {
      server: {
        baseDir: [production]
      },
      port: 9998,
      notify: false
    }
  },

  // Watch source files
  watch: {
    jekyll: [
      '_config.yml',
      '_config.build.yml',
      'stopwords.txt',
      src + '/_data/**/*.{json,yml,csv}',
      src + '/_includes/**/*.{html,xml}',
      src + '/_layouts/*.html',
      src + '/_locales/*.yml',
      src + '/_plugins/*.rb',
      src + '/_posts/*.{markdown,md}',
      src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
      src + '/*'
    ],
    styles:  srcAssets + '/styles/**/*.scss',
    scripts: srcAssets + '/js/**/*.js',
    images:  srcAssets + '/images/**/*',
    sprites: srcAssets + '/images/**/*.png',
    svg:     srcAssets + '/images/**/*.svg',
  },

  // Delete all files from the dev build
  delete: {
    src: [developmentAssets]
  },

  // Jekyll
  jekyll: {
    development: {
      src:    src,
      dest:   development,
      config: '_config.yml',
      option: '--profile'
    },
    production: {
      src:    src,
      dest:   production,
      config: '_config.yml,_config.build.yml'
    }
  },

  // CSS
  styles: {
    src:  srcAssets + '/styles/*.scss',
    dest: developmentAssets + '/css'
  },

  // Lint CSS files, but none in /vendor/
  lintStyles: {
    src: [
      srcAssets + '/styles/**/*.scss',
      '!' + srcAssets + '/styles/vendor/**'
    ],
    options: {
      stylelint: {
        reporters: [
          {formatter: 'string', console: true}
        ],
        syntax: 'scss'
      }, // Using .stylelintrc
    }
  },

  // JavaScript, if Browserify is not used
  scripts: {
    src: [
      srcAssets + '/js/**/*.js'
    ],
    dest: developmentAssets + '/js',
    outputName: 'main.js',
    standaloneFiles: [
      // srcAssets + '/js/example-vendor.js'
    ]
  },

  // JavaScript Modules via Browserify
  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extensions to make optional
    extensions: ['.coffee', '.hbs'],
    // A separate bundle will be generated for each
    // bundle config in the list below.
    //
    // head.js is loaded in the head of the website, and
    // contains everything that needs to be loaded asap.
    // app.js is loaded at the bottom, and contains
    // everything that can be loaded after rendering.
    bundleConfigs: [{
      entries:    './' + srcAssets + '/js/app.js',
      dest:       developmentAssets + '/js',
      outputName: 'app.js'
    }, {
      entries:    './' + srcAssets + '/js/head.js',
      dest:       developmentAssets + '/js',
      outputName: 'head.js'
    }]
  },

  // Lint JavaScript files
  lintJs: {
    src: srcAssets + '/js/*.js'
  },

  // WebP image generation
  webp: {
    src: productionAssets + '/images/**/*.{jpg,jpeg,png}',
    dest: productionAssets + '/images/',
    options: {
      preset: 'photo',
      quality: 90
    }
  },

  // Sprites generation
  // @TODO: Currently not used, might replace with gulp-svgstore!
  sprites: {
    src: srcAssets + '/images/sprites/icon/*.png',
    dest: {
      css: srcAssets + '/styles/base/',
      image: srcAssets + '/images/sprites/'
    },
    options: {
      cssName: '_sprites.css',
      cssFormat: 'css',
      cssOpts: {
        cssClass: function (item) {
          // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
          if (item.name.indexOf('-hover') !== -1) {
            return '.icon-' + item.name.replace('-hover', ':hover');
            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
          } else {
            return '.icon-' + item.name;
          }
        }
      },
      imgName: 'icon-sprite.png',
      imgPath: '/assets/images/sprites/icon-sprite.png'
    }
  },

  // Copy images
  images: {
    src:  srcAssets + '/images/**/*',
    dest: developmentAssets + '/images'
  },

  // Copy fonts
  copyfonts: {
    development: {
      src:  srcAssets + '/fonts/*',
      dest: developmentAssets + '/fonts'
    },
    production: {
      src:  developmentAssets + '/fonts/*',
      dest: productionAssets + '/fonts'
    }
  },

  // Copy CSS
  // Used to copy production ready styles.
  copycss: {
    src:  developmentAssets + '/css/*.css',
    dest: productionAssets + '/css/'
  },

  // Optimize CSS, JS, Images, HTML for production
  optimize: {
    css: {
      src:  productionAssets + '/css/*.css',
      dest: productionAssets + '/css/',
      options: {
        uncss: {
          html: [
            production + '/**/*.html'
          ],
          ignore: [
          ]
        }
      }
    },
    js: {
      src:  developmentAssets + '/js/*.js',
      dest: productionAssets + '/js/',
      options: {}
    },
    json: {
      src:  production + '/**/*.json',
      dest: production
    },
    images: {
      src:  developmentAssets + '/images/**/*.{jpg,jpeg,png,gif,svg}',
      dest: productionAssets + '/images/',
      imageminPluginOptions: {
        gifsicle: { interlaced: true },
        jpegtran: { progressive: true },
        optipng: { optimizationLevel: 3 },
        svgo: { plugins: [{ removeDesc: true }] }
      },
      imageminOptions: { verbose: false }
    },
    html: {
      development: {
        src: development + '/**/*.html',
        dest: development,
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyJS: true,
          minifyCSS: true,
          processScripts: ['application/ld+json']
        }
      },
      production: {
        src: production + '/**/*.html',
        dest: production,
        options: {
          removeComments: true,
          removeCommentsFromCDATA: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          minifyJS: true,
          minifyCSS: true,
          processScripts: ['application/ld+json']
        }
      }
    }
  },

  // Lint production JSON files
  lintJson: {
    src:  production + '/**/*.json'
  },

  // Revision asset files
  revision: {
    src: {
      assets: [
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js'
        //productionAssets + '/images/**/*'
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    }
  },

  // Replace links to asset files, with rev version
  collect: {
    src: [
      productionAssets + '/manifest.json',
      production + '/**/*.{html,xml,txt,json,css,js}'
    ],
    dest: production
  },

  // rsync to staging server
  rsync: {
    src: production + '/**',
    options: {
      destination: '~/path/to/my/website/root/',
      root: production,
      hostname: 'mydomain.com',
      username: 'user',
      incremental: true,
      progress: true,
      relative: true,
      emptyDirectories: true,
      recursive: true,
      clean: true,
      exclude: ['.DS_Store'],
      include: []
    }
  }

};
