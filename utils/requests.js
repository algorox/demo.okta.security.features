const request = require('request');

const arrayOfHTTPErrors = [500, 501, 400, 401, 403, 422, 429];

const handlePublicPOST = (url, body, headers) => {

  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: url,
      headers: headers,
      body: body,
      json: true
    };
    request(options, function (error, response, body) {

      if (error) {
        customError = {
          error: 500,
          error_description: error,
        }
        reject(customError);
      }

      if (response) {

        if (arrayOfHTTPErrors.includes(response.statusCode)) {

          customError = {
            error: response.statusCode || 500,
            error_description: response.body || 'No Description Provided',
          }

          reject(customError)
        }
        resolve(
          {body});
      }
    });
  });
};

const handlePublicDELETE = (url, body, headers) => {

  return new Promise((resolve, reject) => {
    var options = {
      method: 'DELETE',
      url: url,
      headers: headers,
      body: body,
      json: true
    };
    request(options, function (error, response, body) {

      if (error) {
        customError = {
          error: 500,
          error_description: error,
        }
        reject(customError);
      }

      if (response) {

        if (arrayOfHTTPErrors.includes(response.statusCode)) {

          customError = {
            error: response.statusCode || 500,
            error_description: response.body || 'No Description Provided',
          }

          reject(customError)
        }
        resolve(
          {body});
      }
    });
  });
};

const handlePrivatePOST = (url, body, headers, accessToken) => {

  return new Promise((resolve, reject) => {

    const options = {
      url: url,
      json: true,
      method: 'POST',
      body: body,
      headers: headers,
    };
    request(options, function (error, response, body) {

      if (error) {
        customError = {
          error: 500,
          error_description: error
        }
        reject(customError);
      }

      if (response) {

        if (arrayOfHTTPErrors.includes(response.statusCode)) {

          customError = {
            error: response.statusCode || 500,
            error_description: response.body || 'No Description Provided'
          }

          reject(customError)
        }
        resolve(body);
      }

    })
  });
}

module.exports = {
  handlePrivatePOST,
  handlePublicPOST,
  handlePublicDELETE
};
