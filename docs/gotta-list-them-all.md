# 🎯 Gotta list them all

Currently the app only has 2 pages : login and a dummy one. The first feature you'll need to do is
to create a page for listing all species.

## 1. Create a dedicated page

Create a new page and edit the routing module so that we see it when navigating to the root url.
Keep the page minimal for now, we just want something to prove it is plugged correctly and start
fetching data.

> 💡 You can either plug the component directly or use a redirection.

## 2. Add a service to the mix

Now that we can navigate to the page, we need to start fetching some data. Create a service
dedicated to species and give it a method for loading all species.

> 💡 The API call for this is `GET /species`.

With the service ready, plug it to the page so that it loads the species list upon reaching the
page.

> 🟢 To ensure everything is well plugged together, display the data in the template with the `json`
> pipe and run the following test :
>
> ```shell
> npm run test -- list-page -t="is plugged"
> ```

## 3. Stylize the page

You can now work the data to render it nicely. Choose a layout you like and make sure to display the
`name` and `id` of each species and an image with the url of the `image` property.

> 🟢 Validate this feature with :
>
> ```shell
> npm run test -- list-page
> ```
