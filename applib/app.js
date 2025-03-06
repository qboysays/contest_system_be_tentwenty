const logger = require("./logger").LoggerModel;
const constant = require("./constant");


exports.SendHttpResponse = function (functionContext, response) {
  let httpResponseType = constant.ErrorCode.Success;
  functionContext.res.writeHead(httpResponseType, {
    "Content-Type": "application/json"
  });
  functionContext.responseText = JSON.stringify(response);
  functionContext.res.end(functionContext.responseText);
};

exports.GetArrayValue = function (array, value, field) {
  return array.find(function (statusArray) {
    return statusArray[field] === value;
  });
};

exports.FilterArray = function (array, value, field) {
  return array.filter(function (item) {
    return item[field] === value;
  });
};

module.exports.fetchDBSettings = async function (
  logger,
  settings,
  databaseModule
) {
  try {
    logger.logInfo("fetchDBSettings()");
    let rows = await databaseModule.knex.raw(`CALL usp_get_app_settings()`);
    let dbSettingsValue = rows[0][0];
    settings.APP_KEY = getValue(dbSettingsValue, "APP_KEY");
    settings.APP_SECRET = getValue(dbSettingsValue, "APP_SECRET");

    logger.logInfo(
      "fetchDBSettings() :: Primary Database settings fetched successfully"
    );
    return;
  } catch (errGetSettingsFromDB) {
    logger.logInfo(
      `fetchDBSettings() :: ${JSON.stringify(errGetSettingsFromDB)}`
    );
    throw errGetSettingsFromDB;
  }
};

function getValue(requestArray, Key) {
  let requestArrayLength = requestArray ? requestArray.length : 0;

  for (
    let requestArrayCount = 0;
    requestArrayCount < requestArrayLength;
    requestArrayCount++
  ) {
    if (
      requestArray[requestArrayCount].key.toLowerCase() === Key.toLowerCase()
    ) {
      return requestArray[requestArrayCount].value;
    }
  }
  return null;
}

exports.sortArray = function (array, field, sortBy) {
  if (sortBy.toLowerCase() === "ascending") {
    array.sort(function (a, b) {
      return a[field] - b[field];
    });
  } else {
    array.sort(function (a, b) {
      return b[field] - a[field];
    });
  }
};

module.exports.Logger = logger;
