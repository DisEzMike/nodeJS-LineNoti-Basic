### nodeJS-LineNoti-Basic 

`npm install dotenv request`

```javascript
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();

const url_line_notification = "https://notify-api.line.me/api/notify";

request({
    method: 'POST',
    uri: url_line_notification,
    header: {
        'Content-Type': 'multipart/form-data',
    },
    auth: {
        bearer: process.env.TOKEN,
    },
    form: {
        message: 'Test Message!'
    },
}, (err, httpResponse, body) => {
    if (err) {
        console.log(err)
    } else {
        console.log(body)
    }
});
```
![image](https://user-images.githubusercontent.com/58202287/135794712-645e802c-f313-4a5c-a13b-7ab9c2faf268.png)
