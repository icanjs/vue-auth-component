# vue-auth-component

[![Build Status](https://travis-ci.org/icanjs/vue-auth-component.png?branch=master)](https://travis-ci.org/icanjs/vue-auth-component)

Compose a clean Auth UI with these Vue.js components.

The React version: https://github.com/icanjs/auth-component<br/>
The CanJS Stache version: https://github.com/icanjs/can-auth-component

![vue-auth-component example](https://cloud.githubusercontent.com/assets/128857/21478355/da76f80a-cb07-11e6-8a6d-dc382d30bf9f.jpg)

## Example Usage

`vue-auth-component` is a collection of Vue.js components.  They can be composed based on the auth requirements of your application.  The main demo shows how to build the example shown in the image above.  To run the demo, start an `http-server` in the root and open [http://localhost:8080](http://localhost:8080).  Here's the [demo code](https://github.com/icanjs/vue-auth-component/blob/master/src/auth-demo.js).

```jsx
import Vue from 'vue/dist/vue'

import AuthContainer from './auth-container/auth-container'
// import Tabs from './tabs/can-route'
import FacebookButton from './buttons/facebook/'
import GithubButton from './buttons/github/'
import GoogleButton from './buttons/google/'
import MicrosoftButton from './buttons/microsoft/'
import TwitterButton from './buttons/twitter/'
import SignupForm from 'vue-auth-component/forms/local-signup/local-signup'
import LoginForm from 'vue-auth-component/forms/local-login/local-login'

import logo from './demo-logo.svg'

const dummyService = {
  create (data) {
    console.log('simulated signup using service.create', data)
    return Promise.resolve(data)
  }
}

const feathersClient = {
  authenticate (data) {
    console.log('Simulated signup with feathersClient.authenticate', data)
    return Promise.resolve(data)
  }
}

let app = new Vue({
  el: '#app',
  data () {
    return {
      dummyService,
      feathersClient,
      logo
    }
  },
  components: {
    AuthContainer,
    // Tabs,
    FacebookButton,
    GithubButton,
    GoogleButton,
    MicrosoftButton,
    TwitterButton,
    SignupForm,
    LoginForm
  }
})
```

## Quick and Easy Horizontal and Vertical Centering

The `<auth-container></auth-container>` component is a set a styles that center a white login container both vertically and horizontally inside its parent element.  It has no viewModel logic of its own, so all of the other components will work without it.

```vue
<template>
  <auth-container>
    Put whatever markup you want inside here.
  </auth-container>
</template>

<script>
  import AuthContainer from 'vue-auth-component/auth-container/auth-container'

  export default {
    components: {
      AuthContainer
    }
  }
</script>
```

## Local Auth Forms, Ready For Use

A basic Local (username & password) Login and Signup form are included.

```vue
<template>
  <signup-form :service="userService"></signup-form>
  <login-form :service="feathersClient" strategy="local"></login-form>
</template>

<script>
  import SignupForm from 'vue-auth-component/forms/local-signup/local-signup'
  import LoginForm from 'vue-auth-component/forms/local-login/local-login'
  import feathersClient from './feathers-client'

  export default {
    data () {
      return {
        userService: feathersClient.service('users'),
        feathersClient
      }
    },
    components: {
      SignupForm,
      LoginForm
    }
  }
</script>
```

Check out the [local-login demo](https://github.com/icanjs/vue-auth-component/blob/master/src/forms/local-login/local-login.js) and [local-signup demo](https://github.com/icanjs/vue-auth-component/blob/master/src/forms/local-signup/local-signup.js) code to see example usage.

The following attributes are available in both forms:

- `usernameField` {String} Allows you to customize one of the attributes sent to the server. It's set to `"email"` by default.
- `usernamePlaceholder` {String} Set the placeholder text for the `usernameField`.  Default is `"e-mail address"`.
- `passwordField` {String} Allows you to customize an attribute sent to the server.  The default is `"password"`.
- `passwordPlaceholder` {String} Set the placeholder text for the `passwordField`.  Default is `"password"`.
- `strategy` {String} When using [feathers-authentication](https://github.com/feathersjs/feathers-authentication), setting this attribute will add a `strategy` attribute to the outgoing data.
- `service` {FeathersJS service} a Feathers service to use for submitting the form data.  You can also pass a `Feathers Client` instance and the `authenticate` method will automatically be used to make the requests.  Be sure to set the strategy.
- `suppressWarnings` {Boolean} There are a few warnings that will show up by default. Turn them off by setting `suppressWarnings` to true.  Default `false`.
- `error` {String} When the server responds with an error string or an error object containing a `message` string, it will be set on `error` and shown in the UI above the form.
- `buttonText` {String} Set the main action button's label.  Default is `"Login"` or `"Signup"`.
- `clearError` {Function} Clears the error message.
- `onSubmit(data)` {Function} is called with the form data when the form is submitted.  If a `Model` or `service` was provided, it will be used to communicate with the server.  If not, `handleSubmit` must be overwritten with your own logic.  It must return a `Promise`.
- `onSuccess(responseData)` {Function} is called with the server response data.
- `onError(error)` {Function} is called with the server response error.

These are the custom attributes for the `<login-form>` form:
- `onForgot` {Function} runs when the user clicks the "Forgot Password" link. There is no default handler for this, so you have to provide your own function.

These are the custom attributes for the `<signup-form>` form:
- `NOT YET IMPLEMENTED IN THIS VERSION - asyncValidation` {Function} A function that returns a promise. If an error string is returned, or an error object with a `message` string is returned, it will become the validation error for the username/email field.

See the "Running the Demos" section to run the included form demos.  Both demos include examples for using a `Model`, `service`, or custom function.

## Asynchronous Field Validation
`Not yet implemented in the Vue.js version.`  The `AsyncValidator` component allows you to run asynchronous validations against a server.  The `Form` example, above, shows how to use it in a form.  To make the validations work, you need to use the `validate` attribute on a form.  We assigned the AsyncValidator a `field` of `emailError`.  Now we can use the `emailError` attribute in the `validate` rules.

## Beautiful, Scalable Buttons

A Generic button and a bunch of hand-tailored, scalable buttons are included.

### Generic Auth Button

The generic button is the base for all of the other buttons.  You can use it to make your own auth buttons.  Here's how the Facebook button implements the generic button:

```vue
<template>
  <auth-button 
    url="/auth/custom" 
    :svg="logo" 
    popup
    alt="Some auth button"
    text="Login with Whatever">
  </auth-button>
</template>

<script>
  import { AuthButton } from 'vue-auth-component'
  import logo from './logo.svg'

  export default {
    data () {
      return {
        logo
      }
    },
    components: {
      AuthButton
    }
  }
</script>
```

- `url` is like specifying the `href` on a link. The default value matches FeathersJS default OAuth URLs like `/auth/<providerName>`.  For example, the Facebook button uses `/auth/facebook`.
- `popup`, if truthy, simply opens the `url` in a centered popup window.
- `alt` is for alt text, the same as on other HTML elements.
- `text` allows you to specify some text to the right of the image.
- `svg` allows you to embed svg directly into the button.
- `img` is supported in place of `svg`.  The `img` attribute should the the URL to an image.

### Ready-to-use Buttons

A bunch of pre-styled buttons are included.  They all extend the generic button.

```js
import { 
  AmazonButton,
  DropboxButton,
  EvernoteButton,
  FacebookButton,
  GithubButton,
  GoogleButton,
  LinkedInButton,
  MicrosoftButton,
  OpenIDButton,
  PayPalButton,
  SkypeButton,
  SlackButton,
  StackOverflowButton,
  TwitterButton,
  YahooButton,
} from 'vue-auth-component';
```

You'll generally only ever have to specify the `url`, `text`, and `popup` attributes.

```vue
<template>
  <facebook-button url='/auth/facebook' popup={true} text='Login with Facebook'></facebook-button>
</template>

<script>
  import { FacebookButton } from 'vue-auth-component';

  export default {
    components: {
      FacebookButton
    }
  }
</script>
```

If you don't specify a `text` attribute, you'll get a square button with an icon.  The button with `text` from the above code would look like the "Login with Facebook" button in this example:

![AuthComponent Buttons Demo](https://cloud.githubusercontent.com/assets/128857/21478412/70751af8-cb08-11e6-8305-807c6fd0777b.jpg)

## Tabs

**Not yet implemented.**


## Changelog
- `0.0.1` - Initial release

## Contributing

### Running the demos
You can try out the included demos using the following steps:

1. Clone the repo.
2. Run `yarn` or `npm install`
3. Run `npm run develop`
4. With the development server running, open a demo
  - [Main demo](http://localhost:8080)
  - [Local Login Form Demo](http://localhost:8080/src/forms/local-login/demo.html)
  - [Local Signup Form Demo](http://localhost:8080/src/forms/local-signup/demo.html)

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test/test.html` page.
Automated tests that run the tests from the command line in Firefox can be run with

```
npm test
```
