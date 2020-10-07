class IpAddressMiddleware {
    fetchIpAddress(req, res, next) {
        req.ipAddress = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        next();
    }
}

module.exports = new IpAddressMiddleware();