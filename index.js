module.exports = function(bps) {
	return function(req, res, next) {
		if (bps > 0) {
			var total = 0;
			var resume = req.socket.resume;
			req.socket.resume = function() {};

			var pulse = setInterval(function() {
				total = total - bps / 100;
				if (total < bps) {
					resume.call(req.socket);
				}
			}, 10);

			req.on('data', function(chunk) {
				total += chunk.length;
				if (total >= bps) {
					req.socket.pause();
				}
			});

			req.on('end', function() {
				clearInterval(pulse);
				req.socket.resume = resume;
			});
		}

		next();
	};
};

