# Utube Reloaded

/ -> Home
/join -> Join
/login -> Log In
/search -> Search

/users/:id -> See User
/users/logout -> Log Out
/users/edit -> Edit My Profile
/users/delete -> Delete My Profile

/videos/:id -> Watch Video
/videos/:id/edit -> Edit Video
/videos/:id/delete -> Delete Video
/videos/upload -> Upload Video

# problems
베이스가 되는 템플릿 base.pug에서는 fakeUser라는 객체를 통해 유저가 로그인 했는지를 항상 확인하고 있다.
```
if fakeUser.loggedIn
  li
    a(href="/logout") Log Out
else
  li
    a(href="/login") Log In
```
controller를 통해 템플릿을 render할 때마다 fakeUser라는 객체를 캐싱(?)해줘야 하는 것일까?
```
export const recommendedVideo = (req, res) => {
  return res.render("home", { pageTitle: "Home", fakeUser, videos });
};
```
## res.render(view [, locals] [, callback])
Renders a view and sends the rendered HTML string to the client. Optional parameters:

- locals, an object whose properties define local variables for the view.
- callback, a callback function. If provided, the method returns both the possible error and rendered string, but does not perform an automated response. When an error occurs, the method invokes next(err) internally.

`The local variable cache enables view caching. Set it to true, to cache the view during development; view caching is enabled in production by default.`

https://expressjs.com/en/4x/api.html#res.render
