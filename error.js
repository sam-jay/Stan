
exports.respond = function(code, res, msg, extra_msg) {
  switch (code) {
    case 400:
      return res.status(400).json({
        code: 'InvalidParameter',
        message: msg 
      });
      break;
    case 401:
      return res.status(401).json({
        code: 'AuthenticationFailure',
        message: msg
      });
      break;
    case 403:
      return res.status(403).json({
        code: 'PermissionDenied',
        message: msg
      });
      break;
    case 404:
      return res.status(404).json({
        code: 'ResourceNotFound',
        message: msg + ' does not exist or cannot be found',
        details: extra_msg
      });
      break;
    case 405:
      return res.status(405).json({
        code: 'InvalidRequestMethod',
        message: msg
      });
      break;
    case 500:
      return res.status(500).json({
        code: 'InternalServerError',
        message: msg
      });
      break;
    case 503:
      return res.status(503).json({
        code: 'ServiceUnavailable',
        message: msg
      });
      break;
  }
}