# So, this is my power... but what are my details?

Now that we are able to discover species, we'll need a page to display their complete details.

## 1. New page and route

Create a new page and plug it to the `/species/:id` route (note the `:id` parameter which we'll need
in the page controller to load data later on). Again Keep the page minimal for now, we just need to
ensure we can reach the page and it is able to pick the species id from the route parameter.

## 2. Link the page

In the species list page, add a link to each specie so that we can navigate from the list to the
details page.

## 3. Consume the service

Create a new method on the service to load details on a specific species.

> 💡 The API call for this is `GET /species/{id}`.

Now make the page use this method to retrieve the details of a discovered species.

> 🟢 You can validate this by displaying the data in the template with the `json` pipe and run the
> following test :
>
> ```shell
> npm run test -- details-page -t="is plugged"
> ```

## 4. Stylize the page

Just like for the list page, you can now work the data to render it nicely. Choose a layout you like
and make sure to display the an image with the url of the `image` property and all other properties
as text.

> 🟢 Validate this feature with :
>
> ```shell
> npm run test -- details-page
> ```
