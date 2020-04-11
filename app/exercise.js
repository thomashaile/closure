export default class Exercise {

  static populate(data, path) {
    path = path || data.path;
    if (data.files) {
      data.exercises = data.files
        .map(relPath => new this(relPath, path));
    };
    if (data.dirs) {
      data.dirs.forEach(subDir => this.populate(subDir, path + subDir.path));
    };
    return data;
    // by side effect
  }

  path = {
    rel: null,
    abs: null
  };
  code = 'un-fetched';

  constructor(file, dirPath) {
    if (file && typeof file.path !== 'string') {
      throw new TypeError('file.path must be a string');
    };
    this.path.rel = file.path;
    if (dirPath) {
      this.path.abs = dirPath + file.path;
    };
    this.isExample = file.isExample;
  }

  loadScript(loadingMsg) {
    if (loadingMsg) console.log(loadingMsg);

    return import('..' + this.path.abs)
      .catch(err => console.log(err));
  }

  fetchCode(loadingMsg) {
    if (loadingMsg) console.log(loadingMsg);

    return fetch('.' + this.path.abs)
      .then(res => {
        if (res.status != 200) {
          throw new Error(`${res.status}: ${res.statusText}`);
        };
        return res.text();
      })
      .then(code => this.code = code)
      .catch(err => {
        console.error(err);
        this.code = '"' + err.stack + '"';
      });
  }

  run(inDebugger) {
    if (inDebugger) {
      console.log('--- in debugger: ' + this.path.abs + ' ----');
      const stepThrough = eval;
      const debuggered = "debugger; // injected by inDebugger\n\n" + this.code;
      stepThrough(debuggered);
    } else {
      console.log('--- running: ' + this.path.abs + ' ----');
      eval(this.code);
    };
  }

  render() {
    const nameEl = document.createElement('text');
    nameEl.innerHTML = this.path.rel + ' :';

    const fetchCodeEl = document.createElement('button');
    fetchCodeEl.innerHTML = 'fetch code';
    fetchCodeEl.onclick = () => {
      this
        .fetchCode('--- fetching ' + this.path.abs + ' ---')
        .then(() => {
          fetchCodeEl.innerHTML = 're-fetch code';
          this.run(false);
        });
    };

    const inDebuggerEl = document.createElement('button');
    inDebuggerEl.innerHTML = 'in debugger';
    inDebuggerEl.onclick = () => this.run(true);

    const container = document.createElement('text');
    container.appendChild(nameEl);
    container.appendChild(fetchCodeEl);
    container.appendChild(inDebuggerEl);

    return container;
  }
}

