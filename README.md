## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


| Route |	Method |	Description |
| ----- | ------ | ------------ |
| `/auth/login` |	GET |	show Login Page ON The Web|
| `/auth/login` |	POST |	Authenticate and log in a user ON The Web |
| `/api/login` |	POST |	Authenticate and login in a user ON The Mobile |
| `/api/servers` |	GET |	Get all servers |
| `/api/pricing` |	GET | |	Get all pricing |
| `/apk/upload` |	GET |	show upload page ON The Web |
| `/apk/upload` |	POST |	Upload Apk File |
| `/apk/delete/:name` |	DELETE |	delete file By filename |
| `/apk/download` |	GET | download apk file |
| `/pricing/` |	GET |	show pricing page |
| `/pricing/edit/:id` |	GET |	show edit page By Id |
| `/pricing/add` |	GET |	show Add pricing page |
| `/pricing/edit/:id` |	POST |	edit pricing By Id |
| `/pricing/add` |	POST |	add new pricing |
| `/pricing/delete/:id` |	DELETE |	delete pricing BY Id |
| `/user/add` |	GET |	show add user page |
| `/user/edit/:phoneNumber` |	GET |	show edit user page |
| `/user/edit` |	POST |	edit user In Body |
| `/user/add` |	POST |	add new user In Body |
| `/api/resource/:id` |	DELETE |	Delete a specific resource by ID |
| `/api/notification/:id` |	POST |	sending a notification to a specific user by id and title and body provided |




API JSON Examples


Log In Request Example

``
{
  <br>
  "phoneNumber": "09911212...",
  <br>
  "password": "secretpassword",
  <br>
  "macAddress": "1253242128482",
  <br>
}
``

## Support

hoseintahan84@gmail.com
<br>
www.github.com/ho3eintahan
