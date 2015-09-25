exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
  conventions:
    assets:  /^(web\/static\/assets)/
    ignored: /^(bower_components[\/\\]+bootstrap-less(-themes)?|app[\/\\]+styles[\/\\]+overrides|(.*?[\/\\]+)?[_]\w*)/
  modules:
    autoRequire:
      "js/app.js": ["web/static/js/app"]
  paths:
    watched: [ "web/static" ]
    public: "priv/static"

  files:
    javascripts:
      joinTo:
        'js/app.js': /^web\/static/
        'js/vendor.js': /^(bower_components|vendor)/

    stylesheets:
      joinTo:
        'css/app.css': /^web\/static/
        'css/vendor.css': /^(bower_components|vendor)/

    # templates:
      # joinTo:
        # 'js/dontUseMe' : /^app/ # dirty hack for Jade compiling.

  plugins:
    jade:
      pretty: yes # Adds pretty-indentation whitespaces to output (false by default)
    jade_angular:
      modules_folder: 'partials'
      locals: {}
    babel:
      ignore: [/web\/static\/vendor/, /bower_components/]
