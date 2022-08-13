const API_SERVER = 'http://localhost:3001';

const MANAGED_NAME_PATTERN = new RegExp(
  '^([a-z]|_(?!_))*[a-z]__(?:[cr]|Share|latitude__s|longitude__s)$',
  'i'
);

export let namespace;
export let instanceUrl;
export let connection;

let apiVersion;

export function getConnection() {
  get('connection').then(data => {
    connection = data;
  });
}

export function describeGlobal() {
  return get('describeGlobal');
}

export function describe(sobjectName) {
  return get('describe', { sobjectName });
}

export function query(q) {
  return get('query', { q });
}

export function queryAll(q) {
  return get('queryAll', { q });
}

export function get(fn, params = null) {
  const url = API_SERVER + '/' + fn;
  if (params) {
    const query = Object.keys(params)
      .map(key => `${key}=${encodeURI(params[key])}`)
      .join('&');
    return fetch(url + '?' + query).then(data => data.json());
  } else {
    return fetch(url).then(data => data.json());
  }
}

function _fullApiName(apiName) {
  if (!apiName) return null;
  if (!namespace) return apiName;
  if (MANAGED_NAME_PATTERN.test(apiName)) {
    return `${namespace}__${apiName}`;
  }
  return apiName;
}

export function fullApiName(apiName) {
  if (!apiName) return null;
  if (!namespace) return apiName;
  if (Array.isArray(apiName)) {
    return apiName.map(n => _fullApiName(n));
  }
  return apiName
    .split('.')
    .map(n => _fullApiName(n))
    .join('.');
}

function _stripNamespace(apiName) {
  if (!apiName) return null;
  if (!namespace) return apiName;
  const escapedNamespace = escapeRegExp(namespace);
  const namespacePattern = new RegExp(`^${escapedNamespace}__(.*)$`, 'i');
  const matcher = apiName.match(namespacePattern);
  if (matcher) {
    return matcher[1];
  }
  return apiName;
}

export function stripNamespace(apiName) {
  if (!apiName) return null;
  if (!namespace) return apiName;
  if (Array.isArray(apiName)) {
    return apiName.map(n => _stripNamespace(n));
  }
  return apiName
    .split('.')
    .map(n => _stripNamespace(n))
    .join('.');
}

export function isSame(apiName1, apiName2) {
  return fullApiName(apiName1) === fullApiName(apiName2);
}
