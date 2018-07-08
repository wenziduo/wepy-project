let request = require('request');
let crypto = require('crypto');
let config = require('./config.js');

function Message() {
    this.appid = config.messageConfig.appid;
    this.signtype = config.messageConfig.signtype;
    this.appkey = config.messageConfig.appkey;
    this.xsend_uri = config.messageConfig.xsend_uri;
    this.send_uri = config.messageConfig.send_uri;
    this.multiXsend_uri = config.messageConfig.multiXsend_uri;
    this.subscribe_uri = config.messageConfig.subscribe_uri;
    this.unsubscribe_uri = config.messageConfig.unsubscribe_uri;
    this.template_uri = config.messageConfig.template_uri;
    this.timestamp_uri = config.timestampConfig.timestamp_uri;

    this.send = function(params) {
        let api = this.send_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    };
    this.xsend = function(params) {
        let api = this.xsend_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                const data = JSON.parse(body);
                if (err) {
                    data.code = 500;
                    return console.error(err);
                }
                data.code = true;
            });
        });
    };
    this.multiXsend = function(params){
        let api = this.multiXsend_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    };
    this.templatePost = function(params){
        let api = this.template_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    };
    this.templateGet = function(params) {
        let api = this.template_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            let requestStr = "";
            for(key in requestParams){
                requestStr += key + '=' + requestParams[key] + '&';
            }
            requestStr = requestStr.substring(0, requestStr.length-1);
            request.get(api+"?"+requestStr, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    };
    this.templatePut = function(params) {
        let api = this.template_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);

            request({
                method: 'PUT',
                url: api, 
                headers: {'content-type':'form-data'},
                form: requestParams
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    };
    this.templateDelete = function(params) {
        let api = this.template_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);

            request({
                method: 'DELETE',
                url: api, 
                headers: {'content-type':'form-data'},
                form: requestParams
            }, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    }
    this.subscribe = function(params) {
        let api = this.subscribe_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    };
    this.unsubscribe = function(params) {
        let api = this.unsubscribe_uri;
        let requestParams = params;
        requestParams['appid'] = this.appid;
        let self = this;
        request({
            uri: this.timestamp_uri,
            method: 'GET'
        }, function(error, response, body) {
            let result = JSON.parse(body);
            requestParams['timestamp'] = result["timestamp"];
            requestParams['sign_type'] = self.signtype;
            requestParams['signature'] = self.createSignature(requestParams);
            request.post({url: api, formData: requestParams}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                    return console.error(err);
                }
                console.log(body);
            });
        });
    };
    this.createSignature = function(params) {
        if (this.signtype === 'normal') {
            return this.appkey;
        } else {
            return this.buildSignature(params);
        }
    };

    this.buildSignature = function(params) {
        let filterArr = [];
        filterArr.push('tag');
        let sortedParams = this.sortOnKeys(params);
        let signStr = "";
        for(let key in sortedParams) {
            if(filterArr.indexOf(key) === -1){
                signStr += key + '=' + sortedParams[key] + '&';
            }    
        }
        signStr = signStr.substring(0, signStr.length-1);
        signStr = this.appid + this.appkey + signStr + this.appid + this.appkey; 
        if (this.signtype === 'md5') {
            let md5sum = crypto.createHash('md5');
            md5sum.update(signStr);
            return md5sum.digest('hex');
        }
        if (this.signtype === 'sha1') {
            let sha1sum = crypto.createHash('sha1');
            sha1sum.update(signStr);
            return sha1sum.digest('hex');
        }
        return '';
    };

    this.sortOnKeys = function(dict) {
        let sorted = [];
        for(let key in dict) {
            if (key === 'attachments') {
                continue;
            }
            sorted[sorted.length] = key;
        }
        sorted.sort();

        let tempDict = {};
        for(let i = 0; i < sorted.length; i++) {
            tempDict[sorted[i]] = dict[sorted[i]];
        }

        return tempDict;
    };
};

module.exports = Message;
