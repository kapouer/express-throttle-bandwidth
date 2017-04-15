# express-throttle-bandwidth
Throttle incoming request bandwidth

## Usage

```
var throttle = require('express-throttle-bandwidth');
app.use(throttle(100000));
```

## Options

`throttle(bps)`

Where bps is bytes per second, with a 10 milliseconds resolution.

Returns an express middleware function, if bps is <= 0 it does not throttle.



